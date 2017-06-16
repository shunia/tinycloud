var request = require('request');
var util = require('../util.js');
const api = 'http://api.tinycloud.com:6883/';
const token = require('../auth').grabNodeInfo().token;

var pluginId = 0;
var enabled = false;
var Context = function (id) { pluginId = id };

var p = Context.prototype;

Object.defineProperty(p, 'id', {
    get: function () {
        return pluginId;
    }
})
p.name = 'tinycloud.plugin.default';
p.service = 'service.default';

p.schedule = function (conf, callback) {

};

p.receive = function (command, data, next) {

};

p.send = function (service, data, isGET, callback) {
    if (!enabled) return;
    var s = api + this.service + '.' + service;
    callback = callback || util.emptyCb;
    console.log('context req:', isGET ? 'GET' : 'POST', '[' + this.name + ']', s, token, data);
    if (isGET) {
        request.get({
            url: s, 
            json: true
        }, function(err, res, body) {
            callback(err, body);
        });
    } else {
        request.post({
            url: s,
            json: true,
            form: { data: data, token: token }
        }, function(err, res, body) {
            callback(err, body);
        });
    }
}

p.enable = function () {
    enabled = true;
}

p.disable = function () {
    enabled = false;
}

module.exports = Context;