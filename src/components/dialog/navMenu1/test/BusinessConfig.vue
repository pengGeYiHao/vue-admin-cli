<template>
  <div class="businessConfig" id="businessConfig">
    <el-form :model="form" size="small">
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="手续费向谁收:" :label-width="'100px'">
            <el-radio-group v-model="form.f1">
              <el-radio :label="1">从商户</el-radio>
              <el-radio :label="2">从访客</el-radio>
              <el-radio :label="3">从会员</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="手续费何时收:" :label-width="'100px'">
            <el-radio-group v-model="form.f2">
              <el-radio :label="1">即扣</el-radio>
              <el-radio :label="2">预交</el-radio>
              <el-radio :label="3">每月最后一天</el-radio>
              <el-radio :label="5">每月第<el-input size="mini"></el-input>日</el-radio>
              <el-radio :label="4" class="delDefaultStyle">周期结算<el-input size="mini"></el-input>天一周期</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="是否退手续费:" :label-width="'100px'">
            <el-radio-group v-model="form.f3">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="支持卡类型:" :label-width="'100px'">
            <el-radio-group v-model="form.f4">
              <el-radio :label="1">全部</el-radio>
              <el-radio :label="2">借记卡</el-radio>
              <el-radio :label="3">贷记卡</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align: right;margin-top: 10px;">
      <el-button type="primary" size="mini" @click="closeHandle">重置</el-button>
      <el-button type="primary" size="mini" @click="onSubmit" :loading="loading">提交</el-button>
    </div>
  </div>
</template>

<script>
  import testService from '@/service/navMenu1/testService'
  export default {
    name: 'businessConfig',
    props: ['formSubmit','popData','dialogHandleClose'],
    data() {
      return {
        loading:false,
        form: {
          f1:'',
          f2:'',
          f3:'',
          f4:'',
        }, //查询条件
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
      }
    }
  }
</script>
<style scoped>
  .businessConfig {
    text-align: left;
  }
  .el-input {
    width: 47px;
  }
  .delDefaultStyle {
    margin-left: 0px;
  }
  .delDefaultStyle .el-input {
    width: 80px;
  }
</style>

