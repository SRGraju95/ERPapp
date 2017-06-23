var _ = require("lodash"),
    util = require('util'),
    BaseService = require("../BaseService"),
    Q = require('q');

function VideoService() {
    var self = this;
    BaseService.call(this, {
        serviceUrl: "media/videos",
        RestUrl: "media/videos",
        name: "Video"
    });
}
util.inherits(VideoService, BaseService);

VideoService.prototype.getVideo = function (videoId) {
    return this.get(this.restUrl() + '/' + videoId, this.mergeOptions(arguments, 1, {})).then(function (video) {
        return video;
    });
};

VideoService.prototype.getRelated = function (videoId, size, page) {
    return this.get(this.restUrl() + '/' + videoId + '/related?size=' + size + '&page=' + page, this.mergeOptions(arguments, 1, {})).then(function (video) {
        return video;
    });
};

module.exports = VideoService;
