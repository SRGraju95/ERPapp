/**
 * Created by eliot on 6/22/15.
 */

var _ = require('lodash');

var timestamps = ['created','updated','startDate','endDate'];

var REST_URL = "challenges";
function Challenge(data){
    var self = this;
    _.extend(this, data||{});

    if (this.created){
        this.created = new Date(this.created);
    }
    _.each(timestamps, function(field){
        if (self[field]){
            self[field] = new Date(self[field]);
        }
    });
}

Challenge.prototype._endpoint = function(){

    return REST_URL + "/" + this.id;
};
Challenge.prototype.toObject = function(){
    var out = _.extend({}, _.omit(this, ["updated","created","permissions"]));
    var self = this;
    _.each(timestamps, function(field){
        if (out[field]){
            out[field] = out[field].getTime();
        }
    });
    return out;
};

module.exports = Challenge;