<template>
  <div class="registerContainer">
    <div class="registerContent">
      <a class="registerTitle">注册账号</a>
      <el-form  :model="registerForm" status-icon :rules="rules" ref="registerForm" label-position='top' label-width="100px" class="registerForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="registerForm.username" maxlength=15 autocomplete="off" placeholder='请设置用户名'></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="registerForm.pass" maxlength=16 autocomplete="off" placeholder='请设置登录密码'></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" style="marginBottom:0.6rem">
          <el-input type="password" v-model="registerForm.checkPass" maxlength=16 autocomplete="off" placeholder='请再次输入密码'></el-input>
        </el-form-item>
        <el-form-item style="margin:0">
          <el-link type="primary" :underline="false" @click="toLogin">已有账号</el-link>
        </el-form-item>
        <el-checkbox v-model="isRead"><a @click="toAgreement">我已了解《社区指导原则》</a></el-checkbox>
        <el-form-item class="btnContainer">
          <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
          <el-button @click="resetForm('registerForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
export default {
  name:'Register',
  data() {
    var checkUsername = (rule, value, callback) => {
      for(let i=0;i<localStorage.length;i++){
        if(localStorage.getItem('username') === value){
          return callback(new Error('该用户名已被注册'))
        }
      }
      if(!value) {
        return callback(new Error('用户名不能为空'))
      }
      else if(value.length < 5) {
        return callback(new Error('用户名应至少5个字符'))
      }
      else if(value.length === 15){
        return callback(new Error('用户名长度已达上限'))
      }
        this.usernameState = true
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
      else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass');
        }
        this.pwdState = true
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      }
      else if(value.length === 16){
        return callback(new Error('密码长度已达上限'))
      }
      else if (value !== this.registerForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      }
      else {
        this.pwdCheckState = true
        callback();
      }
    };
    return {
      isRead:false,
      centerDialogVisible: false,
      usernameState:false,
      pwdState:false,
      pwdCheckState:false,
      registerForm: {
        username:'',
        pass: '',
        checkPass: '',
      },
      rules: {
        username: [
          {validator: checkUsername, trigger: 'change'}
        ],
        pass: [
          { validator: validatePass, trigger: 'change' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm:throttle(function(formName){
      const time = new Date()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.isRead){
            localStorage.setItem('username',this.registerForm.username)
            localStorage.setItem('password',this.registerForm.pass)
            localStorage.setItem('time',time.toLocaleDateString())
            this.$message({
              message: '恭喜你，注册成功',
              type: 'success'
            });
            setTimeout(this.toLogin(),1000)
          }
          else{
            this.$message({
              message: '请您确认已了解《社区指导原则》',
              type: 'warning'
            });
          }
        } else {
          this.$message.error('请正确填写注册所需的账号信息');
          console.log('error submit!!');
          return false;
        }
      });
    },2000),
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.isRead = false
    },
    toLogin(){
      this.$router.push({
        path:'/login'
      })
    },
    toAgreement(){
      this.$router.push({
        path:'/agreement'
      })
    }
  },
  //跳转协议时保留输入内容
  beforeRouteLeave(to, from, next) {
    if(to.path === '/agreement'){
      from.meta.keepAlive = true;
    }
    else{
      from.meta.keepAlive = false;
    }
    next()
  },
}
</script>

<style lang="scss" scoped>
  .registerContainer{
    width: 75%;
    min-height: 700px;
    padding-bottom: 5rem;
    margin-top: -7.4rem;
    border-radius: 0.75rem;
    background-color: #fff;
    backdrop-filter: saturate(600%) blur(30px);
    background-color: #fffc!important;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    .registerContent{
      width: 28%;
      height: 500px;
      margin-top: 9rem;
      display: flex;
      flex-flow: column nowrap;
      // background-color: #f6f8fa;
      background-color: #fcfcfc;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
      justify-content:space-between;
      align-items: center;
      border-radius: 0.75rem;
      .registerTitle{
        margin-top: -5.5rem;
        font-size: 1.7rem;
      }
      .registerForm{
        width: 84%;
        height: 90%;
        margin-bottom: 1.5rem;
        display: flex;
        flex-flow: column nowrap;
        .routeLink{
          margin: 0;
        }
        .el-form--label-top .el-form-item__label{
          padding: 0;
        }
      }
      .btnContainer{
        width: 100%;
        margin-top: 1.5rem;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;
        }
    }
  }
</style>