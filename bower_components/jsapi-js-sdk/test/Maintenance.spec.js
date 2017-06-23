
'use strict';
var should = require('should');
var Q = require('q'),
    _ = require('lodash')
    ,OAuthToken = require("../lib/OAuthToken"),
    configSample = require("../config_sample")
    , BaseService = require("../lib/BaseService")
    , ModelTools = require("../lib/ModelTools")
    ;
var jsapi = require('../index');

describe.only('Maintenance Service', function () {
    var jsapiConfig = configSample;

    beforeEach(function (done) {
        jsapi.setConfig(jsapiConfig);
        done();
    });

    it('should create', function(done){
        this.timeout(4000);
        jsapi.auth.serverAuth()
            .done(function(token){
                var client = jsapi.client(token);
                client.Services.should.have.property('Maintenance');
                client.Services.Maintenance.check()
                    .done(function(result){
                        result.should.have.property('accessLocked',false);
                        result.should.have.property('details');
                        result.details.should.be.type('object');
                        done();
                    }, function(err){
                        done(err);
                    })
            })
    })

    it('should update', function(done){
        this.timeout(4000);
        jsapi.auth.serverAuth()
            .done(function(token){
                var client = jsapi.client(token);
                client.Services.should.have.property('Maintenance');
                client.Services.Maintenance.check()
                    .done(function(result){
                        result.should.have.property('accessLocked',false);
                        result.should.have.property('details');
                        result.details.should.be.type('object');
                        result.details.foo = 13;
                        client.Services.Maintenance.update(result)
                            .done(function(out){
                                done();

                            }, function(err){
                                done(err);
                            })


                    }, function(err){
                        done(err);
                    })
            })
    })

});
