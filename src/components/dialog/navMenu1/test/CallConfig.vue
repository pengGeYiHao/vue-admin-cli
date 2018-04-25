<template>
  <div class="callConfig" id="callConfig">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkeds" @change="handleCheckedChange">
      <el-checkbox v-for="item in items" :label="item" :key="item">{{item}}</el-checkbox>
    </el-checkbox-group>
    <div style="text-align: right;margin-top: 10px;">
      <el-button type="primary" size="mini" @click="closeHandle">重置</el-button>
      <el-button type="primary" size="mini" @click="onSubmit" :loading="loading">提交</el-button>
    </div>
  </div>
</template>

<script>
  import testService from '@/service/navMenu1/testService'
  export default {
    name: 'callConfig',
    props: ['formSubmit','popData','dialogHandleClose'],
    data() {
      return {
        loading:false,
        checkAll: false,
        checkeds: [],
        items: ['三要素', '四要素', '六要素'],
        isIndeterminate: true
      }
    },
    created(){},
    methods:{
      closeHandle(){
        this.dialogHandleClose()
      },
      onSubmit(){
        this.loading=true
        testService.test(this.form, this, (res) => {
          let data = res.body
          if(data.status===0){
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.formSubmit()
          } else {
            this.$message({
              type: 'erroe',
              message: '操作失败!'
            });
          }
          this.loading=false
        })
      },
      handleCheckAllChange(val) {
        this.checkeds = val ? this.items : [];
        this.isIndeterminate = false;
      },
      handleCheckedChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.items.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.items.length;
      }
    }
  }
</script>
<style scoped>
  .callConfig {
    text-align: left;
  }
</style>

