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
            name:'菜单',
            url:'/navmenu',
            icon:'el-icon-date',
            child:[
              {
                name:'普通页',
                url:'/navmenu/test',
              },
            ]
          },
          {
            name:'线性图',
            url:'/lineimg',
            icon:'el-icon-date',
          },
          {
            name:'slider线性图',
            url:'/sliderlineimg',
            icon:'el-icon-date',
          },
          {
            name:'slider直方图',
            url:'/sliderhistogram',
            icon:'el-icon-date',
          },
          {
            name:'饼状图',
            url:'/cakeimg',
            icon:'el-icon-date'
          },
          {
            name:'预览pdf',
            url:'/testpdf',
            icon:'el-icon-date'
          },
          {
            name:'编辑单元格',
            url:'/edittable',
            icon:'el-icon-date'
          },
          {
            name:'富文本编辑器',
            url:'/quilleditor',
            icon:'el-icon-date'
          },
          {
            name:'学习g2',
            url:'/studyg2',
            icon:'el-icon-date',
            child:[
              {
                name:'test1',
                url:'/studyg2/test1',
              },
            ]
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
