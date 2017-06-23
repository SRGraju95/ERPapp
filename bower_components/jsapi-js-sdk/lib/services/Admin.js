
var _ = require('lodash'),
    util = require('util'),
    BaseService = require("../BaseService")
    ;

function AdminService() {
    var self = this;
    BaseService.call(this, {
        serviceUrl: "admin",
        RestUrl: "admin",
        name: "Admin"
    });
}

util.inherits(AdminService, BaseService);

/**
 * Create a wallet transaction.  Only works with admin token credentials
 * @param user_id {Number} Users Id
 * @param delta {Number} Wallet Change Amount
 * @param currencyName {String} Name of the currency like "USD" or "BONUS"
 * @param msg {String} Message to include in the transaction
 * @param [invoiceId] {Number} Invoice to associate the transaction with
 * @return {Promise} Resolved with mapped output see below
 */

AdminService.prototype.walletTransaction = function (user_id, delta, currencyName, msg, invoiceId) {
    var data = {userId: user_id, delta: delta, currencyType: currencyName, reason: msg, invoiceId: invoiceId};

    return this.postJson(this.serviceEndpoint("walletchange"), data, this.mergeOptions(arguments, 4, {}))
        .then(function (transactionResult) {
        return {
            user_id: user_id,
            currency: currencyName,
            amount: delta,
            outcome: transactionResult,
            balance: transactionResult.balance
        };
    }, function (err) {
        return {error: err, currency: currencyName, amount: delta, user_id: user_id};
    });
};

module.exports = AdminService;