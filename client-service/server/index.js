var fs = require('fs'),
    path = require('path'),
    nodeCleanUp = require('node-cleanup'),
    express = require('express');

var auth = require('./auth');
var env;

// 读取配置文件
var env = process.env['ENV'] || 'dev',
    fp = path.resolve(__dirname, 'config_' + env + '.json');
var hasConf = fs.existsSync(fp);
if (!hasConf) process.exit();
fs.readFile(fp, function (err, data) {
    if (!err && !!data) {
        for (var key in data) {
            process.env['tiny_cloud_client'] = env = data;
        }

        registerNode();
    }    
});

// 注册节点,连接服务
function registerNode() {
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
};

function next() {
    // monitor
    monitor();
    registerPlugins();
    startServer(env.host, env.port);
}

function monitor() {
    // prevent the process from closing instantly
    // process.stdin.resume();

    // 监听退出事件,准备触发逻辑
    nodeCleanUp(function (exitCode, signal) {
        console.log(exitCode, signal);
        auth.offline();
    });
}

var plugin = require('./plugin/plugin.js');
function registerPlugins() {
    // 注册插件
    var pluginFolder = path.resolve(__dirname, 'plugins');
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