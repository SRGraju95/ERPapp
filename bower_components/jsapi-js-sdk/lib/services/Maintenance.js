
var _ = require("lodash")
    , util = require('util')
    , BaseService = require("../BaseService")
    , Q = require('q')
    ;

function MaintenanceService() {
    BaseService.call(this, {
        serviceUrl: "maintenance",
        RestUrl: "maintenance",
        name: "Maintenance"
    });
}


util.inherits(MaintenanceService, BaseService);


MaintenanceService.prototype.check = function(){
    return this.get(this.serviceEndpoint());
};

MaintenanceService.prototype.update= function(data){
    return this.postJson(this.serviceEndpoint(), data);
};



module.exports = MaintenanceService;

