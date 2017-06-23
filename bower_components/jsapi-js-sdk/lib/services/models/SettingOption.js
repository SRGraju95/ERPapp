/**
 * Created by eliot on 6/23/15.
 */

var  Tools = require("../../Tools");
/**
 * Used by activities, represents one option item in a settings options array
 * @param data
 * @constructor
 */
function SettingOption(data){
    this.name = data.name;

    this.value = null;
    try {
        this.value = JSON.parse(data.value);
    } catch(err){
        this.value = data.value;
    }
}

SettingOption.prototype.toObject = function(){
    return {
        name: this.name,
        value: JSON.stringify(this.value)
    };
};


module.exports = SettingOption;