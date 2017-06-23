/**
 * Created by eliot on 6/24/15.
 */

'use strict';
var should = require('should');
var Q = require('q'),
    OAuthToken = require("../lib/OAuthToken"),
    configSample = require("../config_sample")
    , BaseService = require("../lib/BaseService")
    , ModelTools = require("../lib/ModelTools")
    , _ = require('lodash')
    ;
var jsapi = require('../index');

describe('Cart Service Tests', function () {
    var jsapiConfig = configSample;

    beforeEach(function (done) {
        jsapi.setConfig(jsapiConfig);
        done();
    });

    it('should create a new cart', function(done){
        this.timeout(8000);
        jsapi.auth.userAuth('eliot', '123123')
            .done(function (authToken) {
                var client = jsapi.client(authToken);
                var CartService = client.Services.Cart;
                CartService.schema.should.be.type('function');
                var instanceTypes = CartService.schema().getInstanceTypes('both');
                var CartResponse = instanceTypes.CartGetResponse;

                CartService.should.be.an.instanceof(BaseService);
                CartService.createCart()
                    .done(function(cartResult){
                        cartResult.should.be.type('string')
                        //var guid = cartResult;

                        CartService.getCart(cartResult).done(function(cartOut){
                            cartOut.should.have.property('cart');
                            cartOut.cart.should.have.property('currency','USD');


                            done();



                        }, function(err){

                            done(err);
                        })

                    }, function(err){

                        done(err);
                    });

            }, function (err) {
                err.should.be.empty(' GOT AN ERROR ');
                done(err);
            })
    })


    it('should add an item to new cart', function(done){
        this.timeout(4000);
        jsapi.auth.userAuth('eliot', '123123')
            .done(function (authToken) {
                var client = jsapi.client(authToken);
                var CartService = client.Services.Cart;
                CartService.should.be.an.instanceof(BaseService);
                CartService.createCart()
                    .then(function(cartResult){
                        cartResult.should.be.type('string');

                        CartService.addItem(cartResult, {catalog_sku_id: 8, quantity: 1, catalog_id: 9})
                                .done(function(addResult){

                                    addResult.should.be.type('boolean');
                                    addResult.should.be.true;
                                    done();
                                }, function(err3){
                                    //console.log("ADD ITEM ERR", _.keys(err3));
                                    var msg = JSON.stringify(_.omit(err3, 'response'));
                                    var err = new Error("JSAPI FAILURE " + msg );

                                    done(err);
                                })



                    }, function(err5){
                        (err5).should.be.equal(null);
                        done(err5);
                    });

            }, function (err) {
                err.should.be.empty(' GOT AN ERROR ');
                done(err);
            })
    })


    it('should add create and add item', function(done){
        this.timeout(4000);
        jsapi.auth.userAuth('eliot2', '123123')
            .done(function (authToken) {
                var client = jsapi.client(authToken);
                var CartService = client.Services.Cart;
                CartService.createAndAddItem({catalog_sku_id: 8, quantity: 1, catalog_id: 9}).done(function(result){
                        result.should.be.type('object');

                    done();

                }, function(err){
                    done(err);
                })


            }, function (err) {
                err.should.be.empty(' GOT AN ERROR ');
                done(err);
            })
    })


    it('should checkout a cart', function(done){
        this.timeout(4000);
        jsapi.auth.userAuth('eliot2', '123123')
            .done(function (authToken) {
                var client = jsapi.client(authToken);
                var CartService = client.Services.Cart;

                CartService.createAndAddItem({catalog_sku_id: 8, quantity: 1, catalog_id: 9})
                    .done(function(cart){
                        var guid = cart.guid;
                        client.Services.Invoice.getInvoice(cart.guid)
                            .done(function(result){
                                result.should.be.type('object');
                                result.should.have.property('invoices');
                                done();

                            }, function(err){
                                //console.log(err);
                                done(new Error(err.message));
                            })
                    })

            }, function (err) {
                err.should.be.empty(' GOT AN ERROR ');
                done(err);
            })
    })

    it('should create a cart for a user', function(done){
        this.timeout(4000);
        var user_id = 155;
        jsapi.auth.serverAuth()
            .done(function (authToken) {
                var client = jsapi.client(authToken);
                var CartService = client.Services.Cart;

                CartService.createAndAddItem({catalog_sku_id: 8, quantity: 1, catalog_id: 9},user_id)
                    .done(function(cart){

                        var guid = cart.guid;
                        cart.should.be.type('object');
                        cart.should.have.property('cart');
                        cart.cart.should.be.type('object');
                        cart.cart.should.have.property('owner_id', user_id);
                        done();


                    }, function(err){
                        done(err);
                    })

            }, function (err) {
                err.should.be.empty(' GOT AN ERROR ');
                done(err);
            })


    })
    //it('should get a new cart', function(done){
    //    this.timeout(5000);
    //    jsapi.auth.userAuth('eliot', '123123')
    //        .then(function (authToken) {
    //            var client = jsapi.client(authToken);
    //            var CartService = client.Services.Cart;
    //            var instanceTypes = CartService.schema().getInstanceTypes('both');
    //            var CartResponse = instanceTypes.CartGetResponse;
    //            CartService.createCart()
    //                .then(function(cartResult){
    //                    setTimeout(function(){
    //                    var guid = cartResult.guid();
    //
    //                    CartService.getCart(guid).done(function(cartOut){
    //                        cartOut.should.have.property('cart');
    //                        cartOut.cart.should.have.property('currency','USD');
    //                        done();
    //                    }, function(err){
    //                        (err).should.be.equal(null);
    //                        done(err);
    //                    })
    //
    //                    }, 200);
    //
    //                }, function(err){
    //                    (err).should.be.equal(null);
    //                    done(err);
    //                });
    //
    //
    //        }, function (err) {
    //            err.should.be.empty(' GOT AN ERROR ');
    //            done(err);
    //        })
    //})

});
