<template>
    <ul id="node-list">
        <li v-for="node in nodes">
            <a href="#">{{ node }}</a>
        </li>
    </ul>
</template>

<script>
export default {
  data: function () {
      return {
          nodes: ['123']
      }
  }
}
</script>

<style scoped>
    ul {
    }
    li {
        display: block;
        background: #cccccc;
    }
    li a {
        font-size: 28px;
        color: 0xff;
    }

    #broadcaster-item {
        background-color: 0x0000ff;
        margin: 10px;
        text-align: center;
        width: 100%;
        height: 100px;
    }
</style>
