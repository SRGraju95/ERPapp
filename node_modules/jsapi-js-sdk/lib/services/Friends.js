/**
 * Created by eliot on 6/19/15.
 * Friends Service extends JSAPI functionality to include usage of the "friendship" service
 */

var _ = require('lodash'),
    util = require('util')
    , BaseService = require("../BaseService")
    , Q = require('q')

    ;
function FriendsService() {
    var self = this;
    BaseService.call(this, {
        serviceUrl: "friendship",
        RestUrl: "friendship",
        name: "Friends"
    });
}

util.inherits(FriendsService, BaseService);


/**
 * Get the Friends for the active User Connection
 * @param pagination {object}  {page: 1, limit: 10000}  Defaults OPTIONAL
 * @returns {Promise}
 */
FriendsService.prototype.getFriends = function (pagination) {
    pagination = pagination || {};
    var defaultPagination = {
        "page": 1,
        "limit": 1000
    };
    return this.postJson(
        this.serviceEndpoint("getfriends"),
        _.extend({}, defaultPagination, pagination),
        this.mergeOptions(arguments, 1, {})
    );
};

FriendsService.prototype.addFriend = function (target_id, id) {
    return this.postJson(this.serviceEndpoint("addfriend"), {target_user_id: target_id, user_id: id});
};

module.exports = FriendsService;