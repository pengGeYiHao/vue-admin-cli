<template>
  <div class="navMenu" id="navMenu">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'navMenu',
    data() {
      return {}
    },
    created(){},
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navMenu {
    overflow-x: hidden;
  }
</style>
