var _ = require("lodash"),
    util = require('util'),
    BaseService = require("../BaseService"),
    Q = require('q');

function DispositionService() {
    var self = this;
    BaseService.call(this, {
        serviceUrl: "dispositions",
        RestUrl: "dispositions",
        name: "Disposition"
    });
}
util.inherits(DispositionService, BaseService);

DispositionService.prototype.getCount = function (context, context_id) {
    return this.get(this.restUrl() + '/count?context=' + context + '&context_id=' + context_id, this.mergeOptions(arguments, 1, {})).then(function (dis) {
        var disObj = {};
        _.forEach(dis, function(d) {
            if (d && d.name && d.count) {
                disObj[d.name] = d.count;
            }
        });
        return disObj;
    });
};

module.exports = DispositionService;
