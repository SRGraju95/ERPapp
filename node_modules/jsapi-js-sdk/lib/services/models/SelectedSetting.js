/**
 * Created by eliot on 6/23/15.
 */

var Tools = require("../../Tools");
/**
 * Used by activity Instances, represents one option item in a settings options array
 * @param data
 * @constructor
 */
function SelectedSetting(data){
    this.key_name = data.key_name;
    this.key = data.key;
    this.value = data.value;
    this.value_name = data.value_name;
}

/**
 * Convert the value to a jsonified string for delivery to JSAPI
 * @returns {{key_name: *, value, key: *, value_name: *}}
 */
SelectedSetting.prototype.toObject = function(){
    return {
        key_name: this.key_name,
        value: JSON.stringify(this.value),
        key: this.key,
        value_name: this.value_name
    };
};


SelectedSetting.fromOption = function(setting, option){
    return new SelectedSetting({key : setting.key, key_name: setting.name, value: option.value, value_name: option.name});
};

module.exports = SelectedSetting;