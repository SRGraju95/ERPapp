/**
 * Created by eliot on 6/23/15.
 */

var _ = require("lodash"),
    util = require('util');


module.exports = {};

/**
 * Recursively look for and call "toObject" when present, map arrays through the same function
 * @param obj {*} Various types, arrays and objects will get the special treatment
 * @returns {Object} Simplified JS Object
 */
function toObject(obj){
    if (_.isArray(obj)){
        return _.map(obj, toObject);
    }
    else if (obj && typeof obj.toObject === 'function'){
        return obj.toObject();
    }
    else {
        return obj;
    }
}


module.exports.toObject = toObject;


/**
 * Merges an individual Jsapi Service onto the rest client.  Needs to be called with "this" = the rest.Service instance
 * @type {Function}
 * @return {rest.Service}
 */
var mergeService = module.exports.mergeService = function mergeService(serviceName, serviceConstructor) {
    var self = this;
    // Instantiate and bind the new service
    self.Services[serviceName] = (new serviceConstructor()).bindClient(self);

    _.extend(self._restObjects, self.Services[serviceName].getRestObjects() );

    return self;
};


/**
 * Merge registered "Rest Services" onto a rest Client.  Needs to be called with "this" = client
 * @type {Function}
 * @param servicesConfig {Object} Map of Service names to Service Constructors
 * @return {rest.Service} The configured Restler Service instance
 */
var mergeServices = module.exports.mergeServices = function mergeServices(servicesConfigs) {
    var self = this;
    self.Services = self.Services || {};
    _.forEach(servicesConfigs, function (functions, serviceName) {
        mergeService.call(self, serviceName, functions);
    });
    return self;
};

/**
 * Generates the path to the grant endpoint for oauth based on jsapi configs (paths and root)
 * @type {Function}
 * @return {String}
 */
var grantPath = module.exports.grantPath = function grantPath(){
    return util.format(this.paths.grant, this.root);
};

/**
 * Generates the the base path to non-auth requests, by default includes /services/latest
 * @type {Function}
 * @return {String}
 */
var basePath = module.exports.basePath = function basePath(){
    return util.format(this.paths.base, this.root);
};

/**
 * NamedFunction creates properly named constructors that will work with instanceof
 * @param name
 * @param args
 * @param body
 * @param scope
 * @param values
 * @returns {*}
 * @constructor
 */

function NamedFunction(name, args, body, scope, values) {
    if (typeof args == "string")
        values = scope, scope = body, body = args, args = [];
    if (!_.isArray(scope) || !_.isArray(values)) {
        if (typeof scope == "object") {
            var keys = Object.keys(scope);
            values = keys.map(function (p) {
                return scope[p];
            });
            scope = keys;
        } else {
            values = [];
            scope = [];
        }
    }
    try {
        var result = Function(scope, "function " + name + "(" + args.join(", ") + ") {\n" + body + "\n}\nreturn " + name + ";").apply(null, values);
        return result;
    } catch (err) {
        console.log("ERROR CREATING NAMED FUNCTION, arguments.. ", arguments);
        throw err;
    }

}
module.exports.NamedFunction = NamedFunction;

