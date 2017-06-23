/**
 * Created by eliot on 6/22/15.
 */

var _ = require('lodash'),
    util = require('util'),
    BaseService = require("../BaseService")

    ;

/**
 * ChallengeService is still a work in progress.  It uses many different Services/Resources like Challenge, Challenge, etc..
 * @constructor
 */
function ChallengeService() {
    var self = this;
    BaseService.call(this, {
        serviceUrl: "challenges",
        RestUrl: "challenges",
        name: "Challenges"
    });


}

util.inherits(ChallengeService, BaseService);

ChallengeService.prototype.find = function (id) {
    var self = this;
    return this.get(this.restUrl(id)).then(function (item) {
        return new self._client.Models.Challenge(item);
    });
};
ChallengeService.prototype.list = function (query) {
    var self = this;
    var options = {};
    if (query) {
        options.query = query;
    }

    return this.get(this.restUrl(), options).then(function (items) {
        _.each(items, function(item){
            item = new self._client.Models.Challenge(item);
        });
        return items;
    });
};

ChallengeService.prototype.insert = function (data) {
    var details = {};
    if (data.hasOwnProperty('toObject')) {
        details = data.toObject();
    }
    else {
        details = data;
    }
    return this.postJson(this.restUrl(), details);
};

ChallengeService.prototype.getRestObjects = function () {
    var self = this;
    var out = {
        'challenges': self._client.Models.Challenge
    };
    return out;
};

ChallengeService.prototype.getChallengeActivity = function(challenge_id, id){
  return this.get(this.restUrl(challenge_id, util.format("/activities/%s", id)));
};

ChallengeService.prototype.getChallengeActivities = function(challenge_id){
    return this.get(this.restUrl(challenge_id, '/activities'));
};

ChallengeService.prototype.getEvents = function(query){
    return this.get(this.restUrl('events/'), query);
};

ChallengeService.prototype.getEvent = function(eventId){
    return this.get(this.restUrl('events/', eventId));
};

ChallengeService.prototype.getAssets = function(challenge_id){
    return this.get(this.restUrl(challenge_id, '/assets'));
};


module.exports = ChallengeService;
/**
 * Created by eliot on 6/22/15.
 */

var _ = require('lodash'),
    util = require('util'),
    BaseService = require("../BaseService")

    ;

/**
 * ChallengeService is still a work in progress.  It uses many different Services/Resources like Challenge, Challenge, etc..
 * @constructor
 */
function ChallengeService() {
    var self = this;
    BaseService.call(this, {
        serviceUrl: "challenges",
        RestUrl: "challenges",
        name: "Challenges"
    });


}

util.inherits(ChallengeService, BaseService);

ChallengeService.prototype.find = function (id) {
    var self = this;
    return this.get(this.restUrl(id)).then(function (item) {
        return new self._client.Models.Challenge(item);
    });
};
ChallengeService.prototype.list = function (query) {
    var self = this;
    var options = {};
    if (query) {
        options.query = query;
    }

    return this.get(this.restUrl(), options).then(function (items) {
        _.each(items, function(item){
            item = new self._client.Models.Challenge(item);
        });
        return items;
    });
};

ChallengeService.prototype.insert = function (data) {
    var details = {};
    if (data.hasOwnProperty('toObject')) {
        details = data.toObject();
    }
    else {
        details = data;
    }
    return this.postJson(this.restUrl(), details);
};

ChallengeService.prototype.getRestObjects = function () {
    var self = this;
    var out = {
        'challenges': self._client.Models.Challenge
    };
    return out;
};

ChallengeService.prototype.getChallengeActivity = function(challenge_id, id){
  return this.get(this.restUrl(challenge_id, util.format("/activities/%s", id)));
};

ChallengeService.prototype.getChallengeActivities = function(challenge_id){
    return this.get(this.restUrl(challenge_id, '/activities'));
};

ChallengeService.prototype.getEvents = function(query){
    return this.get(this.restUrl('events/'), query);
};

ChallengeService.prototype.getEvent = function(eventId){
    return this.get(this.restUrl('events/', eventId));
};

ChallengeService.prototype.getAssets = function(challenge_id){
    return this.get(this.restUrl(challenge_id, '/assets'));
};


module.exports = ChallengeService;
