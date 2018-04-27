<template>
  <div class="login" id="login">
    <el-card class="box-card">
      <div class="card-head">xxxxxx 后台管理系统</div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" label-width="80px" class="loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" auto-complete="off" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()" style="width:100%;">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        ruleForm:{
          username:'',
          password:''
        },
        rules:{
          username:[
            { required: true, message: '请输入用户名', trigger: 'onchange' },
//            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'onchange' }
          ]
        },
      }
    },
    methods: {
      submitForm(){
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$router.push('/navmenu')
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .box-card {
    width: 50%;
  }
  .card-head {
    font-size: 20px;
    color: #3fbc9c;
    margin: 20px;
  }
</style>
