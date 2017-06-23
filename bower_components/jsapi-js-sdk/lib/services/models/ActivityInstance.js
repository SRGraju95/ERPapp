/**
 * Created by eliot on 6/22/15.
 */

var _ = require("lodash"),
    Activity = require("./Activity"),
    AvailableSetting = require("./AvailableSetting")
    ;


var ActivityInstanceStatuses = {'SETUP':"SETUP",'OPEN':"OPEN",'PLAYING':"PLAYING",'FINISHED':"FINISHED",'ABANDONED':"ABANDONED"};

function ActivityInstance(data, options){
    var self = this;
    this.status = ActivityInstanceStatuses.SETUP;
    this.settings = [];
    this.activityId = null;
    _.extend(this, data || {});
    var theActivity = options.activity || null;
    var theChallenge = options.challenge || null;

    this.getActivity = function(){
        return theActivity;
    };
    this.getChallengeEvent = function(){
        return theChallenge;
    }

}

ActivityInstance.create = function(settings, options, activity, challengeEvent){
    var data =
    {
        "activityId": activity.id,
        "status": ActivityInstanceStatuses.SETUP,
        "settings": activity.extractSettings(settings)
    };
    if (challengeEvent && challengeEvent.hasOwnProperty('id') && (challengeEvent.hasOwnProperty('challengeId') || challengeEvent.hasOwnProperty('challenge')) ){
        data.eventId = challengeEvent.id;
        if (challengeEvent.hasOwnProperty('challengeId')){
            data.challengeActivityId = challengeEvent.challengeId;
        }
        else if (challengeEvent.hasOwnProperty('challenge') && typeof challengeEvent.challenge === 'object' ){
            data.challengeActivityId = challengeEvent.challenge.id;
        }
    }

    var model = _.extend({}, options || {}, data);

    var res = new ActivityInstance(model, {activity: activity, challenge: challengeEvent});

    return res;
};

ActivityInstance.STATUSES = ActivityInstanceStatuses;

ActivityInstance.REST_URL = "activityoccurrences";

module.exports = ActivityInstance;