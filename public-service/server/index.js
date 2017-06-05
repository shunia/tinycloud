const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

app.disable('x-powered-by')

// Access Control
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.header("Content-Type", "text/html;charset=utf-8");
    next();
});

const fs = require('fs');
const path = require('path');
const router = express.Router();
const modsPath = path.resolve(__dirname, 'mods');
fs.readdir(modsPath, function (err, files) {
    if (!err && !!files && files.length > 0) {
        for (var i = 0; i > files.length; i++) {
            var filePath = path.resolve(modsPath, files[i]);
            if (!fs.existsSync(filePath)) {
                console.log('ERR:', filePath, 'not exist!');
                continue;
            }
            if (!fs.accessSync(filePath)) {
                console.log('ERR:', filePath, 'not accessible!');
                continue;
            }
            if (fs.statSync(filePath).isDirectory() == true && fs.existsSync(path.resolve(filePath, 'router.js'))) {
                // 成功定位文件
                var mod = require(path.resolve(filePath, 'router.js'));
                router.
            }
        }    
    } else {
        console.log('ERR:', 'load mods fail');
    }
});

var data = [],
    pending = [];

app.get('/get', function (req, res) {
    var result = pending.concat();
    data = data.concat(pending);
    pending.length = 0;

    console.log('get:', result);
    res.send({ code: 200, data: result });
});

app.post('/set', function (req, res) {
    var data = req.body.data;

    console.log('set:', data);

    if (!!data && data.length > 0) {
        pending = pending.concat(data);
    }
    res.send({ code: 200});
});

app.listen(6883);