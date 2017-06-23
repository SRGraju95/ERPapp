/**
 * Created by eliot on 6/24/15.
 */
var _ = require('lodash'),
    util = require('util')
    , Q = require('q')
    , Tools = require("./Tools")
    ;

var PRIMITIVES = {
    'string': {type: 'string', default: ''},
    'number': {type: 'integer', default: 0},
    'integer': {type: 'integer', default: 0},
    'null': {type: 'null', default: null},
    'boolean': {type: 'boolean', default: false}, // Always stay positive?
    'object': {type: 'object', default: {}},
    "List": {type: "List", default: []}
};

module.exports = {};
function extendSchemaModel(extendedType) {
    extendedType.prototype = _.create(SchemaModelInstance.prototype, {
        'constructor': extendedType
    });
    return extendedType;
}
module.exports.extendSchemaModel = extendSchemaModel;


var SchemaModelsInstanceTypes = {'MODEL': 'model', 'INSTANCE': 'instance', 'BOTH': 'both'};


/**
 * Manager for a collection of Schema Model definitions, like the ones provided by swagger
 * @param schema {Object} Schema definition must include a models property that is an object
 * @constructor
 */
function SchemaModels(schema) {
    var self = this;
    this.models = {};
    schema = schema || {};
    _.extend(self, schema);
    this.instanceTypes = {};
    this.instantiators = _.extend({}, self.instantiators, PRIMITIVES);
    this.setModels(schema.models);
}

SchemaModels.INSTANCE_TYPE_KEYS = SchemaModelsInstanceTypes;

/**
 * Creates a new Dynamic "instance Class" to represent the configured model from the schema when one isn't provided
 * @param name {String} The name for the class/constructor
 * @returns {*}
 */
SchemaModels.prototype.createInstanceClass = function (name) {
    var out = {};
    var fnc;
    var scope = {SchemaModelInstance: SchemaModelInstance};
    scope[name] = out[name] = fnc;
    var args = ['data'];
    fnc = Tools.NamedFunction(name, args, "if(this instanceof " + name + ") { SchemaModelInstance.apply(this, arguments); } else { return  new " + name + "(" + args.join(", ") + ");  }", scope);

    return extendSchemaModel(fnc);
};

SchemaModels.prototype._getInstanceTypeKeys = function () {
    return SchemaModelsInstanceTypes;
};
SchemaModels.prototype.isModelInstance = function(obj){
    return _.isObject(obj) && obj instanceof SchemaModelInstance;


}
SchemaModels.prototype.getInstance = function (type, data) {
    var self = this;
    return self.instantiate({type: type}, data);
};

/**
 * Check if something is a specific modelType
 * @param thing {Object} Instance to check if it's a modelType
 * @param modelType {String|Object} What to check for
 * @return {boolean} True if it is that type
 */
SchemaModels.prototype.isA = function (thing, modelType) {
    var model = _.isString(modelType) ? this.model(modelType) : modelType;
    return model.isMyInstance(thing);
};
/**
 * Get a map of all the instance types, it can be keyed by the Models "id" or it can be keyed by the Constructor of the instance types, or both
 * @param keyBy {String} Either "model", "instance", or "both" .  Use the ScheModelsInstanceTypes.INSTANCE etc..
 * @returns {Object} Map of the instance types registered
 */
SchemaModels.prototype.getInstanceTypes = function (keyBy) {
    var out = {};
    var self = this;
    keyBy = keyBy || SchemaModelsInstanceTypes.MODEL;
    function getKeys(model) {
        var output = [];
        switch (keyBy) {
            case SchemaModelsInstanceTypes.INSTANCE:
                output = [model._instanceTypeName];
                break;
            case SchemaModelsInstanceTypes.BOTH:
                output = [model._instanceTypeName, model.id];
                break;
            case SchemaModelsInstanceTypes.MODEL:
            default:
                output = [model.id];

        }
        return output;
    }

    _.forEach(this.models, function (model, modelName) {
        var instance = model.instanceType();
        _.each(getKeys(model), function (instanceKey) {
            out[instanceKey] = instance;
        });
    });
    return out;
};


SchemaModels.prototype.instantiate = function (obj, data) {
    var self = this;
    var cfg = _.get(self.instantiators, obj.type, {type: obj.type, default: null});

    var instanceData;
    instanceData = _.get(obj, 'default', _.get(cfg, 'default'));

    if (arguments.length >= 2 && data) {
        instanceData = data;
    }
    if (cfg.type === 'List') {
        var fnc = self.instantiateListFn(obj);
        return fnc(instanceData);
    }

    else if (cfg.hasOwnProperty('instantiate') && _.isFunction(cfg.instantiate)) {
        return cfg.instantiate(instanceData);
    }
    else
        return instanceData;
};

SchemaModels.prototype.instantiateListFn = function (cfg) {
    var self = this;
    var lstConfig = {type: cfg.items.type, default: {}};
    var mapper = function (item) {
        return self.instantiate(lstConfig, item);
    };
    return function (instanceData) {
        return _.map(instanceData, mapper);
    };
};

/**
 * Initialize and parse the models configuration
 * @param models {Object} map of Names to configs
 */
