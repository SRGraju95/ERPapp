/**
 * Created by eliot on 6/24/15.
 */

'use strict';
var should = require('should');
var Q = require('q'),
    _ = require('lodash')
    ,OAuthToken = require("../lib/OAuthToken"),
    configSample = require("../config_sample")
    , BaseService = require("../lib/BaseService")
    ;
var jsapi = require('../index');

describe('Rewards Service Tests', function () {
    var jsapiConfig = configSample;

    beforeEach(function (done) {
        jsapi.setConfig(jsapiConfig);
        done();
    });



    it('should get a reward', function(done){
        this.timeout(4000);
        jsapi.auth.userAuth('eliot', '123123')
            .done(function (authToken) {
                var client = jsapi.client(authToken);
                client.Services.should.have.property('Reward');
                var service = client.Services.Reward;


                service.find(2)
                    .done(function(reward){
                        reward.should.have.property('id', 2);
                        done();

                    }, function(err){

                        done(err);
                    })

            }, function (err) {
                done(err);
            })
    })

});
