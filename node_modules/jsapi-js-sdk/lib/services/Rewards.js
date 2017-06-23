/**
 * Created by eliot on 7/11/15.
 */


/**
 * Created by eliot on 6/22/15.
 */

var _ = require('lodash'),
    util = require('util'),
    BaseService = require("../BaseService")

    ;

/**
 * RewardService is still a work in progress.  It uses many different Services/Resources like Activity, Challenge, etc..
 * @constructor
 */
function RewardService() {
    var self = this;
    BaseService.call(this, {
        serviceUrl: "rewards",
        RestUrl: "rewards",
        name: "Rewards"
    });


}

util.inherits(RewardService, BaseService);

RewardService.prototype.list = function (query) {
    var self = this;
    var options = {};
    if (query) {
        options.query = query;
    }
    return this.get(this.restUrl(), options);
};

RewardService.prototype.getRestObjects = function () {
    var self = this;
    var out = {

    };
    return out;
};


module.exports = RewardService;
