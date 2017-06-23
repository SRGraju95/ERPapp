/**
 * Created by eliot on 6/19/15.
 */
var _ = require("lodash");

/**
 * Storage for an OAuthToken Object
 * @param token {Object|String} Either a full object for the token, or just the access_token string value
 * @constructor
 */
function OAuthToken(token) {
    this.access_token = false;
    this.token_type = "bearer";
    this.scope = "read write";
    this.expires_in = 99999;

    if (_.isString(token)) {
        token = {'access_token': token};
    }
    _.extend(this, token);

    //Calculates the time at which the token will expire, for getting a new one.
    this.expires_at = (new Date().getTime()) + (this.expires_in*1000);

    this.token = function () {
        return this.access_token;
    };

}

module.exports = OAuthToken;