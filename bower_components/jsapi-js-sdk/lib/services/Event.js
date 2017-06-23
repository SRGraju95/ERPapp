var _ = require('lodash'),
    util = require('util')
    , BaseService = require("../BaseService")
    , Q = require('q')

    ;
function EventsService() {
    var self = this;
    BaseService.call(this, {
        serviceUrl: "bre/events",
        RestUrl: "bre/events",
        name: "Events"
    });

}

util.inherits(EventsService, BaseService);


EventsService.prototype.fireEvent = function (name, params) {
    return this.postJson(this.serviceEndpoint(), {eventName: name, params: params});
};

module.exports = EventsService;
