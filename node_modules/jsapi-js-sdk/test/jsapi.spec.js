/**
 * Created by eliot on 6/19/15.
 */


'use strict';
var should = require('should');
var Q = require('q'),
    OAuthToken = require("../lib/OAuthToken"),
    configSample = require("../config_sample"),
    _ = require('lodash')
    ;
var jsapi = require('../index'),
    JsapiCache = require("../lib/JsapiCache");

describe('JSAPI Base Test suite', function () {
    var jsapiConfig = configSample;

    beforeEach(function (done) {
        jsapi.setConfig(jsapiConfig);
        done();
    });

    it('Should Set Configurations', function () {

        jsapi.setConfig(jsapiConfig).should.be.an.instanceOf(jsapi.constructor);
        jsapi.should.have.property('auth');
        jsapi.auth.serverAuth.should.be.type('function');
        jsapi.auth.userAuth.should.be.type('function');

    });

    it('Should get Server AuthToken', function (done) {
        this.timeout(3000);

        jsapi.auth.serverAuth()
            .done(function (authToken) {
                authToken.should.be.an.instanceOf(OAuthToken);
                authToken.token().should.be.type('string');
                done();
            }, function (err) {
                err.should.be.empty(' GOT AN ERROR ');
                done();
            })
    });

    it('Should get User AuthToken', function (done) {
        this.timeout(3000);

        jsapi.auth.userAuth('eliot', '123123')
            .done(function (authToken) {
                authToken.should.be.an.instanceOf(OAuthToken);
                authToken.token().should.be.type('string');
                done();
            }, function (err) {
                err.should.be.empty(' GOT AN ERROR ');
                done();
            })
    });


    it('Should get an Authenticated Client', function (done) {
        this.timeout(4000);

        jsapi.auth.userAuth('eliot', '123123')
            .done(function (authToken) {

                var client = jsapi.client(authToken);
                client.baseURL.should.equal(configSample.url + "/rest/services/latest/");
                client.defaults.should.have.property('accessToken');
                client.defaults.accessToken.should.equal(authToken.token());
                client.Services.should.have.property('User');

                client.Services.User.getInfo()
                    .done(function (userInfo) {
                        var myInfo = userInfo;
                        userInfo.should.have.property('username');
                        userInfo.username.should.equal('eliot');
                        done();

                    }, function (err) {
                        console.log("SHOULD NOT GET HERE", err);
                        done();
                    });

            }, function (err) {
                err.should.be.empty(' GOT AN ERROR ');
                done(err);
            })
    });

    it('Should change the token for an Authenticated Client', function (done) {
        this.timeout(4000);
        var users = [{username: 'eliot', password: '123123'}, {username: 'eliot2', password: '123123'}];
        Q.allSettled([jsapi.auth.userAuth(users[0].username, users[0].password), jsapi.auth.userAuth(users[1].username, users[1].password)])
            .done(function (results) {

                for (var i = 0; i < results.length; i++) {
                    users[i].token = results[i].value;
                }
                users[0].token.should.be.type('object');
                var authToken = users[0].token;
                var authToken2 = users[1].token;

                var client = jsapi.client(authToken);
                client.defaults.accessToken.should.equal(authToken.token());
                client.Services.User.getInfo()
                    .done(function (userInfo) {
                        var myInfo = userInfo;
                        userInfo.should.have.property('username');
                        userInfo.username.should.equal('eliot');
                        client.changeToken(authToken2);
                        client.defaults.accessToken.should.equal(authToken2.token());
                        client.Services.User.getInfo()
                            .done(function (userInfo2) {
                                userInfo2.should.have.property('username');
                                userInfo2.username.should.equal('eliot2');
                                done();
                            }, function (err2) {
                                console.log(" SHOULD NOT GET HERE ");
                                "no".should.equal("NOT HERE CANT BE");
                                done();
                            })


                    }, function (err) {
                        console.log("SHOULD NOT GET HERE", err);
                        done();
                    });

            })
    });

    it('Should List Users', function (done) {
       this.timeout(4000);

        jsapi.auth.serverAuth()
            .done(function (authToken) {
                var client = jsapi.client(authToken);
                client.defaults.should.have.property('accessToken');
                client.defaults.accessToken.should.equal(authToken.token());
                client.Services.should.have.property('User');
                client.Services.User.list()
                    .done(function (usersList) {
                        //usersList.should.not.be.empty();
                        usersList.should.have.property('getMeta');
                        var meta = usersList.getMeta();
                        meta.should.have.property('totalElements');
                        meta.should.have.property('first');
                        meta.first.should.equal(true);
                        var firstResult = usersList[0];
                        firstResult.should.have.property('id');
                        firstResult.should.have.property('avatarUrl');
                        firstResult.should.have.property('displayname');

                        done()
                    }, function (err) {
                        console.log("SHOULD NOT GET HERE");
                        err.should.be.empty(' GOT AN ERROR Listing Users ');
                        done();

                    })


            }, function (err) {
                err.should.be.empty(' GOT AN ERROR ');
                done();
            })
    });

    it('Should get configs', function(done){
        jsapi.auth.serverAuth()
            .done(function (authToken) {
               var client = jsapi.client(authToken);
                client.Services.Config.find('trivia_engine_configs')
                    .done(function(configs){
                        configs.pass_count.should.equal(2);
                        done();
                    }, function(err){
                        (5).should.be.empty("SHOULDN't get here");
                        done();


                    })
            }, function (err) {
                err.should.be.empty(' GOT AN ERROR ');
                done();
            })


    });
    it('Should handle error properly', function(done){
        jsapi.auth.serverAuth()
            .done(function (authToken) {
                var client = jsapi.client(authToken);
                client.Services.Config.find('trivia_engine_config')
                    .done(function(configs){
                        (configs).should.be.empty("SHOULDN't get here");
                        done(new Error('NOPE'));
                    }, function(err){
                        ({}).should.be.type('object');
                        done();
                    })
            }, function (err) {
                err.should.be.empty(' GOT AN ERROR ');
                done();
            })



    })

    it('Should maintain token defaults', function(done){
       var client1 = jsapi.client('client1');
        //client1.defaults.accessToken.should.equal('client1');
        var client2 = jsapi.client('client2');
        (client2._token.token()).should.equal('client2', 'CLIENT 2 should be set');
        (client1._token.token()).should.equal('client1','CLIENT 1 should be MAINTAINED');

        done();
    })

    it('Should get a users wallets', function (done) {
        jsapi.auth.userAuth('eliot', '123123')
            .done(function (authToken) {

                var client = jsapi.client(authToken);



                        client.Services.User.getWallet()
                            .done(function(wallets){
                                wallets.should.be.type('object');
                                wallets.should.have.property('USD');
                                wallets.should.have.property('getUser');
                                wallets.getUser.should.be.a.Function;
                                (wallets.getUser()).should.have.property('username','eliot');
                                (wallets.getUser()).should.not.have.property('wallet');
                                done();
                            }, function(err){
                                console.log(err);
                                done(new Error('Epic Fail'));
                            })
                });

    })

    it('Should get a users wallets for admin', function (done) {
        var user_id = 155;
        jsapi.auth.serverAuth()
            .done(function (authToken) {
                var client = jsapi.client(authToken);

                client.Services.User.getWallet(user_id)
                    .done(function(wallets){
                        wallets.should.be.type('object');
                        wallets.should.have.property('USD');
                        done();
                    }, function(err){

                        done(err);

                    })
            }, function(err){

                done(err);
            })

    })

    it('should Log the request', function(done){
        var logConfig = {
                "name": "JsapiLogger",
                "streams":
                    [ {
                            level: 'debug',
                            stream: process.stdout
                        }
                    ]
            };
        jsapi.auth.serverAuth()
            .done(function (authToken) {
                var client = jsapi.client(authToken);
                jsapi.setLogger(logConfig);
                jsapi.enableDebugging(true);

                client.Services.Activity.list({})
                    .done(function(activitys){
                        activitys.should.be.type('object');
                        done();

                    }, function(err){
                        done(err);
                    })
            }, function (err) {
                err.should.be.empty(' GOT AN ERROR ');
                done();
            })



    })

    it('Should get user info by user_id', function(done){
        this.timeout(7000);
        var user_id = 155;
        jsapi.auth.serverAuth()
            .done(function (authToken) {
             var client = jsapi.client(authToken);
                var UserService = client.Services.User ;
                UserService.getUserInfo(user_id,{accessToken: authToken.token()})
                    .done(function(userInfo){
                        userInfo.should.have.property('id', user_id);
                        userInfo.should.have.property('wallet');
                        userInfo.wallet.should.be.type('object');
                        userInfo.wallet.should.have.property('USD');
                        UserService.getWallet(user_id)
                            .done(function(wallet){
                                wallet.should.be.type('object');
                                wallet.should.have.property('USD');
                                wallet.USD.balance.should.be.equal(userInfo.wallet.USD.balance);

                                done();

                            }, function(err){

                                done(new Error('Get wallets error') );
                            })

                    }, function(err){



                        done(err);
                    })
            }, function(err){
                done(err);
            })


    })
});