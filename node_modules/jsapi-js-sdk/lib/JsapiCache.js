/**
 * Created by eliot on 7/11/15.
 */
var Q = require('q'),
    _ = require('lodash')
    , events = require("events")
    , util = require('util')
    , md5 = require('MD5')
    ;


function JsapiCache(){
    events.EventEmitter.call(this);

    var caches = {

    };

    var self = this;
    var tracker = {
        hits: 0,
        misses: 0,
        cached: 0,
        expunged: 0,
        uncached: 0,
        requests: 0
    };
    function futureDateMS(ttl){
        ttl = ttl || 1000;
        return new Date(new Date().getTime() + (ttl));
    }
    self.__proto__.getCached = function(service, cacheKey){
        var key = typeof cacheKey === 'string' ? cacheKey : md5(JSON.stringify(cacheKey));
        var serviceName = typeof service === 'object' ? service.name() : service;
        var serviceKey = serviceName + "." + key;
        var item =_.get(caches, serviceKey);
        var out = null;
        if (item){
           out = item.promise;
        }
        return out;

    };

    self.__proto__.hasCached = function(service, key){
        var serviceName = typeof service === 'object' ? service.name() : service;
        var serviceKey = serviceName + "." + key;

        return self.getCached(service, key) != null ;
    };
    self.__proto__.clearCached = function(service){
        caches[service.name()] = {};
    };
    self.__proto__.cacheKeys = function(service){
        return _.keys(caches[service.name()] || {});
    };
    self.__proto__.itemCount = function(service){
        return self.cacheKeys(service).length;
    };
    self.__proto__.getTracker = function(){
        return tracker;
    };
    self.__proto__.expunge = function(serviceName, key){

        if (_.has(caches, serviceName + '.' + key)){
            delete caches[serviceName][key];
            tracker.expunged++;
            self.emit('expunged', {service: serviceName, key: key});
        }
        else {
           // console.log("KEY NOT FOUND TO EXPUNGE " , serviceName + '.' + key);
        }
        return self;

    };

    self.__proto__.incRequests = function(){
      tracker.requests++;
    };
    self.__proto__.cache = function(args, promiseFnc, ttl){
        var service = this;
        var key = md5(JSON.stringify(args));
        var serviceKey = service.name() + "." + key;
        ttl = ttl || 60*10*1000;
        tracker.hits++;
        var tsExpire = futureDateMS(ttl);
        function callAndSet(){
            tracker.hits--;
            tracker.misses++;
            var tmpPromise = promiseFnc.apply(service, args)
                .then(function(result){
                    _.set(caches, serviceKey, {promise: tmpPromise, expire: tsExpire  } );
                    tracker.cached++;
                    self.emit("Item Cached " , serviceKey);
                    setTimeout(function(){
                        //console.log("EXPUNGING");
                        self.expunge(service.name(), key);
                    }, ttl);
                    return result;

                }, function(err){

                       tracker.uncached++;
                       if (!_.isError(err) && _.isObject(err)){
                           var error = new Error(err.message || err.toString());
                           _.merge(error, err);
                           throw error;
                       }
                        else {
                        throw err;
                       }
                    })
                ;


            return tmpPromise;
        }
        var tmpRes = self.getCached(service, key);
        return tmpRes ? tmpRes : callAndSet();
    };


}



util.inherits(JsapiCache, events.EventEmitter);


module.exports = new JsapiCache();