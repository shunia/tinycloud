// 注册节点,连接服务
var auth = require('./auth');
auth.register(function (err, res) {
    if (!!err) {
        console.log('auth failure, exit');
    } else if (res.code == 200) {
        console.log('auth success');
        next();
    } else {
        console.log('auth result:', res);
        if (res.code == 1001) {
            // 重复注册,也允许逻辑运行
            console.log('auth success');
            next();
        }
    }
});

function next() {
    // monitor
    monitor();
    registerPlugins();
    startServer('0.0.0.0', 3001);
}

function monitor() {
    // prevent the process from closing instantly
    process.stdin.resume();

    // 监听退出事件,准备触发逻辑
    var nodeCleanUp = require('node-cleanup');
    nodeCleanUp(function (exitCode, signal) {
        console.log(exitCode, signal);
    });
}

var plugin = require('./plugin/plugin.js');
function registerPlugins() {
    // 注册插件
    var fs = require('fs'),
        path = require('path'),
        pluginFolder = path.resolve(__dirname, 'plugins');
    var files = fs.readdirSync(pluginFolder);
    if (!!files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            var p = require(path.resolve(pluginFolder, files[i]));
            plugin.enable(plugin.register(p));
        }
    }
}


function startServer(host, port) {
    // 启动服务
    var express = require('express');
    var app = express();

    app.use('/', function (req, res) {
        plugin.receive(req, res, function (handled) {
            if (!handled) {
                // 其他逻辑处理
            }
        });
    });

    app.listen(port, host, function () {
        console.log('Server started:', host + ':' + port);
    });
}