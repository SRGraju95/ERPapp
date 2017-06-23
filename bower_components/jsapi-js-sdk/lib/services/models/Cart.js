/**
 * Created by eliot on 6/25/15.
 */

var _ = require('lodash'),
    util = require('util'),
    ModelTools = require("../../ModelTools")

    ;
var SchemaModelInstance = ModelTools.SchemaModelInstance;

function CartGetResponse(){
    var _guid = null;
    SchemaModelInstance.apply(this, arguments);

    this.guid = function(guid){
        if (arguments.length > 0){
            _guid = guid;
            return this;
        }
        else {
            return _guid;
        }
    };
}


ModelTools.extendSchemaModel(CartGetResponse);

module.exports = CartGetResponse;