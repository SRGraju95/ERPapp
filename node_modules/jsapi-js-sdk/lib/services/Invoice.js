/**
 * Created by eliot on 6/19/15.
 * Invoice Service extends JSAPI functionality
 */


var _ = require('lodash'),
    util = require('util')
    , BaseService = require("../BaseService")
    , Q = require('q')

    ;
function InvoiceService() {
    var self = this;
    BaseService.call(this, {
        serviceUrl: "invoice",
        RestUrl: "invoice",
        name: "Invoice"
    });

}

util.inherits(InvoiceService, BaseService);


InvoiceService.prototype.getInvoice = function (id) {
    var options = {query: {cartGUID: null}};
    if (id){
        options.query.cartGUID = id;
    }
    return this.get(this.serviceEndpoint() + "/",options);
};
InvoiceService.prototype.getInvoiceNew = function (id) {
    return this.postJson(this.serviceEndpoint() + "s/",{cartGUID: id});
};
InvoiceService.prototype.getInvoiceById = function (id) {
    return this.get(this.serviceEndpoint() + "s/" + id);
};

InvoiceService.prototype.getInvoiceLog = function (id){
    return this.get(this.serviceEndpoint() + "/"+id+"/logs");
};

/**
 * Polls jsapi until the fulfillment is done, after ttl ms it will abandon all hope
 * @param id invoice_id
 * @param ttl {Number} time to try in MS
 * @returns {promise}
 */
InvoiceService.prototype.waitUntilFulfilled = function (id, ttl) {
    var defer = Q.defer();
    var options = {query: {invoiceId: id}};
    ttl = ttl || 10*1000;
    var checker ;
    var url = this.serviceEndpoint() + "/";
    var that = this;
    var checks = 0;
    function checkInvoice(){
        that.get(url,options)
            .then(function(invoiceResult){
                if (invoiceResult.invoices && invoiceResult.invoices.length >= 1){
                    var theInvoice = invoiceResult.invoices[0];
                    if (theInvoice.current_fulfillment_status_name === 'fullfilled'){
                        defer.resolve(theInvoice);
                    }
                    else if (checks >= 5){
                        defer.reject(new Error("TIMEOUT WAITING FOR INVOICE"));
                    }
                   else {
                        checks++;
                       checker = setTimeout(checkInvoice, 900);
                    }
                }
                else {
                   defer.reject(new Error("Invoice not found"));
                }
            }, function(err){
                defer.reject(err);
            })
    }

    checkInvoice();



    return defer.promise;
};

InvoiceService.prototype.setPaymentStatusNew = function (id, status, paymethodId) {
    paymethodId = paymethodId || 2;

    return this.putJson(this.serviceEndpoint() + 's/' + id + '/payment-status', {paymentMethodId: paymethodId, status: status});
};

InvoiceService.prototype.setPaymentStatus = function (id, status) {
    return this.postJson(this.serviceEndpoint("setpaymentstatus"), {invoiceId: id, status: status});
};
InvoiceService.prototype.setStatus = function (id, status) {
    return this.postJson(this.serviceEndpoint("setstatus"), {invoiceId: id, status: status});
};

InvoiceService.prototype.setFulfillmentStatus = function (invoice, item, status) {
    return this.putJson(this.serviceEndpoint() + 's/' + invoice + '/items/' + item + '/fulfillment-status', JSON.parse(status));
};

InvoiceService.prototype.updateBillingInfo = function (id, info) {
    return this.postJson(this.serviceEndpoint("updatebillinginfo"), _.extend({}, {invoice_id: id}, info));
};

module.exports = InvoiceService;
