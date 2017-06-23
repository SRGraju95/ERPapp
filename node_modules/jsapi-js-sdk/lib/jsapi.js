/**
 *
 * JSAPI connector.  Supports authentication (OAuth) via the JSAPI.auth container. Provides ability to get clients configured with a specific authToken.
 * Injects Service based functions onto the client for things like getting userInfo, Friends, Etc.
 * Successful requests which return in the style of {error: {success: true}, result: {}}  will be unwrapped when the promise is resolved.  If it's a content list that is handled too
 *
 * Includes seperate services for various JSAPI services.
 *
 **/


var rest = require("restler"),
    _ = require("lodash"),
    Q = require("q"),
    util = require('util'),
    events = require('events'),
     bunyan = require('bunyan')
    ,defaultConfig = {
        url: "http://localhost:8080",
        clientId: "test",
        clientSecret: "test",
        paths: {
            grant: "/%s/oauth/token",
            base: "/%s/services/latest/"
        },
        logging: {
            "name": "JSAPI",
            "streams":
                [
                    {
                        level: 'info',
                        path:  process.env.JSAPI_LOG_PATH || '/tmp/jsapi-sdk.log'
                    },
                    {
                        level: 'error',
                        stream: process.stdout
                    }
                ]
          },
        root: "rest"

    }
    , OAuthToken = require("./OAuthToken")
    , RequestMiddleware = require("./RequestMiddleware")
    , deferredRequest = RequestMiddleware.deferredRequest
    , StandardServices = require("./services/index")
    , ERROR_TYPES = RequestMiddleware.ERROR_TYPES
    , AuthFunctions = require("./AuthFunctions")
    , RestResource = require("./RestResource")
    , Models = require("./Models")
    , Tools = require("./Tools")
    , JsapiCache = require("./JsapiCache")
    ;

/**
 * JSAPI connector.  Supports authentication (OAuth) via the JSAPI.auth container. Provides ability to get clients configured with a specific authToken.
 * Injects Service based functions onto the client for things like getting userInfo, Friends, Etc.
 * Successful requests which return in the style of {error: {success: true}, result: {}}  will be unwrapped when the promise is resolved.  If it's a content list that is handled too
 *
 * @param cfg {Object} Configuration options such as url, clientId, clientSecret, grantPath, basePath
 * @constructor
 */
