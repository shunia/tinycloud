var App = function () { };
var url = 'http://localhost:6883';
var count = 0;

App.prototype.get = function (callback) {
    $.get(url + '/get', null, function (result) {
        console.log('get:', result);
        if (!!result && result.code == 200) {
            if (!!callback) callback.apply(null, [result.data]);
        }
    }, 'json');
};

App.prototype.set = function (data) {
    var isArr = data instanceof Array;
    if (!isArr) {
        data = [data];
    }
    data = { data: data };
    $.post(url + '/set', data, null, 'json');
};

window.app = new App();
console.log('ready');

function updateList(data) {
    console.log('update list:', data);
    if (!!data && data.length > 0) {
        $('#list').empty();

        var li;
        for (var i = 0; i < data.length; i++) {
            li = $('<li>' + data[i].count + '</li>');
            $('#list').append(li);
        }
    }
};

$('#get').on('click', function () {
    window.app.get(updateList);
});

$('#set').on('click', function () {
    count++;
    window.app.set({ count: count });
});