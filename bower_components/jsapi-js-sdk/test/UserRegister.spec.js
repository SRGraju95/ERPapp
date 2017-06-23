'use strict';
var should = require('should');
var Q = require('q'),
    OAuthToken = require("../lib/OAuthToken"),
    configSample = require("../config_sample")
    ;
var jsapi = require('../index');

describe('JSAPI Base Test suite', function () {
    var jsapiConfig = configSample;
    var date = new Date();
    var username = "sdkTestUser_" + date.getTime();

    beforeEach(function (done) {
        jsapi.setConfig(jsapiConfig);
        done();
    });

    it('Should register a new user', function(done){
        this.timeout(4000);
        jsapi.auth.register(username, '123123', username + '@email.com')
            .done(function (response) {
                response.should.have.property('fullname');
                response.fullname.should.equal(username);
                done();
            }, function (err) {
                err.should.be.empty(' GOT AN ERROR ')
                done();
            })
    });

    it('Should fail to register because of existing user', function(done){
        this.timeout(4000);
        jsapi.auth.register(username, '123123', username + '@email.com')
            .done(function (response) {
                response.should.be.empty(' GOT AN ERROR ');
                done();
            }, function (err) {
                err.should.have.property('message');
                err.message.should.equal('The username you selected is already registered.');
                done();
            })

    });

});