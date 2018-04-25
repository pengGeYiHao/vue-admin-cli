<template>
  <div id="createDefaultNavMenu" class="createDefaultNavMenu">
    <el-menu
      :class="[{ isShow:!$store.state.navMenuIsActive}, 'el-menu-vertical-demo']"
      @open="handleOpen"
      @close="handleClose"
      :collapse="!$store.state.navMenuIsActive"
      :router="true"
      :background-color="'#202326'"
      text-color="#fff"
      active-text-color="#ffd04b"
      :show-timeout="1"
      :hide-timeout="1"
      mode="vertical"
      :collapse-transition="false"
      :default-active="active"
    >
      <myMenu :model="routeItems"></myMenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'createDefaultNavMenu',
    props: ['routeItems'],
    data() {
      return {
          active:''
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
    },
    created(){
      this.active = this.$router.history.current.name
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    components:{
      myMenu:{
        name:'myMenu',
        props:['model'],
        template:`<div>
                    <template v-for="item in model">
                      <el-submenu v-if="item.child && item.child.length !=0" :index="item.name" :class="{isRight:!item.icon}">
                        <template slot="title">
                          <i v-if="item.icon" :class="item.icon"></i>
                          <span slot="title">{{item.name}}</span>
                        </template>
                        <myMenu :model="item.child"></myMenu>
                      </el-submenu>
                      <el-menu-item v-else :index="item.name" :class="{isRight:!item.icon}" :route="{path:item.url}">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.name}}</span>
                      </el-menu-item>
                    </template>
                  </div>`,
        methods:{
          handleOpen(key, keyPath) {
            console.log(key, keyPath);
          },
          handleClose(key, keyPath) {
            console.log(key, keyPath);
          }
        },
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .createDefaultNavMenu {
    height: 100%;
    overflow-y: scroll;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
</style>
