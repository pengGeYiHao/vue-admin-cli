<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created(){}
  }
</script>

<style>
  /* 初始化 */
  html,body,#app,.layout,.el-container{height:100%;}
  body,ul,ol,p,h1,h2,h3,h4,h5,dl,dd,form,input,textarea,td,th,button,strong,em,select,video,canvas{margin:0;padding:0;}
  li{list-style:none;vertical-align:top;}
  table{ border-collapse:collapse;}
  textarea{resize:none;overflow:auto;}
  img{ border:none; vertical-align:middle;}
  em{ font-style:normal;}
  a{ text-decoration:none; color: #48576a;}
  a,input{ -webkit-tap-highlight-color:rgba(0,0,0,0);}
  input{outline:0px;}
  body{background:#f1f1f1; margin: 0; padding: 0; font-family:'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;}
  /* 公共样式 */
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  /*table 公共样式*/
  .el-table tr > th,.el-table tr > th {
    text-align: center;
  }
  /*分页和批量操作*/
  .main-footer {
    margin: 20px 0px;
    background-color: #f3f3f3;
  }
  /*分页公共样式*/
  .el-pagination {
    white-space: nowrap;
    padding: 2px 5px;
    color: #303133;
    font-weight: bold;
    line-height: 0px;
    text-align: right;
    padding: 10px;
  }
  /*弹窗公共样式*/
  .el-dialog__header {
    padding:10px;
    text-align: left;
    background-color: #e6e9e9;
    margin-bottom: 10px;
  }
  .el-dialog__title {
    font-size: 15px;
  }
  .el-dialog__headerbtn {
    top: 12px;
    right: 12px;
  }
  .el-dialog__body {
    padding: 12px 20px;
  }
  /*折叠面板去掉右侧图标*/

  .el-collapse-item__header .el-icon-arrow-right {
    display: none;
  }
  /*去掉折叠面包下划线*/
  .el-collapse-item__header,.el-collapse-item__wrap {
    border: none;
  }
  /*筛选顶部公共样式*/
  .el-collapse-item {
    border: 1px solid #e4e4e4;
  }
  .el-collapse-item__content {
    padding:20px 20px 20px 0px;
  }
  /* default侧边菜单公共样式*/
  .isShow .el-submenu__title > span,.isShow .el-submenu__title > el-submenu__icon-arrow {
    display: none !important;
  }
</style>
