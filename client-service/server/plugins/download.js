var Download = exports = module.exports = {};

var Aria2 = require('aria2');
var ctx;
var p = Download;

p.name = 'tinycloud.plugin.download';
p.service = 'download';
Object.defineProperty(p, 'id', {
    get: function () {
        return ctx.id;
    }
});

p.init = function (context, next) {
    ctx = context;
    next();

    list();
}

p.handler = function (service, data, next) {
    switch (service) {
        case 'add':
            add(data);
            break;
        case 'remove':
            remove(data);
            break;
        case 'list':
            list();
            break;
    }
}

p.dispose = function () {
    
}

function add() {
    
}

function remove() {

}

function list() {
    // 要求列表,就发送一下列表数据
    ctx.send('list', [], false, function () {

    });
}