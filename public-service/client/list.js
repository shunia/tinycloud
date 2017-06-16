var App = function () { };
var url = 'http://localhost:6883';
var count = 0;

console.log('ready');
var app = window.app = new App();

function updateList(data) {
    console.log('update list:', data);
    if (!!data && data.length > 0) {
        $('#list').empty();

        for (var i = 0; i < data.length; i++) {
            var name = data[i];
            var li = $('<li id="' + name + '"></li>');
            li.append('<p>' + name + '</p>');
            $('#list').append(li);
        }
    }
};

$.get(url + '/node.list', null, function (result) {
    console.log('get:', result);
    if (!!result && result.code == 200) {
        updateList(result.data);
    }
}, 'json');