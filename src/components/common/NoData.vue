<template>
  <div class="noData" id="noData">
    <i class="el-icon-refresh" style="font-size: 70px;font-weight: 800;color: gray;"></i>
    <div>
      <span>查无此结果，请重新查询，点击 </span><el-button type="text" > 返 回 </el-button><span>上一页面</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'noData',
    data() {
      return {}
    },
    created(){},
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .noData {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    min-height:300px;
    height:100%;
  }
</style>
