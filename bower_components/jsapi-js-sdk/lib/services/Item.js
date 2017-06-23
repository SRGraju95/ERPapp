/**
 * Created by eliot on 6/24/15.
 */

var _ = require('lodash'),
    util = require('util')
    , BaseService = require("../BaseService")
    , Q = require('q');

function ItemService() {
    var self = this;

    BaseService.call(this, {
        serviceUrl: "item",
        RestUrl: "item",
        name: "Item",
        virtualItemUrl: "virtualitems",
        physicalItemUrl: "physicalitems",
        storeItemUrl: "storeitems"
    });
}
util.inherits(ItemService, BaseService);

ItemService.prototype.find = function(id){
    return this.list({itemId: id}).then(function(result){
        return _.first(result.catalog);
    });
};

ItemService.prototype.list = function(data){
    var self = this;
    return this.postJson(this.serviceEndpoint('list'), data);
};

/**
 * Get virtualItems
 * @param id
 * @returns {*}
 */
ItemService.prototype.getVirtualItem = function(id){
    return this.get(this.restUrlCustom(this.serviceConfig.virtualItemUrl, id));
};

/**
 * List virtual Items
 * @returns {*}
 */
ItemService.prototype.getVirtualItems = function(){
    return this.get(this.restUrlCustom(this.serviceConfig.virtualItemUrl), this.mergeOptions(arguments, 0, {}));
};

ItemService.prototype.createVirtualItem = function(data){
    return this.postJson(this.restUrlCustom(this.serviceConfig.virtualItemUrl), data);
};

ItemService.prototype.updateVirtualItem = function(data){
    return this.putJson(this.restUrlCustom(this.serviceConfig.virtualItemUrl), data);
};

ItemService.prototype.deleteVirtualItem = function(id){
    return this.del(this.restUrlCustom(this.serviceConfig.virtualItemUrl, id));
};

/**
 * Get physicalItems
 * @param id
 * @returns {*}
 */
ItemService.prototype.getPhysicalItem = function(id){
    return this.get(this.restUrlCustom(this.serviceConfig.physicalItemUrl, id));
};

/**
 * List physical Items
 * @returns {*}
 */
ItemService.prototype.getPhysicalItems = function(){
    return this.get(this.restUrlCustom(this.serviceConfig.physicalItemUrl), this.mergeOptions(arguments, 0, {}));
};

ItemService.prototype.createPhysicalItem = function(data){
    return this.postJson(this.restUrlCustom(this.serviceConfig.physicalItemUrl), data);
};

ItemService.prototype.updatePhysicalItem = function(data){
    return this.putJson(this.restUrlCustom(this.serviceConfig.physicalItemUrl), data);
};

ItemService.prototype.deletePhysicalItem = function(id){
    return this.del(this.restUrlCustom(this.serviceConfig.physicalItemUrl, id));
};

/**
 * NEW STORE ITEM ENDPOINTS FOR JSAPI 2.3+
 */

/**
 * Get storeItems
 * @param id
 * @returns {*}
 */
ItemService.prototype.getStoreItem = function(id){
    return this.get(this.restUrlCustom(this.serviceConfig.storeItemUrl, id));
};

/**
 * List store Items
 * @returns {*}
 */
ItemService.prototype.getStoreItems = function(){
    return this.get(this.restUrlCustom(this.serviceConfig.storeItemUrl), this.mergeOptions(arguments, 0, {}));
};

ItemService.prototype.createStoreItem = function(data){
    return this.postJson(this.restUrlCustom(this.serviceConfig.storeItemUrl), data);
};

ItemService.prototype.updateStoreItem = function(data){
    return this.putJson(this.restUrlCustom(this.serviceConfig.storeItemUrl, data.id), data);
};

ItemService.prototype.deleteStoreItem = function(id){
    return this.del(this.restUrlCustom(this.serviceConfig.storeItemUrl, id));
};


module.exports = ItemService;
