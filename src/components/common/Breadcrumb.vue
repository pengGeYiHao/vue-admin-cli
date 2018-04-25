<template>
  <div class="breadcrumb" id="breadcrumb">
    <el-breadcrumb separator="/" style="padding:15px;">
      <template v-for="route in routeList">
        <!--<span>{{!route.path?'/':route.path.match(/:/)?route.path.replace(/:\S+/,''):route.path}},</span>-->
        <el-breadcrumb-item :to="{path:!route.path?'/':route.path.match(/:/)?route.path.replace(/:\S+/,''):route.path}">{{route.name}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'breadcrumb',
    data() {
      return {
        routeList:[]
      }
    },
    created(){
      this.setList()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'setList'
    },
    methods: {
        setList(){
          this.$set(this,'routeList',this.$route.matched)
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .breadcrumb {
    background-color: #fff;
    position: fixed;
    width:100%;
    border-bottom: 2px solid #dddfdf;
    top: 60px;
    z-index: 999;
  }
</style>
