<template>
    <div id="nav-header">
        <ul>
            <li v-for="(n, index) in navs">
                <router-link :to="'/' + n.link">{{ n.text }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import NodesList from './nodeList.vue';

let navs = [{
    text: '列表',
    link: '/node-list'
}, {
    text: '配置',
    link: '/config'
}];

let routes = [];
navs.forEach(function (nav) {
    routes.push({
        path: nav.link, 
        components: {
            
        }
    })
});

export default {
    data: function() {
        return {
            navs: [{
                text: '列表', 
                link: '/node-list'
            }, { 
                text: '配置',
                link: '/config'
            }]
        }
    }, 
    methods: {
        linkTo:function(index) {
            return this.navs[index].link
        }
    }
}
</script>

<style scoped>
    div {
        width: 550px;
    }
    ul {
        display: flex;
        width: 100%;
        margin: 0;
        padding: 0;
    }
    li {
        display: block;
        line-height: 30px;
        margin: 2px;
        padding: 2px 10px;
    }
    li .router-link {
        color: #000000;
        line-height: 30px;
        text-decoration: none;
        padding: 2px 10px;
    }
    li .router-link :hover {
        color: #ffffff;
        background: #cccccc;
        text-decoration: none;
        padding: 2px 10px;
    }

    li .router-link-active {
        color: #ffffff;
        background: #cccccc;
        text-decoration: none;
        padding: 2px 10px;
    }
</style>
