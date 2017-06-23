/**
 * Created by eliot on 6/19/15.
 * Trivia Service Functions
 * Extends JSAPI with Trivia Related Functionality and calls to JSAPI
 */



var _ = require('lodash'),
    util = require('util')
    , BaseService = require("../BaseService")
    , Q = require('q')

    ;
function TriviaService() {
    var self = this;
    BaseService.call(this, {
        serviceUrl: "trivia",
        RestUrl: "trivia",
        name: "Trivia"
    });

}

util.inherits(TriviaService, BaseService);

TriviaService.prototype.getQuestions = function (ids, requestOptions) {
    var options = {query: {}};
    if (ids) {
        options = {query: {'filter_idset': ids.join(",")}};
    }
    _.extend(options.query, requestOptions);
    return this.get(this.restUrlNested("questions"), options);
};

TriviaService.prototype.getQuestion = function (questionId) {
    if (!questionId) {
        throw new Error("QuestionId must be a string");
    }
    return this.get(this.restUrlNested("questions", questionId));
};

TriviaService.prototype.getQuestionsDelta = function (since) {
    var queryObj = {};
    since = Math.max(1, since || 1);
    queryObj.since = since;
    var options = {query: queryObj};
    return this.get(this.restUrlNested("questions", "delta"), options);
};

TriviaService.prototype.getCategories = function (allowInactive) {
    allowInactive = allowInactive || false;
    var options = {query: {'filter_active': !allowInactive}};
    return this.get(this.restUrlNested("categories"), options);
};


TriviaService.prototype.getRestObjects = function () {

    return {};
};


module.exports = TriviaService;
