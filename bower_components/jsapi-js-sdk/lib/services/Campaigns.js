/**
 * Created by eliot on 6/22/15.
 */

var _ = require('lodash'),
    util = require('util'),
    BaseService = require("../BaseService");

/**
 * CampaignService is still a work in progress.  It uses many different Services/Resources like Activity, Challenge, etc..
 * @constructor
 */
function CampaignService() {
    var self = this;
    BaseService.call(this, {
        serviceUrl: "campaigns",
        RestUrl: "campaigns",
        name: "Campaigns"
    });
}

util.inherits(CampaignService, BaseService);

CampaignService.prototype.list = function (size) {
    var options = {query: {size: size}};
    return this.get(this.serviceEndpoint(), options);
};

CampaignService.prototype.getAssets = function (id) {
    return this.get(this.serviceEndpoint() + '/' + id + '/assets');
};

CampaignService.prototype.getChallenges = function (id, query) {
    var options = {query: query};
    return this.get(this.serviceEndpoint() + '/' + id + '/challenges', options);
};

CampaignService.prototype.getRestObjects = function () {
    var self = this;
    var out = {
        'campaigns': self._client.Models.Campaign,
        'challenges': self._client.Models.Challenge
    };
    return out;
};


module.exports = CampaignService;
