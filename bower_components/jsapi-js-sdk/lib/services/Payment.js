/**
 * Created By Jonathan Go 11/18/2015
 * Wallet Service Functions
 * Extends JSAPI with PaymentService Functionality and calls to JSAPI
 */
var _ = require("lodash")
    , util = require('util')
    , BaseService = require("../BaseService")
    , Q = require('q')
    ;

function PaymentService() {
    var self = this;
    BaseService.call(this, {
        serviceUrl: "payment",
        RestUrl: "payment",
        name: "Payment"
    });
}

util.inherits(PaymentService, BaseService);


/**
 *
 * @returns {{}}
 */
PaymentService.prototype.refunds = function (transactionId, notes, itemId, amount) {
    return this.postJson(this.serviceEndpoint('refunds'), {
        transactionId: transactionId,
        notes: notes,
        itemId: itemId,
        amount: amount
    });
};


module.exports = PaymentService;

