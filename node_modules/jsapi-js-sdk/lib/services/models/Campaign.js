/**
 * Created by eliot on 6/22/15.
 */

var _ = require('lodash');

var timestamps = ['created', 'updated'];

var REST_URL = "campaigns";

function Campaign(data) {
    var self = this;
    _.extend(this, data || {});

    if (this.created) {
        this.created = new Date(this.created);
    }
    _.each(timestamps, function (field) {
        if (self[field]) {
            self[field] = new Date(self[field]);
        }
    });
}

Campaign.prototype._endpoint = function () {

    return REST_URL + "/" + this.id;
};


Campaign.prototype.toObject = function () {
    var out = _.extend({}, _.omit(this, ["updated", "created", "permissions"]));
    var self = this;
    _.each(timestamps, function (field) {
        if (out[field]) {
            out[field] = out[field].getTime();
        }
    });
    return out;
};

module.exports = Campaign;