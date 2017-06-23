'use strict';

var should = require('should');
var Q = require('q'),
    OAuthToken = require("../lib/OAuthToken"),
    configSample = require("../config_sample"),
    _ = require('lodash'),
    jsapi = require('../index')
    ;

describe('Notification Service Tests', function () {
    var jsapiConfig = configSample;
    var serverClient;

    beforeEach(function (done) {
        jsapi.setConfig(jsapiConfig);
        jsapi.auth.serverAuth()
            .done(function (authToken) {
                serverClient = jsapi.client(authToken);
                done();
            }, function(err){
                done(err);
            });
    });

    it('It should send a text message', function(done){
        var text = "Hello World!",
            //The userId(s) with a registered phone number in jsapi and the twilio account
            ids = [process.env.TEST_USERID],
            //If text.out_number is set, No need to set the configuration. Otherwise, set it to the from number associated to the twilio account.
            from = process.env.TWILIO_NUMBER || undefined;
        serverClient.Services.Notification.sendText(text, ids, from).done(function (res){
            res.should.be.equal('');
            done();
        },function (err){
            should.fail();
            done();
        });
    });
});