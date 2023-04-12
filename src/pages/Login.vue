<template>
  <div class="loginContainer">
    <div class="loginContent">
      <a class="loginTitle">登录账号</a>
      <a class="welcome">欢迎回到BanViewer</a>
      <el-form  :model="loginForm" status-icon :rules="rules" ref="loginForm" label-position='top' label-width="100px" class="loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="loginForm.username" maxlength=15 autocomplete="off" placeholder='请输入用户名'></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="loginForm.pass" maxlength=16 autocomplete="off" :show-password='true' placeholder='请输入密码'></el-input>
        </el-form-item>
        <el-form-item>
          <el-link :underline="false" @click="toRegister">没有账号？点击注册</el-link>
        </el-form-item>
        <el-form-item class="btnContainer">
          <el-button class="submitBtn" type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button class="resetBtn" @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
export default {
  name:'Login',
      data() {
      var checkUsername = (rule, value, callback) => {
        if(!value) {
          return callback(new Error('用户名不能为空'))
        }
        else if(value.length < 5) {
          return callback(new Error('用户名应至少5个字符'))
        }
        else if(value.length === 15){
          return callback(new Error('用户名长度已达上限'))
        }
          return callback();
      }

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        else if(value.length < 6){
          callback(new Error('密码长度至少为6个字符'))
        }
        else if(value.length === 16){
          return callback(new Error('密码长度已达上限'))
        }
        return callback();
      };
      return {
        loginForm: {
          username:'',
          pass: '',
        },
        rules: {
          username: [
            {validator: checkUsername, trigger: 'change'}
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm:throttle(function(formName){
        this.$refs[formName].validate((valid) => {
          if (valid){
            if(this.loginForm.username === localStorage.getItem('username') && this.loginForm.pass === localStorage.getItem('password')){
              localStorage.setItem('isLogin',true)
              //登录成功提示
              this.$message({
                message: '欢迎回来',
                type: 'success'
              });
              setTimeout(this.toHome(),1000)
            }
            else{
              this.$message.error('登录失败，请检查账号信息');
            }
          }
          else {
            this.$message({
              message: '请正确填写登录信息',
              type: 'warning'
            });
            console.log('error submit!!');
            return false;
          }
        });
      },2000),
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      toRegister(){
        this.$router.push({
          path:'register',
        })
      },
      toHome(){
        this.$router.replace({
          path:'home',
          query:{
            username:this.loginForm.username
          }
        })
      }
    },
}
</script>

<style lang="scss" scoped>
  .loginContainer{
    width: 75%;
    min-height: 700px;
    padding-bottom: 5rem;
    margin-top: -7.4rem;
    border-radius: 0.75rem;
    backdrop-filter: saturate(600%) blur(30px);
    background-color: var(--regular-background);
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    .loginContent{
      width: 28%;
      height: 500px;
      margin-top: 9rem;
      display: flex;
      flex-flow: column nowrap;
      background-color: var(--secondary-background);
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
      justify-content:space-around;
      align-items: center;
      border-radius: 0.75rem;
      .loginTitle{
        margin-top: -7rem;
        font-size: 1.7rem;
        color: var(--primary-text);
      }
      .welcome{
        margin-top: 4rem;
        font-weight: 500;
        font-size: 1.6rem;
        letter-spacing:2px;
        color: var(--primary-text);
      }
      .loginForm{
        width: 84%;
        margin-top: -1rem;
        display: flex;
        flex-flow: column nowrap;
        .el-form--label-top .el-form-item__label{
          padding: 0;
        }
        /deep/.el-input__inner{
          background-color: var(--regular-background);
        }
        /deep/.el-link.el-link--default{
          color: var(--primary-color);
        }
      }
      .btnContainer{
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;
        .submitBtn{
          background-color: var(--primary-color);
          border: var(--primary-color);
        }
        .resetBtn{
          background-color: var(--btn-background);
        }
      }
    }
  }
</style>