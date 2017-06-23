
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

describe('Challenge Service Tests', function () {
    var jsapiConfig = configSample;

    beforeEach(function (done) {
        jsapi.setConfig(jsapiConfig);
        done();
    });

    it('should list items', function(done){
        this.timeout(4000);
        jsapi.auth.userAuth('eliot', '123123')
            .done(function (authToken) {
                var client = jsapi.client(authToken);
                client.Services.should.have.property('Challenge');
                var service = client.Services.Challenge;
                service.should.have.property('list');

                service.list()
                    .done(function(challenges){
                        challenges.should.have.property('getMeta');
                        done();

                    }, function(err){
                        done(err);
                    })

            }, function (err) {
                err.should.be.empty(' GOT AN ERROR ');
                done(err);
            })
    })

    it('should get a challenge', function(done){
        this.timeout(4000);
        jsapi.auth.userAuth('eliot', '123123')
            .done(function (authToken) {
                var client = jsapi.client(authToken);

                var service = client.Services.Challenge;


                service.list()
                    .done(function(challenges){
                            if (challenges.length > 0 ){
                             service.find(challenges[0].id)
                                 .done(function(challenge){
                                     challenge.should.be.type('object');
                                     challenge.id.should.equal(challenges[0].id);
                                     done();

                                 }, function(err){
                                     done(err);
                                 })

                            }
                        else {
                        done();
                            }
                    })

            }, function (err) {
                err.should.be.empty(' GOT AN ERROR ');
                done(err);
            })
    })
    it('should get a challenge activity', function(done){
        this.timeout(4000);
        jsapi.auth.userAuth('eliot', '123123')
            .done(function (authToken) {
                var client = jsapi.client(authToken);

                var service = client.Services.Challenge;


                service.getChallengeActivity(57,58)
                    .done(function(challengeActivity){
                       challengeActivity.should.be.type('object');
                        challengeActivity.should.have.property('id', 58);
                        done();
                    }, function(err){
                        done(err);
                    })

            }, function (err) {
                err.should.be.empty(' GOT AN ERROR ');
                done(err);
            })
    })
});
