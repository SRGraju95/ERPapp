/**
 * Created by eliot on 6/22/15.
 */

var cfg =
{
    "url": process.env.JSAPI_URL || "http://localhost:8080",
    "clientId": process.env.JSAPI_CLIENT ||  "test",
    "clientSecret": process.env.JSAPI_SECRET ||  "test"
};

module.exports = cfg;