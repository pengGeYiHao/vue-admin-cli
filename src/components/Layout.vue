<template>
  <div class="layout" id="layout">
    <el-container>
      <el-aside
        :width="$store.state.navMenuIsActive?'200px':'64px'"
        style="background-color: rgb(238, 241, 246);font-weight: 800;box-sizing: border-box;margin-top: 60px;"
      >
        <div
          v-if="$store.state.navMenuIsActive"
          class="logo"
          style="width:200px;">
           xxx 管理系统
        </div>
        <div
          v-else
          class="logo"
          style="width:64px;">
          xxx
        </div>
        <DefaultNavMenu></DefaultNavMenu>
      </el-aside>

      <el-container>
        <el-header>
          <Head></Head>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Head from '@/components/Head'
  import DefaultNavMenu from '@/components/navMenu/DefaultNavMenu'
  export default {
    name: 'layout',
    components: {
      Head,
      DefaultNavMenu
    },
    data() {
      return {}
    },
    created(){},
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header {
    background-color: #fff;
    color: #000;
    line-height: 60px;
    border-bottom: 1px solid #dddfdf;
    margin-bottom: 45px;
  }

  .el-aside {
    color: #333;
  }
  .el-main {
    padding: 0;
  }
  .logo {
    height:60px;
    background-color: #20232b;
    line-height: 60px;
    color: #fff;
    position: fixed;
    top:0;
    left:0;
    z-index: 999;
  }
</style>
