var auth = exports = module.exports = {};

var api = '';
var token = '';
var name = '';

var request = require('request');

var p = auth;
p.session = '';

p.grabNodeInfo = function () {
    return {
        token: token, 
        name: name
    }
}

p.register = function (next) {
    var env = process.env['tiny_cloud_client'];
    token = env['token'];
    name = env['name'];
    api = env['api'];

    request.post({ url: api + 'node.register', json: true, form: this.grabNodeInfo() },
        function (err, res, body) {
            p.session = body.session;

            next(err, body);
        }
    );
}

p.notify = function () {
    request.post({ url: api + 'node.notify', json: true, form: {session: p.session} },
        function (err, res, body) {
            next(err, body);
        }
    );
}

p.offline = function () {
    request.post({ url: api + 'node.offline', form: { session: p.session }, json: true },
        function (err, res, body) {
            next(err, body);
        }
    );
}