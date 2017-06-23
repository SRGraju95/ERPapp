/**
 * Created by eliot on 6/23/15.
 */

var SettingOption = require("./SettingOption"),
     _ = require("lodash"),
    Tools = require("../../Tools")
    , SelectedSetting = require("./SelectedSetting")

;

/**
 * Contains Available Options for an Activity Setting
 * @param data {Object}
 * @constructor
 */
function AvailableSetting(data){
    this.key = data.key || "";
    this.name = data.name || "";
    this.default_value = data.default_value || null;
    this.options = [];
    this.parseOptions(data.options);
}
AvailableSetting.prototype.parseOptions = function(options){
    this.options = _.map(options, function(option){
        return new SettingOption(option);
    });
    if (this.options.length === 1 || ( (this.default_value === null || this.default_value === undefined) && this.options.length > 0 ) ) {
        this.default_value = this.options[0].name;
    }
    return this;
};

AvailableSetting.prototype.getValue = function(name){
    var res = _.find(this.options, {'name': name});
    if (!res){
        throw new Error("Option not found " , name);
    }
    else {
        return res.value;
    }
};
AvailableSetting.prototype.getDefault = function(){
    return this.findOption(this.default_value);
};
AvailableSetting.prototype.findOption = function(name){
    var res = _.find(this.options, {'name': name});
    if (!res){
        res = _.find(this.options, {'value': name})
    }
    return res;
};

AvailableSetting.prototype.getOptions = function(deep) {
  if (deep) {
      return this.options;
  }
  else {
      return _.pluck(this.options, 'value');
  }
};

AvailableSetting.prototype.toSelected = function(name, value){
    //name = name || this.default_value;
    var option ;
    if (arguments.length >= 2) {
       option = {name: name, value: value};

    }
    else {
       option = name === undefined ? this.getDefault() : this.findOption(name);
    }
    if (!option) {
        option = this.getDefault();
    }
    return SelectedSetting.fromOption(this, option);
};
AvailableSetting.prototype.toObject = function(){
    var out = _.extend({}, this);
    //out.options = _.map(this.options, function(option){ return option.toObject();});
    out.options = Tools.toObject(this.options);
    return out;
};

AvailableSetting.createListFromObject = function(config){
  return _.map(config, function(value, keyname){
        var data = {
            key: keyname,
            name: keyname,
            options : [
                {
                    name: value.toString(),
                    value: JSON.stringify(value)
                }

                ]
            };
        return new AvailableSetting(data);
    })
    ;

};



module.exports = AvailableSetting;