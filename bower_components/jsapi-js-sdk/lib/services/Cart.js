/**
 * Created by eliot on 6/24/15.
 */

var _ = require('lodash'),
    util = require('util')
    , BaseService = require("../BaseService")
    , Q = require('q')
    , CartSchema = require("./schemas/Carts")

    ;
function CartService() {
    var self = this;
    //this._schemas = require("./schemas/Carts");
    BaseService.call(this, {
        serviceUrl: "carts",
        RestUrl: "carts",
        name: "Cart",
        schemas : _.extend({}, CartSchema)
    });
    //BaseService.prototype.schema.call(this, CartSchema);
}

CartService.prototype = _.create(BaseService.prototype, {
    'constructor': CartService
});

/**
 * Resolves with a string not an object. it's just the cartGUID
 * @param owner {Number} Optional id of the user to create cart for
 * @returns {*}
 */
CartService.prototype.createCart = function (owner) {
    var self = this;
    var options = {};
    if (owner){
        options.query = {owner: owner};
    }
    return this.post(this.serviceEndpoint(), this.mergeOptions(arguments, 1, options)).then(function(guid){
          return guid;
    }, function(err){

        return err;
    });
};

/**
 *
 * "CartItemRequest": {
            "description": "",
            "id": "CartItemRequest",
            "properties": {
                "affiliate_key": {
                    "required": false,
                    "type": "string"
                },
                "quantity": {
                    "required": false,
                    "format": "int32",
                    "type": "integer",
                    "default": 1
                },
                "status": {
                    "required": false,
                    "type": "string"
                },
                "affiliateKey": {
                    "required": false,
                    "type": "string"
                },
                "catalog_sku_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "catalog_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                }
            }
        }
 */

/**
 * CartItemRequest {
        affiliate_key (string, optional),
        quantity (integer, optional),
        status (string, optional),
        affiliateKey (string, optional),
        catalog_sku_id (integer, optional),
        catalog_id (integer, optional)
    }
 *
 *
 * @param cartId {String} GUID for the Cart
 * @param itemInfo {CartItemRequest}
 * @returns {*}
 */
CartService.prototype.addItem = function (cartId, itemInfo) {
    var self = this;
    var guid = _.isObject(cartId) ? cartId.guid : cartId;


    return this.postJson(self.restUrl(guid, 'items'), itemInfo)
        .then(function(output){
            return true;
        });
};

CartService.prototype.createAndAddItem = function (itemInfo, owner) {
    var self = this;
    var guid ;
    var defer = Q.defer();
    self.createCart(owner)
        .done(function(cartId){
        self.addItem(cartId, itemInfo)
            .done(function(res){
                self.getCart(cartId)
                    .done(function(cartResult){
                        defer.resolve(cartResult);
                    }, function(err){
                        defer.reject(err);
                    })
            },
            function(err){
               defer.reject(err);
                }
            )
    }, function(err){
        defer.reject(err);
    })


    return defer.promise;

};

CartService.prototype.getCart = function (cartId) {
    var guid ;
    var self = this;
    var schema = self.schema();

    guid = _.isObject(cartId) ? cartId.guid : cartId;


    var url = this.restUrl(guid);
    return this.get(url, this.mergeOptions(arguments, 1, {})).then(function(cartResult){
       //
        cartResult.guid = guid;

        return cartResult;
    });
};

CartService.prototype.checkout = function (cartId) {
    var guid  = _.isObject(cartId) ? cartId.guid : cartId;
    return this.postJson(this.restUrl(guid, 'checkout'));
};


module.exports = CartService;
