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
    , ModelTools = require("../lib/ModelTools")
    ;
var jsapi = require('../index');

describe('Item Service Tests', function () {
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
                client.Services.Item.list().done(function(results){
                    results.should.have.property('catalog');
                    var items = results.catalog;
                    (_.isArray(items)).should.be.true;
                    done();

                }, function(err){

                    done(err);
                });

            }, function (err) {
                err.should.be.empty(' GOT AN ERROR ');
                done(err);
            })
    })

});
