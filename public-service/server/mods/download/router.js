var download = require('./download');

function postDownloadList(req, res) {
    console.log('download', req.body);
    download.updateList(req.body);
    res.send({
        code: 200
    })
}

function getDownloadList(req, res) {
    var current = download.getList();
    res.send({
        code: 200,
        data: {
            list: current
        }
    });
}

exports = module.exports = {
    post: {
        'download.list': postDownloadList
    }, 
    get: {
        'download.list': getDownloadList
    }
}