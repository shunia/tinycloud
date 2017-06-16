var Plugin = exports = module.exports = {};

var util = require('../util.js');

var p = Plugin;
var Context = require('./context');
var plugins = {};
var enabled = [];
var pending = [];
var id = 1000;

p.register = function (opt) {
    if (!!opt) {
        var context = new Context(id++);
        context.name = opt.name;
        context.service = opt.service;
        plugins[context.id] = {
            context: context,
            opt: opt
        };
        return context.id;
    }
};

p.enable = function (id) {
    var plugin = plugins[id];
    if (!!plugin) {
        if (pending.indexOf(id) != -1) {
            console.log('duplicate enable:', id);
            return;
        }
        if (enabled.indexOf(id) == -1) {
            pending.push(id);

            if (!!plugin.opt.init) {
                plugin.opt.init(plugin.context, function (error) {
                    if (!!error) {

                    } else {
                        console.log('plugin enabled:', plugin.opt.name);
                        pending.splice(pending.indexOf(id), 1);
                        enabled.push(id);
                        plugin.context.enable();
                    }
                });
            }
        }
    }
};

p.disable = function (id) {
    var plugin = plugins[id];
    if (!!plugin) {
        if (enabled.indexOf(id) != -1) {
            enabled.splice(enabled.indexOf(id), 1);

            if (!!plugin.opt.dispose)
                plugin.opt.dispose();
            plugin.context.disable();
        }
    }
};

p.receive = function (req, res, next) {
    console.log('Service coming:', req.method, req.path);
    var handled = false,
        split = req.path.split('.'),
        service = split.length > 0 ? split[0] : null,
        command = split.length > 1 ? split[1] : null;
    if (!service || !command) return handled;

    var handlers = [];
    for (var i = 0; i < enabled.length; i++) {
        var ctx = enabled[i].context;
        if (ctx.service == service) {
            handled = true;
            if (handlers.indexOf(ctx.receive) == -1)
                handlers.push(ctx.receive);
        }
    }

    if (!!next) {
        next(handled);
    }

    handleService(handlers);
};


function handleService(handlers, command) {
    handlers = handlers || [];
    if (handlers.length > 0) {
        function handle(handler) {
            handler
        } (handlers.shift());
    }
}