/**
 * Created by eliot on 6/22/15.
 */


/**
 * Created by eliot on 6/19/15.
 * Admin Service extends JSAPI functionality
 */
var _ = require("lodash"),
    Tools = require("../../Tools")
    , AvailableSetting = require("./AvailableSetting")
    , SettingOption = require("./SettingOption")
    , SelectedSetting = require("./SelectedSetting")
    ;

function Activity(data) {
    _.extend(this, _.omit(data, ['settings']));
    var self = this;
    this.settings = {};
    if (data.settings) {
        this.parseSettings(data.settings);
    }
}

Activity.prototype.parseSettings = function (settings) {
    var self = this;
    this.settings = {};
    if (_.isArray(settings)) {
        _.each(settings, function (setting) {
            var res = new AvailableSetting(setting);
            self.settings[res.key] = res;
        });
    }
    return self;
};
Activity.prototype.defaultSettings = function () {
    var self = this;
    var out = {};
    _.each(self.settings, function (settingObj, settingName) {
        out[settingName] = settingObj.toSelected();
    });
    return out;
};
Activity.prototype.extractSettings = function (settings) {
    var self = this;
    var out = [];

    _.each(self.settings, function (settingObj, settingName) {
        var selValue = settings.hasOwnProperty(settingName) ? settings[settingName] : undefined;
        out.push(settingObj.toSelected(selValue));
    });

    return out;
};
Activity.prototype.toObject = function () {
    var out = _.extend({}, this);
    out.settings = Tools.toObject(this.settings);
    return out;
};
Activity.REST_URL = 'activities';

module.exports = Activity;