var _ = require("lodash")
    , util = require('util')
    , BaseService = require("../BaseService")
    , Q = require('q')
    ;

function NotificationService() {
    BaseService.call(this, {
        serviceUrl: "messaging",
        RestUrl: "messaging",
        name: "Notification"
    });
}

util.inherits(NotificationService, BaseService);


/**
 * @param ids [Integer]
 * @param text String
 * @pram from String
 * Sends a text message to the list of ids. If there is a from number specified, it will send from that number,
 * Otherwise it sends from the number in the admin config text.out_number
 */
NotificationService.prototype.sendText = function (text, ids, from){
    var data = {
        "recipients": ids,
        "text": text
    };

    if(from){
        data.from = from;
    }

    return this.postJson(this.serviceEndpoint('rawsms'), data, this.mergeOptions(arguments, 3, {})).then(function (res) {
        return res;
    },function (err){
        return err;
    });
};

/**
 * Sends a email message to the list of user_ids. Optionally can be an html message
 * @param recipients [integer]  List of user ids to send message to
 * @param  subject String
 * @param body String message content
 * @param html boolean If the message is html encoded defaults to falst
 */

NotificationService.prototype.sendEmail = function (recipients, subject, body, html){
        var data = {
            recipients : recipients,
            subject: subject,
            body: body,
            html: html || false
        };
    return this.postJson(this.serviceEndpoint('rawemail'), data, this.mergeOptions(arguments, 3, {}));
};

module.exports = NotificationService;

