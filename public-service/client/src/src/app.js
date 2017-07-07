import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './comps/app.vue';

Vue.use(VueRouter);

Vue.config.debug = true;

var router = new VueRouter({
    routes: App.routes
});

var app = new Vue({
    el: '#container',
    router: router,
    data: {
        // nodes: ['321']
    },
    render: h => h(App)
});

// NodeList.data = ['my-node-1'];
// let nodeList = new NodeList();
// nodeList.data = ['my-node-1'];