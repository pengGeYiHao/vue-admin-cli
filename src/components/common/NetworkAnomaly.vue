<template>
  <div class="networkAnomaly" id="networkAnomaly">
    <i class="el-icon-refresh" style="font-size: 30px;font-weight: 800;color: gray;"></i>
    <div>
      <span>网络异常，请您检查您的网络或</span><el-button type="text">重新加载</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'networkAnomaly',
    data() {
      return {}
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .networkAnomaly {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    height:100%;
  }
</style>
