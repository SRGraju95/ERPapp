/**
 * Created by eliot on 6/24/15.
 */

/**
 * Sample usage of the ModelTools schema based instantiator/etc
 *
 *
 */

var ModelTools = require("../lib/ModelTools"),
    _ = require('lodash'),
    util = require('util'),
    should = require('should');

var SchemaModelInstance = ModelTools.SchemaModelInstance;

//function BookInstance(){
//    SchemaModelInstance.apply(this, arguments);
//}
//ModelTools.extendSchemaModel(BookInstance);

var mainConfig = {
    models: {
        "Book": {
            id: "Book",
            description: "",
            strict: false,
            properties: {
                name: {type: "string", required: true},
                pages: {type: "integer", default: 220},
                primaryAuthor: {type: "Author", required: true},
                authors: {type: "List", "items": {type: "Author"}}
            }
        },
        "Author": {
            id: "Author",
            description: "",
            properties: {
                first_name: {type: "string"},
                last_name: {type: "string"},
                alive: {type: "boolean", default: true}
            }
        }
    }
};

var cfg = _.extend({}, mainConfig);

var schemas = new ModelTools.SchemaModels(cfg);
var exampleData = {};
var types = schemas.getInstanceTypes(ModelTools.SchemaModels.INSTANCE_TYPE_KEYS.BOTH);
var c = schemas.getInstance('Book', {
    name: "cool",
    color: "blue",
    primaryAuthor: {first_name: 'jon', 'last_name': 'do', alive: false},
    authors: [{first_name: 'jon', 'last_name': 'do', alive: false}, {
        first_name: 'tom',
        'last_name': 'cool',
        alive: true
    }]
});

console.log(c.toObject());

