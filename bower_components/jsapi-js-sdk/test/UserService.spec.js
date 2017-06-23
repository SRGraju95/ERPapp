/**
 * Created by eliot on 7/22/15.
 */


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

describe('User Service Tests', function () {
    var jsapiConfig = configSample;
    var serverClient, sampleUser = {username: 'eliot', password: '123123', id: 155} ;

    function getUserClient(user, password){
       return jsapi.auth.userAuth(user, password )
            .then(function (authToken) {
                return jsapi.client(authToken);
            });
    }
    function getToken(user){
        user = user || sampleUser;
        return jsapi.auth.userAuth(user.username, user.password)
            .then(function (authToken) {
              return authToken.token();
            });
    }
    beforeEach(function (done) {
        jsapi.setConfig(jsapiConfig);
        jsapi.auth.serverAuth()
            .done(function (authToken) {
                serverClient = jsapi.client(authToken);
                done();
            }, function(err){
                done(err);
            })
    });


    it('should get user info by passing token in options', function(done){
        getToken()
            .done(function(token){
                token.should.not.equal('136e0899-f317-4831-80a9-d8a9d1f9c709');
                (serverClient.Services.User.mergeOptions([{accessToken: token}], 0, {})).should.have.property('accessToken', token);
                serverClient.Services.User.getInfo({accessToken: token})
                    .done(function(userInfo){
                        userInfo.should.have.property('username', sampleUser.username);
                        done();

                    }, function(err){
                        console.log(_.omit(err, ['response']));
                        done(err.data);
                    })



            }, function(err){
                done(err);
            })
    })


    it('should charge the users wallet on the Users Service', function(done){
        var charges = [{delta: 10, currencyName: 'USD', msg: 'TEST TRANSACTION'},{delta: 10, currencyName: 'BONUS', msg: 'TEST TRANSACTION'}];

        serverClient.Services.User.getWallet(sampleUser.id)
            .done(function(wallet){
                var currentUSD = wallet.USD.balance;
                var currentBONUS = _.has(wallet, 'BONUS') ? wallet.BONUS.balance : 0;
                serverClient.Services.User.adjustWallet(sampleUser.id, charges)
                    .done(function(result){
                        result.should.have.property('user_id', sampleUser.id);
                        result.should.have.property('charges');
                        result.should.have.property('ok', true);
                        result.charges.should.have.length(2);
                        result.charges[0].should.have.property('outcome');
                        result.charges[0].should.have.property('ok', true);
                        result.charges[0].should.have.property('currencyName', 'USD');
                        result.charges[1].should.have.property('currencyName', 'BONUS');
                        result.charges[1].should.have.property('ok', true);
                        serverClient.Services.User.getWallet(sampleUser.id)
                            .done(function(newWallet){
                                newWallet.USD.balance.should.eql(currentUSD + charges[0].delta);
                                newWallet.BONUS.balance.should.eql(currentBONUS + charges[1].delta);
                                done();
                            }, function(err){
                                done(err);
                            })
                    }, function(err){
                        done(err);
                    })
            }, function(err){
                done(err);
            })
    })

    it('should get users inventory', function(done){
        serverClient.Services.User.getInventory(3268)
            .done(function(inventory){
                inventory.should.be.instanceof(Array);
                var theItem = _.find(inventory, function(item){
                    return item.item_id = 4918;
                });

                theItem.should.not.be.null();
                theItem.should.have.property('item_id', 4918);
                inventory[0].should.have.property('getItem');

                inventory[0].getItem.should.be.type('function');
                inventory[0].getItem().done(function(item){
                    item.should.have.property('typeHint','virtual_item');
                    done();
                }, function(err){
                    done(err);
                })

            } , function(err){
                done(err);
            })


    })
    it('should get user rest object', function(done){
        serverClient.Services.User.getUser(3268)
            .done(function(user){
                user.should.have.property('address');
                done();

            }, function(err){

                done(err);
            })

    })


})