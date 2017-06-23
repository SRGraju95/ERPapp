/**
 * Created by eliot on 6/25/15.
 */

var _ = require('lodash'),
    util = require('util'),
    ModelTools = require("../../ModelTools")

    ;
var SchemaModelInstance = ModelTools.SchemaModelInstance;

function CartItemRequest(){
    SchemaModelInstance.apply(this, arguments);
}

ModelTools.extendSchemaModel(CartItemRequest);

module.exports = CartItemRequest;