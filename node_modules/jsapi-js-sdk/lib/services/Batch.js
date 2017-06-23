/*
batch endpoint
*/

var _ = require('lodash'),
    util = require('util'),
    BaseService = require("../BaseService");

function BatchService() {
    var self = this;
    BaseService.call(this, {
        serviceUrl: "batch",
        RestUrl: "batch",
        name: "Batch"
    });
}
util.inherits(BatchService, BaseService);


BatchService.prototype.createBatchCall = function(data){
    return this.postJson(this.restUrlCustom(this.serviceConfig.RestUrl), data);
};

module.exports = BatchService;
