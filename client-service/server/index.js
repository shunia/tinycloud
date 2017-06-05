var request = require('request');

var interval = 1000 * 10;
var intervalId = -1;
var lastReq;

function start() {
    var self = this;
    get.apply(self);
    intervalId = setInterval(function () {
        get.apply(self);
    }, interval);
}

function get() {
    if (!!lastReq) {
        lastReq.abort();
    }
    console.log('get start');
    lastReq = request.get('http://api.tinycloud.com:6883/get', function (error, response, body) {
        if (!error && !!body) {
            lastReq = null;

            console.log('req:', body);

            if (body.code == 200) {
                update.apply(this, [body.data]);
            }    
        }
    });
}

function update(tasks) {
    var isArr = tasks instanceof Array;
    if (!isArr) {
        console.log('update:', '[Format Error] Data is not Array');
    } else {
        if (tasks.length == 0) {
            console.log('update:', 'no new tasks');
        } else {
            console.log('update:', tasks.length + ' new tasks:');
            for (var i = 0; i < tasks.length; i++) {
                console.log('  ', tasks[i].count);
            }
        }    
    }
}

start();