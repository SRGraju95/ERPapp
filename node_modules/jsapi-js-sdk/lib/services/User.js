/**
 * Created by eliot on 6/19/15.
 * User Service Functions
 * Extends JSAPI with User Related Functionality and calls to JSAPI
 */
var _ = require("lodash")
    , util = require('util')
    , BaseService = require("../BaseService")
    , Q = require('q')
    ;

var serviceUrl = 'user';
var RestUrl = "users";

// Convert array of wallets into a mapped object of wallets
function mapWallets(wallets) {
    var mapped = {};
    _.each(wallets, function (wall) {
        mapped[wall.code] = wall;
    });
    return mapped;
}


function UserService() {
    var self = this;
    BaseService.call(this, {
        serviceUrl: "user",
        RestUrl: "users",
        name: "User",
        InventoryUrl: "userinventory"
    });
}

util.inherits(UserService, BaseService);


/**
 * Fetch a User Record.  It fetches the currently Authenticated Token user to fetch their own user info.  Cannot specify user_id
 */
UserService.prototype.getInfo = function () {
    var options = this.mergeOptions(arguments, 0, {});
    return this.post(this.serviceEndpoint('getinfo'), options).then(function (userInfo) {
        userInfo.wallet = mapWallets(userInfo.wallet);
        return userInfo;
    });
};

/**
 * Get a User's wallet record
 * @param user_id {Number}
 * @return {Promise} Resolves with mapped user wallet data with the currencyCode being the key in the output object
 */
UserService.prototype.getWallet = function (user_id) {
    function addGetUser(user){
        var theUser = user;
        var wallet = user.wallet;
        delete user.wallet;
        wallet.getUser = function(){
            return theUser;
        }
        return wallet;
    }
    if (!user_id ||  _.isObject(user_id)){
        var args = [];
        return this.getInfo.apply(this, arguments)
            .then(addGetUser);
    }
    else {
        return this.getUserInfo.apply(this, arguments)
            .then(addGetUser);
        }
};

/**
 * Change a specific field on a user record
 * @param user_id {Number} Users id
 * @param property {String} Name of the property
 * @param value {*} The new value to store
 * @returns {*}
 */
UserService.prototype.updateProperty = function (user_id, property, value) {
    var data = {userId: user_id, configName: property, configValue: value};
    return this.postJson(this.serviceEndpoint("update"), data, this.mergeOptions(arguments, 3, {}));
};

/**
 * Retrieve a list of users from jsapi
 * @param options {Object} StandardRequest options object
 * @returns {*}
 */
UserService.prototype.list = function (options) {
    options = options || {};
    var requestOptions = {};
    _.extend(requestOptions, options);
    return this.get(this.restUrl(), requestOptions);

};

/**
 * Get a User's Info -- Requires Admin Role or the same user as the id for the token
 * @param user_id {Number}
 * @return {Promise} Resolves with mapped user info data
 */
UserService.prototype.getUserInfo = function (user_id) {
    return this.postJson(this.serviceEndpoint(util.format('%s/info', user_id )), this.mergeOptions(arguments, 1, {}))
        .then(function (user) {
            user.wallet = mapWallets(user.wallet);
            return user;
        });
};

/**
 *
 * @param user_id
 * @param charges {Array} Array of Charge Options [{delta: -1, currencyName: 'USD', msg: 'SOME COOL MESSAGE'}]
 * @returns {{}}
 */
UserService.prototype.adjustWallet = function (user_id, charges) {
    function buildArgs(charge){
        return [user_id, charge.delta, charge.currencyName, charge.msg];
    }
    var defer = Q.defer();
    var theOptions = this.mergeOptions(arguments, 2, {});
    var chargeArgs = _.map(charges, buildArgs);
    chargeArgs.push(theOptions);
    var self = this;
    var out = {user_id: user_id, charges: _.map(charges, function(c){return _.extend({},c);}), ok: true};
    var fncs = _.map(chargeArgs, function(chargeArg){
        return self.Services.Admin.walletTransaction.apply(self.Services.Admin, chargeArg);
    });
    Q.allSettled(fncs).then(function(results){
        _.each(results, function(result, i){
            if (result.state === 'fulfilled'){
                _.extend( out.charges[i], {ok: true,  outcome: result.value });
            }
            else {
               _.extend( out.charges[i], {ok: false, error: result.reason});
                out.ok = false;
            }
        })
        if (out.ok){
            defer.resolve(out);
        }
        else {
            defer.reject(out);
        }
    })
    return defer.promise;
};


/**
 * Save a restful user object
 * @param user {Object} Full user object to save including .id field
 * @returns {Promise}
 */
UserService.prototype.saveUser = function (user) {
   return this.putJson(this.restUrl(user.id), _.omit(user, ["_id"]), this.mergeOptions(arguments, 1, {}));
};


/**
 * Retrieve a restful user object
 * @param user_id {Number} User Id
 * @returns {Promise}
 */
UserService.prototype.getUser = function (user_id) {
    return this.get(this.restUrl(user_id),this.mergeOptions(arguments, 1, {}));
};

/**
 * Get a users inventory.  Also adds a function to get the entitlement item.
 * @param user_id
 * @param inactive {boolean}
 * @param filter_item_name {string}
 * @param filter_min_date {integer}
 * @param filter_max_date {integer}
 * @param bare {boolean}
 */
UserService.prototype.getInventory = function(user_id, inactive, filter_item_name, filter_min_date, filter_max_date, bare) {
    var that = this;
    function buildGetEntitlement(inventoryItem){
        return  function(){
                return that.Services.Item.getVirtualItem(inventoryItem.item_id);
            }
    }

    var data = {
        inactive: inactive,
        filter_item_name: filter_item_name,
        filter_min_date: filter_min_date,
        filter_max_date: filter_max_date
    };

    return this.get(this.restUrlCustom(this.serviceConfig.InventoryUrl, user_id, 'items'), data, this.mergeOptions(arguments, 1, {}))
        .then(function(inventory){
            if(!bare) {
                _.each(inventory, function(inventoryItem){
                    inventoryItem.getItem = buildGetEntitlement(inventoryItem);
                });
                return inventory;
            } else {
                return inventory;
            }
        });
};

/**
 * Update an inventory item's status
 * @param status {string}
 * @param user_inventory_id {integer}
 */
UserService.prototype.updateInventoryItemStatus = function(status, user_inventory_id) {

    var data = {
        status: status,
        user_inventory_id: user_inventory_id
    };

    return this.get(this.restUrlCustom(this.serviceConfig.InventoryUrl, 'status', 'update'), data, this.mergeOptions(arguments, 2, {}))

};



UserService.prototype.getRestObjects = function () {
    return {};
};

/**
 * Adds an item to a users inventory by sku_id
 * @param user_id {int}
 * @param sku_id {string}
 * @param note {string}
 * @param overrides {[string]}
 * @param skip_invoice {Boolean}
 */

UserService.prototype.addIemToInventory = function (user_id, sku_id, note, overrides, skip_invoice) {

    var that = this;

    var options = {
        "sku_id": sku_id,
        "note": note,
        overrides: overrides,
        "skip_invoice": skip_invoice
    };
    return this.postJson(this.restUrlCustom(this.serviceConfig.InventoryUrl, user_id, 'items'), options);
};

UserService.prototype.register = function (data) {
    return this.postJson(this.restUrl(), data);
};


module.exports = UserService;

