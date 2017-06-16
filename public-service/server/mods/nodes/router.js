var _ = require('lodash');

var node = require('./node.js');

const FORMAT_INFO_LOST = 1000;
const SAVE_FAILURE = 1001;

function register(req, res) {
    var data = req.body;
    if (!data.token || !data.name) {
        res.send({
            code: FORMAT_INFO_LOST, 
            msg: 'Format info required: token, name'
        })
    } else {
        node.register(data, function (err, result) {
            if (!!err) {
                res.send({
                    code: SAVE_FAILURE, 
                    msg: '[' + err.code + '] ' + err.msg
                })
            } else {
                console.log('node registered:', data);
                res.send({
                    code: 200
                });
            }
        });
    }
}

function list(req, res) {
    res.send({
        code: 200, 
        data: _.map(node.registeredNodes, 'name')
    })
}

function offline(req, res) {
    node.offline(req.body, function (err, result) {
        if (!!err) {

        } else {
            console.log('node offline:', req.body);
            res.send({
                code: 200
            });
        }
    });
}

exports = module.exports = {
    post: {
        'node.register': register, 
        'node.offline': offline
    }, 
    get: {
        'node.list': list
    }
};