SchemaModels.prototype.setModels = function (models) {
    var self = this;
    _.forEach(models, function (modelConfig) {
        var modelName = modelConfig.id;
        self.models[modelName] = new SchemaModel(modelConfig, self);
        self.instantiators[modelName] = {
            type: modelName,
            default: {},
            instantiate: self.models[modelName].instantiate.bind(self.models[modelName])
        };
    });
};

/**
 * Get a model by it's name
 * @param name {String} Model name to retrieve
 * @returns {SchemaModel} the SchemaModel instance
 */
SchemaModels.prototype.model = function (name) {
    return this.models[name];
};
/**
 * Check if a model is registered
 * @param name {String}
 * @returns {*|boolean}
 */
SchemaModels.prototype.hasModel = function (name) {
    return this.models.hasOwnProperty(name);
};


module.exports.SchemaModels = SchemaModels;


/**
 * Represents an instance class of a rest Resource based on the SchemaModel definition
 * All rest ModelsInstances will extend (inherit) from SchemaModelInstance
 * @param data
 * @constructor
 */
function SchemaModelInstance(data) {

    var self = this;
    _.extend(this, data || {});

}

SchemaModelInstance.prototype.init = function(data){
    _.extend(this, data || {});
    return this;
};

SchemaModelInstance.prototype.getPropertyNames = function () {
    var self = this,
        schemaModel = this.getSchema();
    var props = _.keys(schemaModel.properties);
    if (!schemaModel.strict) {
        props = _.union(props, _.reject(_.keys(self), function (prop) {
            return _.isFunction(self[prop]);
        }));
    }
    return props;

};

/**
 * Convert to plain object
 * @returns {Object} Plain Object
 */
SchemaModelInstance.prototype.toObject = function () {
    var out = {};
    var self = this;
    _.forEach(self.getPropertyNames(), function (prop) {
        out[prop] = Tools.toObject(_.get(self, prop));
    });
    return out;
};


module.exports.SchemaModelInstance = SchemaModelInstance;


/**
 * Manager class for a specific model based on a schema
 * @param config {Object} Thhe schema's model configuration
 * @param container {SchemaModels} The SchemaModels parent instance
 * @constructor
 */
function SchemaModel(config, container) {

    this.id = config.id;
    this.description = config.description;
    this.properties = config.properties;
    this.strict = _.get(config, 'strict', true);
    this.container = container;
    this._instanceType = undefined;
    this.instanceType(_.get(config, 'instanceType', undefined));
}

SchemaModel.prototype.isMyInstance = function (thing) {
    return thing instanceof this.instanceType();
};

SchemaModel.prototype.isA = function (thing, modelType) {
    return this.container.isA(thing, modelType || this);
};
/**
 * Get the name of the constructor for the modelInstance type
 * @returns {string|*}
 */
SchemaModel.prototype.getInstanceName = function () {
    return this._instanceTypeName;
};

SchemaModel.prototype.getPropertyNames = function () {
    return _.keys(this.properties);
};
/**
 * Auto called during construct, if no instance type is configured it will auto create a new constructor function with the appropriate name
 * @param iType {Construc or|null} Either a Constructor class to use, or nothing
 * @returns {SchemaModel} This instance
 */
SchemaModel.prototype.instanceType = function (iType) {

    if (arguments.length === 1 ) {
        var that = this;
        if (!iType || !iType.prototype ) {
            this._instanceTypeName = this.id + "Instance";
            this._instanceType = this.container.createInstanceClass(this._instanceTypeName);
        }
        else {

            this._instanceTypeName = iType.prototype.constructor.name;

            this._instanceType = iType;
        }
        this._instanceType.prototype.getSchema = function () {
            return that;
        };
        return that;
    }
    else {
        return this._instanceType;
    }
};

/**
 * Create a new instance of the instance type using the provided modelData
 * @param modelData {Object|null} Used to hydrate the object if provided
 * @returns {*} Instance of the instanceType loaded with the data provided
 */
SchemaModel.prototype.createInstance = function (modelData) {
    var fnc = this.instanceType();
    modelData = modelData || {};
   var record = new fnc(modelData || {});
    return record;
};

/**
 * Create instance from model data, or partial model data depending on the scenario
 * @param modelData {Object} model instance data
 * @returns {*}
 */
SchemaModel.prototype.instantiate = function (modelData) {
    var out = {};
    var self = this;
    modelData = modelData || {};
    if (!this.id){
        try {
            throw new Error("me is no good undefined");
        }catch(err){

            console.log(err.stack);
            throw err;
        }
    }
    // Create an empty instance to start housing data
    var result = self.createInstance({});

    function handleProperties(config, propData, propOut) {
        propOut = propOut || {};

        _.forEach(config.properties, function (propConfig, propName) {
            // This will work for primitives and for custom Type objects, though a plain Object with a "properties" object is a special case
            var newData = self.container.instantiate(propConfig, _.get(propData, propName, undefined));

            if (propConfig.type === 'object' && propConfig.hasOwnProperty('properties')) {
                _.set(propOut, propName, handleProperties(propConfig, _.get(propData, propName, undefined), newData));
            }
            else {
                _.set(propOut, propName, newData);
            }
        });
        // If the model allows extra data, and it was provided in the propData, allow these fields to be merged on
        if (!self.strict) {
            _.extend(propOut, _.omit(propData, self.getPropertyNames()));
        }
    }

    handleProperties(self, modelData, result);
    return result;
};

module.exports.SchemaModel = SchemaModel;
