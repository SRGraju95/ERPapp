/**
 * Created by eliot on 6/25/15.
 */

var _ = require('lodash'),
    util = require('util')
    , ModelTools = require("./ModelTools")
    , Q = require("q")
    , JsapiCache = require("./JsapiCache")
;



/**
 * {
        serviceUrl: "test",
        RestUrl: "test",
        name: "Test"
    }
 * @param cfg
 * @constructor
 */
function BaseService(cfg){
    var self = this;
    this.serviceConfig =  this.serviceConfig || (cfg || {});
    this._schemas = this.serviceConfig.hasOwnProperty('schemas') ? this.serviceConfig.schemas : false;
}
BaseService.prototype.schema = function(schema){
    if (arguments.length > 0 ){

        this._schemas = new ModelTools.SchemaModels(schema);
        return this;
    }
    else if (!(this._schemas instanceof ModelTools.SchemaModels) && (this._schemas || this.serviceConfig.schemas)){
        this._schemas = new ModelTools.SchemaModels(this._schemas || this.serviceConfig.schemas);
         return this._schemas;
    }
    else {
        if (!this._schemas && !this.serviceConfig.schemas){
            throw new Error('schemas not assigned');
        }
        return this._schemas;
    }
};
BaseService.prototype.createModelInstance = function(name, data){
    self.schema().getInstance(name,data)
};
BaseService.prototype.createModel = function(name, data){
    var self = this;
    var defer = Q.defer();
    try {
        var record = self.schema().getInstance(name,data);
            if (record){
                 defer.resolve(record);
            }
            else {
                defer.reject({message: 'unknown error'});
            }
        } catch(err){
        if (err.message === 'schemas not assigned'){
            throw err;
        }
        else {
            defer.reject(err);
        }
    }

    return defer.promise;
};


BaseService.prototype.serviceEndpoint = function(endpoint){
    var formatted = "";
    var pattern = "%s";
    if ( endpoint ){
        formatted = util.format.apply(null, arguments);
        pattern += "/%s";
    }
    else {
        pattern += "%s";
    }
    return util.format( pattern , this.serviceConfig.serviceUrl, formatted);
};

BaseService.prototype.restUrl = function(id, endpoint){
    if (arguments.length === 0 ){
        return this.serviceConfig.RestUrl;
    }
    var formatted = "";
    var pattern = "%s/%s";
    if ( endpoint ){
        formatted = util.format.apply(null, _.slice(arguments,1));
        pattern += "/%s";
    }
    return util.format( pattern, this.serviceConfig.RestUrl, id , formatted);
};
BaseService.prototype.restUrlNested = function(nestedService, id, endpoint){
    var reqPath = util.format("%s/%s", this.serviceConfig.RestUrl, nestedService);
    if (arguments.length === 1 ){
        return reqPath;
    }
    var formatted = "";
    var pattern = "%s/%s";
    if ( endpoint ){
        formatted = util.format.apply(null, _.slice(arguments,2));
        pattern += "/%s";
    }
    return util.format( pattern, reqPath, id , formatted);
};

/**
 * Custom non-service rest url formatter accepts n number of args
 * @param serviceUrl
 * @param id
 * @param endpoint
 * @returns {*}
 */
BaseService.prototype.restUrlCustom = function(serviceUrl, id, endpoint){
    if (arguments.length === 1 ){
        return serviceUrl;
    }
    var formatted = "";
    var pattern = "%s/%s";
    var arr = [_.fill(Array(arguments.length), '%s').join("/")];
    _.each(arguments, function(arg){
        arr.push(arg);
    })
    return util.format.apply(null, arr);
};


BaseService.prototype.getRestObjects = function(){
    return {};
};

BaseService.prototype.name = function(){
    return _.get(this.serviceConfig, 'name');
};
BaseService.prototype.find = function (id) {
    return this.getCached(this.restUrl(id));
};

/**
 * Checks to see if there are more arguments than expected, assuming the extra argument is more options.
 * @param args Arguments into the function
 * @param expected How many arguments did your function declare
 * @param options Options either specified into other function or built somehow, will be merged with this
 * @returns {*|{}} Options object for query
 */
BaseService.prototype.mergeOptions = function(args, expected, options){
    expected = _.isNumber(expected) ? expected : args.length;
    options = options || {};
    if (args.length > expected){
        var opts = args[expected] || {};
        options = _.merge(options, opts);
    }
    return options;
};

BaseService.prototype.bindClient = function(client){
    var that = this;
    this.get = client.get.bind(client);
    this.post = client.post.bind(client);
    this.postJson = client.postJson.bind(client);
    this.putJson = client.putJson.bind(client);
    this.put = client.put.bind(client);
    this.del = client.del.bind(client);
    this._client = client;
    this.Services = client.Services;
    var cacher = JsapiCache.cache.bind(this);
    this.getCached = function(){
          return  cacher(arguments,that.get, that.serviceConfig.ttl || 10*60*1000);
    };

    return this;
};

module.exports = BaseService;