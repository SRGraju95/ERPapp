/**
 * Created by eliot on 6/22/15.
 */


var _ = require('lodash'),
    Q = require('q'),
    util = require('util')
;



function RestAction(name, method, endpoint, restObjectClass){
    this.name = name;
    this.method = method;
    this.endpoint = endpoint;
    this.restObjectClass = restObjectClass;
}

RestAction.prototype.asRestObject = function(data,defaultClass){
    if (this.restObjectClass && _.isFunction(this.restObjectClass)){
        return new this.restObjectClass(data);
    }
    else if (defaultClass){
        return new defaultClass(data);
    }
    else {
        return data;
    }
};

RestAction.prototype.getPath = function(){
    var args = [this.endpoint];
    _.forEach(arguments, function(arg){
        args.push(arg);
    });
    return util.format.apply(null, args);
};
RestAction.getDefaults = function(baseEndpoint, restObject){
    var out = {
        "find": new RestAction({name: 'find', 'method': 'get', endpoint: baseEndpoint + "/%s", restObjectClass: restObject }),
        "del":  new RestAction({name: 'del', 'method': 'del', endpoint: baseEndpoint + "/%s", restObjectClass: restObject }),
        "list":  new RestAction({name: 'list', 'method': 'get', endpoint: baseEndpoint, restObjectClass: restObject }),
        "insert": new RestAction( {name: 'insert', 'method': 'postJson', endpoint: baseEndpoint, restObjectClass: restObject}),
        "update": new RestAction( {name: 'update', 'method': 'putJson', endpoint: baseEndpoint + "/%s", restObjectClass: restObject })
    };
    return _.extend({}, out);
};


/**
 * Standard container to provide configured Rest endpoints via the clients .rest() method
 * @param endpoint Base endpoint path
 * @param client JSAPI Client
 * @constructor
 */
function RestResource(endpoint,  config){
    var self = this;

    //this.endpoint = endpoint;
    //this._client = client;
    //this._parent = null;
    var restConfig = {
        endpoint: endpoint,
        client: null,
        parent: null,
        actions: _.defaults({})
    };

    this._rest = function(){
      return restConfig;
    };
    this.client = function(client){
          if (client) {
              restConfig.client = client;
              this.bindClient(client);
              restConfig.actions = RestAction.getDefaults(this.endpoint());
              return this;
          }
        else {
          return restConfig.client;
      }

    };
    this._restObject = function(restobject){
        if (restobject){
            restConfig.restObject = restobject;
            return this;
        }
        return restConfig.restObject;
    };

    this._asRestObject = function(data){
        var fnc = self._restObject();
        if (!fnc){
            return data;
        }
        else {
            return new fnc(data);
        }

    };

    this._actionConfig = function(name, restAction){
      if (arguments.length == 2){
          restConfig.actions[name] = restAction;
          return this;
      }
        else {
          return restConfig.actions[name];
      }


    };
}

RestResource.prototype.bindClient = function(client){
    this._get = client.get.bind(client);
    this._del = client.del.bind(client);
    this._post = client.post.bind(client);
    this._put = client.put.bind(client);
    this._postJson = client.postJson.bind(client);
    this._putJson = client.putJson.bind(client);
    this.restObject(client._restObjects[this.endpoint()]);

    return this;
};

RestResource.prototype.createInstance = function(client){
    var resource = _.cloneDeep(this);
    return resource.client(client);
};

RestResource.prototype.setupActions = function(actionConfig){
    var self = this;
    _.forEach(actionConfig, function(actionConf, name){
        self._actionConfig(name, actionConf);
    })
};


RestResource.prototype.endpoint = function(){
    return this._rest().endpoint;
};


/**
 * Get the endpoint for the RestResource
 * @returns {*}
 */
RestResource.prototype.getEndpoint = function(){
    if (!this._parent){
     return this._rest().endpoint;
    }
};

/**
 * Find a resource by it's "id"
 * @param id {String|Number} The id of the rest resource to fetch
 * @param options {Object} Any request options, like query params etc
 */
RestResource.prototype.find  = function(id, options){
  var self = this;
    var restAction = self._actionConfig("find");
    var fnc = self.client()[restAction.method ];
    var defaultObject = self._restObject();
    return fnc(restAction.getPath(id), options).then(function(obj){
        return restAction.asRestObject(obj, defaultObject);
    });
};

/**
 * Delete a RestResource object by it's unique id
 * @param id {String|Number} Id of the resource to delete
 * @param options {Object} Any other options to send in the request
 * @returns {*}
 */
RestResource.prototype.remove = function(id, options){
    var self = this;
    var restAction = self._actionConfig("remove");
    var fnc = self.client()[restAction.method ];
    return fnc(restAction.getPath(id), options);
};

/**
 * Get a list of the rest resource objects, returning as a mapped "RestObject" if a restObject is registered for this type of rest resource
 * @param options Any query/list options like page, size, sort, etc
 */
RestResource.prototype.list = function(options){
    var self = this;
    var restAction = self._actionConfig("list");
    var fnc = self.client()[restAction.method ];
    var defaultObject = self._restObject();

    return fnc(restAction.getPath(), options)
        .then(function(restObjects){
        _.forEach(restObjects, function(restObject, idx){
            restObjects[idx] = restAction.asRestObject(restObject, defaultObject);
        });
        return restObjects;
    });
};

/**
 * Create a new Rest Resource instance, the result is mapped back to a "RestObject" if one is registered
 * @param data {Object} the object data to post to JSAPI
 */
RestResource.prototype.insert = function(data){
    var self = this;
    var restAction = self._actionConfig("insert");
    var fnc = self.client()[restAction.method ];
    var defaultObject = self._restObject();

    return fnc(restAction.getPath(), data).then(function(resultObject){
        return restAction.asRestObject(resultObject, defaultObject);
    });
};

/**
 * Save an existing record.  Makes a putJson request
 * @param data {Object} Record data to save
 * @returns {*}
 */
RestResource.prototype.update = function(data){
    var self = this;
    var restAction = self._actionConfig("update");
    var fnc = self.client()[restAction.method ];
    var defaultObject = self._restObject();
    return fnc(restAction.getPath(data.id), data);
};


module.exports = RestResource;