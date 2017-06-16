<template>
    <div id="nav-header">
        <ul>
            <li v-for="(n, index) in navs">
                <router-link to="/node-list">{{ n }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            navs: ['列表', '配置']
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

    li .router-link .active {
        color: #ffffff;
        background: #cccccc;
        text-decoration: none;
        padding: 2px 10px;
    }
</style>
