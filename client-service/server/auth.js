var auth = exports = module.exports = {};

var request = require('request');
const api = 'http://api.tinycloud.com:6883/';

var p = auth;

p.grabNodeInfo = function () {
    return {
        token: '123456', 
        name: 'my-node-1'
    }
}

p.register = function (next) {
    request.post({ url: api + 'node.register', json: true, form: this.grabNodeInfo() },
        function (err, res, body) {
            next(err, body);
        }
    );
}

p.offline = function () {
    request.post({ url: api + 'node.offline', form: this.grabNodeInfo(), json: true },
        function (err, res, body) {
            next(err, JSON.parse(body));
        }
    );
}