


var _ = require('lodash'),
    util = require('util'),
    BaseService = require("../BaseService")
    ;

function EntitlementService() {
    var self = this;
    BaseService.call(this, {
        serviceUrl: "entitlement",
        RestUrl: "entitlement",
        name: "Entitlement"
    });
}

util.inherits(EntitlementService, BaseService);

EntitlementService.prototype.check = function (entitlement, user_id) {
    var self = this;
    var options = {};
    var data = {item_id: entitlement.itemId, sku_id: entitlement.skuId, user_id: user_id};
    return this.postJson(this.serviceEndpoint("entitlementcheck"), data, options);
};


module.exports = EntitlementService;