function JSAPI(cfg) {
    var self = this;
    self.cfg = _.extend({}, defaultConfig);
    self.isSetup = false;
    self.secure = false;

    self.serviceFunctions = StandardServices;
    self.authFunctions = AuthFunctions;
    self.Models = Models;
    self.restResources = {};
    self.JsapiCache = JsapiCache;
    self.stats = {
        auth: {requests: 0 },
        rest: {requests: 0 }
    };
    self._debugging = _.get(cfg, 'debug', false);

    /**
     * Creates an Instance of the authClient service.  This is used for getting Tokens and Registration
     * @param authConfig {Object} Any configuration options to override defaults
     * @returns {rest.Service} Fully configured, extended with core auth functions
     */
    this.__proto__.getAuthClient = function (authConfig) {
        var mainLog = self.logger();
        var authClient = rest.service(function (cfg) {
                var that = this;
                this.defaults.timeout = cfg.timeout || 4000;
                this.grantPath = Tools.grantPath.bind(cfg);
                this.basePath = Tools.basePath.bind(cfg);
                this.baseURL = cfg.url;
                this._cfg = cfg;

                /**
                 * Copied from the core restler implemenation
                 * @param url {String} Relative path to hit
                 * @param data {Object} Post Body data (will be json encoded automatically)
                 * @param options {Object} Standard request options
                 * @returns {*}
                 */
                this.postJson = function (url, data, options) {
                    return this.json.apply(this, ['POST', url, data, options]);
                };

                this.logger =   mainLog.child({'Connector': 'Auth'});

                /**
                 * Build the request data for a getToken request (client_id, client_secret, grant_type, etc...)
                 * @param grantType {String} (default: password) password or client_credentials
                 * @param credentials {Object} extra request data like username/password
                 * @returns {Object}
                 */
                this.getTokenRequestData = function (grantType, credentials) {
                    if (grantType === 'password' && (!credentials || !credentials.username || !credentials.password)) {
                        throw new Error('Password Grant requires username and password in the credentials');
                    }
                    return _.extend({},
                        {
                            client_id: this._cfg.clientId,
                            client_secret: this._cfg.clientSecret
                        },
                        credentials || {},
                        {grant_type: grantType}
                    );
                };
            },
            {},
            _.extend({}, self.authFunctions)
        );
        return new authClient(authConfig);
    };

    /**
     * Initialize the Client Service Function which is used to spawn new client Token authed Service
     * @param config {Object} Optional
     * @returns {*}
     */
    this.__proto__.setupClient = function (config) {
        var cfg = _.extend({}, self.cfg, config || {});
        var mainLog = self.logger();
        return rest.service(function (token) {
                var that = this;
                this.grantPath = Tools.grantPath.bind(cfg);
                this.basePath = Tools.basePath.bind(cfg);
                this.defaults.timeout = cfg.timeout || 4000;
                this.baseURL = cfg.url + this.basePath();
                this._cfg = cfg;
                this._rests = {};
                this._restObjects = {};
                this._restResources = {};
                this.logger =   mainLog.child({'Connector': 'Rest'});
                this._options = {};
                this.Models = self.Models;
                var protos = this.constructor.prototype;

                that.__proto__.onTokenExpired = function() {
                    var defer = Q.defer();
                    defer.reject(new Error('onTokenExpired function not overridden.'));
                    return defer.promise;
                };
                var deferredLoggedRequest = deferredRequest.bind(that);

                function mergeAccessToken(options){
                    options = options || {};
                    if (that._token && !_.has(options, 'accessToken')){
                        options.accessToken = that._token.token();
                    }
                    return options;
                }
                // For all others
                function standardMergeToken(arguments){
                    if (arguments.length > 1 ){
                        arguments[1] = mergeAccessToken(arguments[1]);

                    }
                    else {
                        arguments[1] = mergeAccessToken({});
                    }
                    return arguments;
                }

                // For the json request
                function jsonMergeToken(arguments){

                    switch(arguments.length){
                        case 3:
                            arguments[3] = mergeAccessToken({});
                            break;
                        case 2:
                            arguments[2] = {};
                            arguments[3] = mergeAccessToken({});
                            break;

                        default:
                            arguments[3] = mergeAccessToken(arguments[3]);

                    }

                    return arguments;
                }
                /**
                 * Copied from the core restler implemenation
                 * @param url {String} Relative path to hit
                 * @param data {Object} Put Body data (will be json encoded automatically)
                 * @param options {Object} Standard request options
                 * @returns {*}
                 */
                this.putJson = function (url, data, options) {
                    return this.json.apply(this, ['PUT', url, data, options]);
                };

                /**
                 * Copied from the core restler implemenation
                 * @param url {String} Relative path to hit
                 * @param data {Object} Post Body data (will be json encoded automatically)
                 * @param options {Object} Standard request options
                 * @returns {*}
                 */
                this.postJson = function (url, data, options) {
                    return this.json.apply(this, ['POST', url, data, options]);
                };


                // Core Restler overrides to wrap with deferredRequest
                this.get = function () {

                    return deferredLoggedRequest(protos.get.apply(this, standardMergeToken(arguments)));
                };
                this.post = function () {

                    return deferredLoggedRequest(protos.post.apply(this, standardMergeToken(arguments)));
                };
                this.put = function () {

                    return deferredLoggedRequest(protos.put.apply(this,standardMergeToken(arguments)));
                };
                this.del = function () {

                    return deferredLoggedRequest(protos.del.apply(this, standardMergeToken(arguments)));
                };
                this.head = function () {

                    return deferredLoggedRequest(protos.head.apply(this, standardMergeToken(arguments)));
                };
                this.json = function () {

                    return deferredLoggedRequest(protos.json.apply(this, jsonMergeToken(arguments)));
                };

                // Rest Related Functionalities
                this._getRestResource = function (endpoint) {
                    return this._restResources.hasOwnProperty(endpoint) ? this._restResources[endpoint] : RestResource;
                };
                this.rest = function(endpoint){
                  if (!this._rests.hasOwnProperty(endpoint)){
                      var fnc = this._getRestResource(endpoint);
                      this._rests[endpoint] = new fnc(endpoint, this);
                  }
                    return this._rests[endpoint];
                };
                /**
                 * Rather than creating a new client, you can just update the token
                 * WARNING Changing the token on a client instance shared by others would result in some requests using the wrong token, USE WITH CAUTION
                 * @param token {OAuthToken|Object|string} Either a string token, a full authToken as simple object, or OAuthToken Instance
                 */

                    // Token/Auth functionalities
                    // Switch the client to use a different oauth token
                this.changeToken = function (token) {
                    if (!(token instanceof OAuthToken)) {
                        token = new OAuthToken(token);
                    }
                    this._token = token;
                    this.defaults.accessToken = this.accessToken = token.token();
                };

                this.changeToken(token);

                // Add the service specific functions under scope of Services
                Tools.mergeServices.call(this, self.serviceFunctions);
            }, {},
            {}
        );
    };

    /**
     * Returns a Client Service instance that is configured for the specified oauthToken
     * @param token String OAuthToken
     * @returns {*} RestService Customized with client Functions
     */
    this.__proto__.client = function (token) {
        if (!token)
            throw new Error('Token cannot be empty for a Jsapi Client Service');
        try {
            var client = new self.jsapiClient(token);
            return client;
        } catch (err) {
            throw err;
        }

    };

    /**
     * Initialize the adapter
     * @param cfg
     * @returns {JSAPI}
     */
    var setConfig = this.__proto__.setConfig = function (cfg, forced) {
        if (forced) {
            self.cfg = cfg || {};
        }
        else {
            _.extend(self.cfg, cfg || defaultConfig);
        }

        if (!self._logger && self.cfg.logging){
            self.logger(self.cfg.logging);
        }
        // Clean the old clients
        delete self.auth;
        self.auth = self.getAuthClient(self.cfg);

        delete self.jsapiClient;
        self.jsapiClient = self.setupClient(self.cfg);

        self.isSetup = true;
        return self;
    };
    var setLogger = this.__proto__.setLogger = function(logConfig){
      if (_.isPlainObject(logConfig)) {
          var cfg = _.extend({},{name: "JSAPI", streams: [] }, logConfig);
          self._logger = bunyan.createLogger(cfg);
          return self;
      }
        else if (logConfig instanceof bunyan) {
          self._logger = logConfig.child({"JSAPI": "js-sdk"});
          return self;
       }
        else {
          self._logger = bunyan.createLogger(defaultConfig.logging);
          return self;
      }
    };
    this.__proto__.logger = function(logConf){
        if (arguments.length > 0 && logConf || !self._logger ){
            return setLogger(logConf);
        }
        else {
           return self._logger;
        }

    };

    // Begin functions to extend JSAPI functionality by adding new functions to the authClient or to the main Client Creation process

    /**
     * Add new rest functions to the Created Client Services Under a namespace for the service
     * @param namespace {String} Service Namespace
     * @param functionObject Object Object containing functions that will be merged on. this will be the scope of the service
     * @returns {*} JSAPI
     */
    this.__proto__.addServiceFunctions = function (namespace, functionObject) {
        functionObject = functionObject || {};
        if (!self.serviceFunctions.hasOwnProperty(namespace)) {
            self.serviceFunctions[namespace] = {};
        }
        _.extend(self.serviceFunctions[namespace], functionObject);
        return this;
    };

    this.__proto__.registerRestResource = function (name, resourceClass) {
        this.restResources[name] = resourceClass;


    };

    /**
     * Add new rest functions to the Created Auth Client
     * @param functionObject Object Object containing functions that will be merged on. this will be the scope of the service
     * @returns {*} JSAPI
     */
    this.__proto__.addAuthFunctions = function (functionObject) {
        functionObject = functionObject || {};
        _.extend(self.authFunctions, functionObject);
        return this;
    };

    this.__proto__.enableDebugging = function(enable){
        self._debugging = enable;
        return self;
    };
    this.__proto__.debugging = function(enable){
        if (arguments.length == 1 ){
            self._debugging = enable;
            return self;
        }
        else
           return self._debugging;
    };
    RequestMiddleware.setJsapi(this);
    // Setup with the default configs
    setConfig(cfg);

}

var jsapi = module.exports = new JSAPI();
