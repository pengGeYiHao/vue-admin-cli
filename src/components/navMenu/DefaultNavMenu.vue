<template>
  <div class="defaultNavMenu" id="defaultNavMenu">
    <CreateDefaultNavMenu :routeItems="routeItems"></CreateDefaultNavMenu>
  </div>
</template>

<script>
  import CreateDefaultNavMenu from '@/components/common/CreateDefaultNavMenu'
  export default {
    name: 'defaultNavMenu',
    components: {
      CreateDefaultNavMenu
    },
    data() {
      return {

        routeItems:[  //测试  系统首页路由
          {
            name:'菜单1',
            url:'/navmenu1',
            icon:'el-icon-date',
            child:[
              {
                name:'测试',
                url:'/navmenu1/test',
//                icon:'',
//                child:[
//                  {
//                    name:'lala',
//                    url:'/systemhome/home/system/3',
//                    icon:'',
//                  },
//                ]
              },
            ]
          },
          {
            name:'菜单2',
            url:'/navmenu2',
            icon:'el-icon-date',
          },
          {
            name:'菜单3',
            url:'/navmenu3',
            icon:'el-icon-date'
          },
          {
            name:'预览pdf',
            url:'/testpdf',
            icon:'el-icon-date'
          },
        ]
      }
    },
    created(){
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .defaultNavMenu {
    height:100%;
  }
</style>
