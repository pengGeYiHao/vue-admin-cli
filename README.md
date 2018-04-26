# 项目简介

####  该项目可以快速搭建后台管理系统，结合了vue-cli+element ui ，并支持：表格的拖拽、分页路由、按需加载、预览pdf、各种统计图表、富文本编辑器、表格的编辑


## 启动

###

注意需要安装node 8.x以上 更换主题颜色时由于node-sass 问题需要切换为6.x(安装方法不在介绍)

-  进入 package.json 所在目录  命令行运行  npm install
-  npm run start



## src目录结构 介绍
-  components 所有的组件所在目录

    + Main 所有的页面组件
    + common 共有组件
    + dialog 弹窗组件
    + navMenu 菜单组件
    + searchForm 搜索栏组件

-  router  所有的路由
-  service  所有的请求
-  store  vuex
-  utils 工具模块
-  main.js 入口文件
-  static  静态文件

## 构建

npm run build  会在根目录下生成dist目录。里边文件用于部署生成环境





