const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

app.disable('x-powered-by');

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
    if (!!err) {
        console.log('ERR:', 'load mods fail');
    } else {
        for (var i = 0; i < files.length; i++) {
            var filePath = path.resolve(modsPath, files[i]);
            // console.log(filePath);
            if (!fs.existsSync(filePath)) {
                console.log('ERR:', filePath, 'not exist!');
                continue;
            }
            // if (!fs.accessSync(filePath)) {
            //     console.log('ERR:', filePath, 'not accessible!');
            //     continue;
            // }
            // console.log(fs.statSync(filePath));
            if (fs.statSync(filePath).isDirectory() == true && fs.existsSync(path.resolve(filePath, 'router.js'))) {
                // 成功定位文件
                var mod = require(path.resolve(filePath, 'router.js'));
                for (var postKey in mod.post) {
                    console.log('reg post:', postKey);
                    router.post('/' + postKey, mod.post[postKey]);
                }
                for (var getKey in mod.get) {
                    console.log('reg get:', getKey);
                    router.get('/' + getKey, mod.get[getKey]);
                }
            }
        }    
    }
});
app.use(router);

app.listen(6883, '0.0.0.0', function () {
    console.log('Server started:', '0.0.0.0:6883');
});