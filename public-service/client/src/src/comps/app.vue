<template>
    <nav-header></nav-header>
    <router-view name="page"></router-view>
</template>

<script>
import NodesList from './nodeList.vue';
import NavHeader from './navHeader.vue';

let routes = [];
routes.concat(NavHeader.routes);
routes.concat(NodesList.routes);

export default {
    components: {
        NodesList, 
        NavHeader
    }, 
    routes
}
</script>

<style scoped>
    .app {
        flex-direction: column;
    }
</style>
