<template>
    <div id="app">
        <nav-header></nav-header>
        <router-view></router-view>
    </div>
</template>

<script>
import NodeList from './nodeList.vue';
import NavHeader from './navHeader.vue';

export default {
    components: {
        NodeList, 
        NavHeader
    }
}
</script>

<style scoped>
    .app {
        flex-direction: column;
    }
</style>
