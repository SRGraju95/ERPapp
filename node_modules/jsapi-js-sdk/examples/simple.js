/**
 * Created by eliot on 6/19/15.
 */


var jsapi = require('../index')
    , _ = require("lodash")
    , ActivityInstanceModels = require("../lib/services/models/ActivityInstance")
    , ActivityInstance = ActivityInstanceModels.ActivityInstance
    , ActivityInstanceStatus = ActivityInstanceModels.ActivityInstanceStatuses
    ;

var cfg = require("../config_sample");

console.log("SHOWING JSAPI SAMPLE");
jsapi.setConfig(cfg);

var theData = {

    "shortDescription": "Wicked Awesome2",
    "settings": [
        {
            "default_value": "5",
            "name": "wager",
            "key": "wager",
            "options": [
                {
                    "name": "2",
                    "value": "2"
                },
                {
                    "name": "5",
                    "value": "5"
                }
            ]
        }
    ],
    "name": "Wicked Cool2",
    "longDescription": "Coolio2",
    "type": "game"
};

jsapi.auth.serverAuth()
    .done(function (authToken) {
        var client = jsapi.client(authToken);
        client.Services.Config.loadAll()
            .done(function(configs){
                console.log("FOUND " + _.keys(configs).length + " Configs ");
            }, function(err){
                console.log("ERROR LOADING CONFIGS " , err);

            })

    }, function (err) {
        console.log("ERROR GETTING AUTHTOKEN", err);
    });