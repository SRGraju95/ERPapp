/**
 * Created by eliot on 6/19/15.
 * Admin Service extends JSAPI functionality
 */

var _ = require('lodash'),
    util = require('util'),
    BaseService = require("../BaseService")
    ;

function ActivityService() {
    var self = this;
    BaseService.call(this, {
        serviceUrl: "activities",
        RestUrl: "activities",
        name: "Activity",
        ttl: 60*20*1000
    });
}
util.inherits(ActivityService, BaseService);

ActivityService.prototype.find = function (id) {
    var self = this;
    return this.get(this.restUrl(id)).then(function (activity) {
        return new self._client.Models.Activity(activity);
    });
};


ActivityService.prototype.list = function (query) {
    var self = this;
    var options = {};
    if (query) {
        options.query = query;
    }
    return this.get(this.restUrl(), options).then(function (activities) {
        _.each(activities, function (activity) {
            activity = new self._client.Models.Activity(activity);
        });
        return activities;
    });
};

ActivityService.prototype.insert = function (data) {
    var details = {};
    if (data.hasOwnProperty('toObject')) {
        details = data.toObject();
    }
    else {
        details = data;
    }
    return this.postJson(this.restUrl(), details);
};

ActivityService.prototype.createInstance = function (activityInstance, testMode) {
    var self = this;
    var options = {};
    if (testMode){
        options.query = {'test': true};
    }
    return this.postJson(self._client.Models.ActivityInstance.REST_URL, activityInstance, options)
        .then(function (result) {
        if (result && result.id) {
            activityInstance.id = result.id;
        }
        return activityInstance;
    });
};


ActivityService.prototype.completeInstance = function (activityInstance,resultsData) {
    var self = this;
    var instance_id = typeof activityInstance === 'object' ? activityInstance.id : activityInstance;
    return this.postJson( util.format("%s/%s/results", self._client.Models.ActivityInstance.REST_URL, instance_id), resultsData ).then(function (result) {
        return result;
    });
};
ActivityService.prototype.getRestObjects = function () {
    var self = this;
    var out = {
        'activities': self._client.Models.Activity,
        'activityoccurrences': self._client.Models.ActivityInstance
    };

    return out;
};

module.exports = ActivityService;