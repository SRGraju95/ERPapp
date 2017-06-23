/**
 * Created by eliot on 8/21/15.
 */
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
var jsapi = require('../index');

describe('Trivia Service Tests', function () {
    var jsapiConfig = configSample;
    var serverClient;

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

    it('should load trivia questions', function(done){
            var ids = [
                "5592a783e4b00b57fc5e510e",
                "5592a783e4b00b57fc5e511c",
                "5592a783e4b00b57fc5e511d",
                "5592a783e4b00b57fc5e511e",
                "5592a783e4b00b57fc5e5137",
                "5592a783e4b00b57fc5e513e",
                "5592a783e4b00b57fc5e514d",
                "5592a783e4b00b57fc5e5151",
                "5592a783e4b00b57fc5e516a",
                "5592a783e4b00b57fc5e5186",
                "5592a783e4b00b57fc5e51a5",
                "5592a783e4b00b57fc5e51c3",
                "5592a783e4b00b57fc5e51cd",
                "5592a783e4b00b57fc5e51d3",
                "5592a783e4b00b57fc5e51d5",
                "5592a783e4b00b57fc5e51dc",
                "5592a783e4b00b57fc5e51eb",
                "5592a783e4b00b57fc5e520a",
                "5592a783e4b00b57fc5e5250",
                "5592a783e4b00b57fc5e52af"
            ];

        var TriviaService = serverClient.Services.Trivia;
        TriviaService.getQuestions(ids)
            .done(function(questions){

                questions.should.have.length(20);
                var q1 = questions[0];
                function getRandomAnswers(question){
                    var wrongs = _.sample(_.filter(question.answers, {correct: false}), 3);
                    var corrects = _.sample(_.filter(question.answers, {correct: true}), 1);
                    var combined = _.shuffle(_.union(wrongs, corrects));
                    return combined;
                }
                var WrongAnswers = _.sample(_.filter(q1.answers, {correct: false}), 3);
                var corrects = _.sample(_.filter(q1.answers, {correct: true}), 1);


                WrongAnswers.should.have.length(3);
                corrects.should.have.length(1);
                var combined = _.shuffle(_.union(WrongAnswers, corrects));
                combined.should.have.length(4);
                _.find(combined, {correct: true}).should.not.be.empty();
                done();

            }, function(err){
                done(err);
            })
    })

})