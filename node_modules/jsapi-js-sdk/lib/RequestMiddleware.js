/**
 * JSAPI Request interceptors/Middleware to convert requests into promises and to provide unwrapping of data
 *
 *
 */

var _ = require("lodash"),
    Q = require("q"),
    JsapiCache = require("./JsapiCache"),


    ERROR_TYPES = {
        REQUEST_ERROR: 'requestError',
        JSAPI_ERROR: 'jsapiError',
        TIMEOUT: 'timeout'
    };
var jsapi = false;
module.exports = {};
module.exports.ERROR_TYPES = ERROR_TYPES;

/**
 * Unwraps the result for sucessful requests, extracting out the result.content if it is a list
 *
 * @param data {object} Response data from JSAPI
 * @type {Function}
 */
var resultMiddleware = module.exports.resultMiddleware = function (data) {
    if (_.get(data, 'result')) {
        var out = {};
        var rawData = _.extend({}, data);
        if (typeof data.result === 'object') {
            if (data.result.content && _.isArray(data.result.content)) {
                var metaData = _.omit(data.result, 'content');
                out = data.result.content;
                out.getMeta = function () {
                    return metaData;
                };
            }
            else {
                _.extend(out, data.result);
            }
            out._raw = function () {
                return rawData;
            };

        }
        else {
            out = data.result;
        }
        return out;
    }
    else {
        return data;
    }
};

/**
 * Unwraps the result for Error requests, extracting out the relevant data
 *
 * @param data {object} Response data from JSAPI
 * @type {Function}
 */
var errorMiddleware = module.exports.errorMiddleware = function (data) {
    var out = {
    };
    if (data && data.error && !data.error.success) {
        _.extend(out, {
            code: data.error.code,
            message: data.message,
            result: data.result,
            parameters: data.parameters
        });
    }
    else {
        out.data = data;
    }
    return out;
};

module.exports.setJsapi = function(api){
    jsapi = api;
    return jsapi;
};

/**
 *  Wrap the rest request to make it a deferred promise type deal
 * @type {Function}
 */
module.exports.deferredRequest = function deferredRequest(req) {
    var that = this;
    var defer = Q.defer();
    var logger ;
    var extraData = undefined;
    if (jsapi.debugging()){
        req.tsStart = (new Date()).getTime();
    }
    if (this.hasOwnProperty('logger') ) {
        logger = typeof this.logger === 'function' ? this.logger() : this.logger;
    }
    else {
        logger = false;
    }
    if (arguments.length > 1 ){
        extraData = arguments[1];
    }
    function logRequest(logData, logLevel){
        logLevel = logLevel || 'info';

        if (logger){
            if (extraData){
                logger[logLevel](_.extend(logData, extraData));
            }
            else {
                logger[logLevel]( logData);
            }
        }
    }


    req.on("complete", function (data, response) {
        //if (response){
        //    logRequest({path: response.req.path , statusCode: response.statusCode, method: response.req.method, 'event': 'complete', reqId: data.requestId }, 'debug');
        // }
        if (jsapi.debugging()){
            try {
            logRequest({path: req.url.path , 'duration': (new Date()).getTime() - req.tsStart , statusCode: response.statusCode, method: response.req.method, 'event': 'complete', "responseBody": data }, 'debug');
            } catch(e){

            }
            }
        //defer.resolve(resultMiddleware(data));
    }).on("success", function(data, response){
        defer.resolve(resultMiddleware(data));
    }).on("fail", function (data, response) {
        if (jsapi.debugging()){
            try {
                logRequest({statusCode: response.statusCode, errorType: ERROR_TYPES.REQUEST_ERROR, method: response.req.method, path: response.req.path, headers: response.req._headers, event: 'fail' }, 'debug')
            } catch(e){

            }
        }
        //logRequest({statusCode: response.statusCode, errorType: ERROR_TYPES.JSAPI_ERROR, errorCode: data.error.code, jsapiMsg: data.message, requestId: data.requestId, result: data.result , method: response.req.method, path: response.req.path, event: 'fail' }, 'warn');

        //Get a new token if the old one has expired and retry.
        if (response.statusCode === 401 && data.error === 'invalid_token') {
            that.onTokenExpired().then(function(token) {
                that._token = token;
                req.options.accessToken = token.access_token;
                req.retry(0);
            }, function(err) {
                var jerr = _.extend({},  errorMiddleware(data) , {response: response, statusCode: response.statusCode, type: ERROR_TYPES.JSAPI_ERROR, url: response.req.path, headers: response.req._headers })
                jerr.message = 'JSAPI returned invalid_token, and the onTokenExpired function failed to return a new token.';
                jerr.onTokenExpiredError = err;
                defer.reject(jerr);
            });
        } else {
            defer.reject(_.extend({},  errorMiddleware(data) , {response: response, statusCode: response.statusCode, type: ERROR_TYPES.JSAPI_ERROR, url: response.req.path, headers: response.req._headers }) );
        }
    }).on('error', function (err, response) {
        try {
            logRequest({statusCode: response.statusCode, errorType: ERROR_TYPES.REQUEST_ERROR, method: response.req.method, path: response.req.path, headers: response.req._headers, event: 'error' }, 'warn');
        } catch(e){

        }
        defer.reject({error: err, response: response, type: ERROR_TYPES.REQUEST_ERROR});
    }).on('timeout', function (ms) {
        try {
            logRequest({
                statusCode: -500,
                timeout: ms,
                errorType: ERROR_TYPES.TIMEOUT,
                url: req.url,
                headers: req._headers,
                event: 'timeout'
            }, 'error');
        } catch(e){

        }
            defer.reject({message: "REQUEST TIMEOUT", ms: ms, type: ERROR_TYPES.TIMEOUT, error: "TIMEOUT"});
    });

    return defer.promise;
};
