/**
 * Created by eliot on 6/23/15.
 */
'use strict';
var should = require('should');
var Q = require('q'),
    Models = require("../lib/Models"),
    _ = require('lodash')
    ;


describe('Activity Model Test suite', function () {
   var fixture ;
    beforeEach(function(done){
        fixture = require("./fixtures/ActivityFixture");
        done();
    });

    it('should create a new Setting Option', function(){
        var option = {name: 'five', value: "5"};
        var a = new Models.SettingOption(option);
        a.should.have.property('name');
        a.should.have.property('value');
        a.value.should.equal(5);
        (a.toObject()).value.should.equal(option.value);
        var value2 = {age: 13, weight: 99.99};
        var strVal = JSON.stringify(value2);
        var option = {name: 'five', value: strVal};
        var a = new Models.SettingOption(option);
        should.deepEqual(a.value, value2);
        (a.toObject()).value.should.equal(strVal);

    });

    it('should create a new AvailableSetting', function(){
        var settingData = fixture.settings[0];
        var a = new Models.AvailableSetting(settingData);
        a.should.have.property('key','wager');
        (a.getDefault()).should.be.instanceof(Models.SettingOption);
        (a.getDefault()).value.should.equal(2);

        var settingData2 = _.extend({}, settingData);
        settingData2.default_value = null;
        settingData2.options.shift();
        var a2 = new Models.AvailableSetting(settingData2);

        (a2.getDefault()).should.be.instanceof(Models.SettingOption);
        (a2.getDefault()).value.should.equal(5);


    });
    it('Should map a list of available settings', function(){
        var data = {
            "bonus_currency_consumption": 5,
            "bonus_currency_award": 5,
            "matchmakingTtlMessage": "Unable to find you a match, please try again.",
            "matchmakingTtl": 10000,
            "service_fee": 0.1,
            "players_max": 2,
            "players_min": 2,
            "matchmakingTime": 30000,
            "lobbyReadyUp": 30000,
            "rematchReserveTtl": 30000,
            "reserveTtl": 2000,
            "qGracePeriod": 10000,
            "qBeforeNext": 3000,
            "qAnswer": 10000,
            "qRead": 4000,
            "pass_count": 2,
            "pass_available": 2000,
            "pass_bonus": 0,
            "pass_base": 250,
            "incorrect_base": -250,
            "correct_bonus": 300,
            "correct_base": 1000
        };


    });


   it('should create a new Activity', function(){
       var a = new Models.Activity(fixture);
       a.should.have.property('name');
       a.should.have.property('settings');
       a.settings.should.have.property('wager');

   })

});