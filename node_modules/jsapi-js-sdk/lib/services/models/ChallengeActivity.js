/**
 * Created by eliot on 6/22/15.
 */

var _ = require('lodash');

var timestamps = ['created','updated','startDate','endDate'];

var REST_URL = "challenges";
function ChallengeActivity(data){
    var self = this;
    _.extend(this, data||{});
}

ChallengeActivity.prototype._endpoint = function(){

    return REST_URL + "/" + this.challengeId + "/activities/" + this.id;
};
ChallengeActivity.prototype.getSelectedSettings = function(){
    var out = {};
    _.each(this.settings, function(setting){
        out[key] = setting.value;
    })
    return ;
};

ChallengeActivity.prototype.toObject = function(){
    var out = _.extend({}, self);
    var self = this;

    return out;
};

module.exports = ChallengeActivity;