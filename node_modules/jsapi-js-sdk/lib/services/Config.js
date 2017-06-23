/**
 * Created by eliot on 6/21/15.
 */

/**
 * Created by eliot on 6/19/15.
 * Admin Service extends JSAPI functionality
 */

var _ = require('lodash'),
    util = require('util')
    , BaseService = require("../BaseService")
    , Q = require('q')

    ;
function ConfigService() {
    var self = this;
    BaseService.call(this, {
        serviceUrl: "configs",
        RestUrl: "configs",
        name: "Config"
    });
}

util.inherits(ConfigService, BaseService);

/**
 * Fetch a config by it's unique name, basically a restful get but not with id, with name
 * @param name {String} unique name of the config to fetch
 * @return {Promise} Resolves with JSON parsed mapped value
 */
ConfigService.prototype.find = function (name) {
    return this.get(this.restUrl(name)).then(function (cfg) {
        try {
            var out = JSON.parse(cfg.value);
            return out;
        } catch (err) {
            return cfg;
        }
    });
};

ConfigService.prototype.list = function (options) {
    options = options || {};
    return this.get(this.restUrl(), options);

};
/**
 * Save a config (No need to post on create because the id's must be unique and are strings)
 * @param name {String} Name of the config (required)
 * @param value {*} The unjsonified value, will be auto stringified before sending
 * @returns {Promise}
 */
ConfigService.prototype.save = function (name, value) {
    var data = {value: JSON.stringify(value), name: name};
    return this.putJson(this.restUrl(name), data);
};

ConfigService.prototype.remove = function (name) {
    return this.del(this.restUrl(name));
};

ConfigService.prototype.create = function (name, value) {
    var data = {value: JSON.stringify(value), name: name};
    return this.postJson(this.restUrl(), data, this.mergeOptions(arguments, 2, {}));
};

ConfigService.prototype.loadAll = function () {
    var self = this;
    var configs = {};
    return this.get(this.restUrl(), {query: {size: 1000}})
        .then(function (configList) {
            var out = {};
            _.each(configList, function (obj) {
                try {
                    out[obj.name] = JSON.parse(obj.value);
                } catch (err2) {
                    out[obj.name] = obj.value;
                }
            });
            return out;
        });
};

module.exports = ConfigService;