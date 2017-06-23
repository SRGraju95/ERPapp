/**
 * Created by eliot on 6/19/15.
 * Authentication related functions for JSAPI.  Provides getting of auth tokens for server and for User Tokens.
 * Also provides registration functionality
 */
var _ = require('lodash'),
    RequestMiddleware = require('./RequestMiddleware'),
    OAuthToken = require("./OAuthToken")
    ;

module.exports = {
    /**
     * Get a Secure Server Token / Client Credentials Based Grant Token
     * @param options Object  {client_id: 'aasdfa', 'client_secret': 'asfas'} OPTIONAL
     * **/
    serverAuth: function (options) {
        return this.getToken("client_credentials", options);
    },
    /**
     * Get Username password login token
     * @param username String
     * @param password String
     * @returns {Promise} Resolved with the accessToken Object
     */
    userAuth: function (username, password) {
        return this.getToken("password", {username: username, password: password});
    },
    /**
     * Used Internally by userAuth and serverAuth
     * @param grant_type String "password" or "client_credentials"
     * @param data Object Data may include username, password, client_id, client_secret
     * @returns {Promise}
     */
    getToken: function (grant_type, data) {
        data = data || {};
        var tokenRequestData = this.getTokenRequestData(grant_type, data);
        return RequestMiddleware.deferredRequest.call(this, this.post(this.grantPath(), {
            data: tokenRequestData
        }), {grant: grant_type, user: data.username || null} ).then(function (accessToken) {
            return new OAuthToken(accessToken);
        });
    },

    /**
     * Register a new User Account
     * @param username {String} Required unique username
     * @param password {String} Password (plaintext)
     * @param email {String} User Email address
     * @param details {Object} Optional Override/Provide any additional user properties such as fullname, first_name, last_name, etc
     */
    register: function (username, password, email, details) {
        details = details || {};
        var data = _.extend({},
            {
                username: username,
                password: password,
                email: email,
                fullname: username,
                first_name: username,
                display_name: username
            },
            details);
        return RequestMiddleware.deferredRequest(
            this.postJson(this.basePath() + "users", data)
        );
    }
};
