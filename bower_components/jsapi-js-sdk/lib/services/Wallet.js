/**
 * Created By Jonathan Go 11/18/2015
 * Wallet Service Functions
 * Extends JSAPI with Wallet Functionality and calls to JSAPI
 */
var _ = require("lodash")
    , util = require('util')
    , BaseService = require("../BaseService")
    , Q = require('q')
    ;

function WalletService() {
    var self = this;
    BaseService.call(this, {
        serviceUrl: "wallets",
        RestUrl: "wallets",
        name: "Wallet",
    });
}

util.inherits(WalletService, BaseService);


/**
 *
 * @returns {{}}
 */
WalletService.prototype.getWalletTotals = function () {
    var options = this.mergeOptions(arguments, 0, {});
    return this.get(this.serviceEndpoint('totals'), options).then(function (totals) {
        return totals;
    });
};

WalletService.prototype.getRestObjects = function () {
    return {};
};

WalletService.prototype.getTransactions = function (size, page, invoiceId, type) {
    var options = this.mergeOptions(arguments, 0, {
        size: size,
        page: page,
        filter_invoice: invoiceId
    });

    if (type) {
        options.filter_type = type;
    }

    return this.get(this.serviceEndpoint('transactions'), {query: options});
};


module.exports = WalletService;

