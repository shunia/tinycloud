var Node = exports = module.exports = {};

var p = Node;
p.registeredNodes = [];

p.register = function (node, next) {
    var index = this.getNodeIndex(node);
    if (index == -1) {
        this.registeredNodes.push(node);
        next();
    } else {
        next({
            code: 2000, 
            msg: 'node has registered'
        })
    }
}

p.offline = function (node, next) {
    var index = this.getNodeIndex(node);
    if (index != -1) {
        this.registeredNodes.splice(index, 1);
    }
    if (!!next) next();
}

p.getNodeIndex = function (node) {
    var index = -1;
    for (var i = 0; i < this.registeredNodes.length; i++) {
        if (node.name == this.registeredNodes[i].name && node.token == this.registeredNodes[i].token) {
            index = i
            break;
        }
    }
    return index;
}