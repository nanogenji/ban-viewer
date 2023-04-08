<template>
  <div class="profileContainer">
    <div class="profileContent">
      <el-container>
        <el-header>
        <div class="title">
          <h2>个人资料</h2>
        </div>
        </el-header>
        <el-container>
          <el-aside width="300px" class="profileAside">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="time">
              <a>{{this.time}}加入</a>
            </div>
          </el-aside>
          <el-main class="profileMain">
            <el-form :model="profileForm" :rules="rules" status-icon ref="profileForm" label-width="100px" class="profileForm">
              <el-form-item label="用户名" prop="user">
                <el-input :placeholder="this.profileForm.username" v-model="profileForm.username"></el-input>
              </el-form-item>
              <el-form-item label="email" prop="email">
                <el-input :placeholder="this.profileForm.email" v-model="profileForm.email"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <el-radio v-model="profileForm.gender" label="male">男</el-radio>
                <el-radio v-model="profileForm.gender" label="female">女</el-radio>
                <el-radio v-model="profileForm.gender" label="secret">保密</el-radio>
              </el-form-item>
              <el-form-item label="年龄" prop="age">
                <el-input :placeholder="this.profileForm.age" v-model.number="profileForm.age"></el-input>
              </el-form-item>
              <el-form-item label="生日" prop="birth">
                <el-date-picker
                  v-model="profileForm.birth"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="我的签名" prop="sgin">
                <el-input
                  type="textarea"
                  :rows="4"
                  :placeholder="this.profileForm.sgin?this.profileForm.sgin:'请输入内容'"
                  v-model="profileForm.sgin">
                </el-input>
              </el-form-item>
              <el-form-item label="国家" prop="country">
                <el-select v-model="profileForm.country" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="密码" prop="pwd">
                <el-link class="changepwd" type="primary" :underline='false' @click="dialogVisible = true">修改密码</el-link>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('profileForm')" icon="el-icon-edit" style="borderRadius: 0.5rem;width: 52%">保存修改</el-button>
                <el-button class="logout" @click="logout" icon="el-icon-circle-close" type="danger" plain>退出登录</el-button>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
      </el-container>
      <!-- 修改密码dialog -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        modal
        center
        :append-to-body='true'
        >
        <el-form :model="changepwdForm" :rules="pwdrules" status-icon ref="changepwdForm" label-width="100px" class="changepwdForm">
          <el-form-item label="旧密码" prop="password">
            <el-input v-model="changepwdForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpwd">
            <el-input v-model="changepwdForm.newpwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="checkNewpwd">
            <el-input v-model="changepwdForm.checkNewpwd" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width:80%" type="primary" @click="changePassword('changepwdForm')">确认修改</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name:'Profile',
  data() {
    var checkAge = (rule, value, callback) => {
      setTimeout(() => {
        if (!Number.isInteger(value) && value) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 0 || value >150) {
            callback(new Error('请输入正确年龄'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validateOldPass = (rule, value, callback) => {
      if(!value){
        callback(new Error('请输入原密码'))
      }
      if(value !== this.password && value){
        callback(new Error('原密码不正确，请重试'))
      }
      else{
        callback();
      }
    }
    var validateNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
      else if(value.length < 6){
        callback(new Error('密码长度至少为6个字符'))
      }
      else if(value === this.changepwdForm.password){
        callback(new Error('与旧密码一样'))
      }
      else if(value.length === 16){
        return callback(new Error('密码长度已达上限'))
      }
      else {
        if (this.changepwdForm.checkNewpwd !== '') {
          this.$refs.changepwdForm.validateField('checkNewpwd');
        }
        this.pwdState = true
        callback();
      }
    };

    var validateNewPass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      }
      else if(value.length === 16){
        return callback(new Error('密码长度已达上限'))
      }
      else if (value !== this.changepwdForm.newpwd) {
        callback(new Error('两次输入密码不一致!'));
      }
      else {
        callback();
      }
    };

    return {
      imageUrl: '',
      // username:'',
      password:0,
      time:'',
      value:'',
      dialogVisible: false,
      newpwd:'',
      checkpwd:'',
      profileForm:{
        username:'',
        age:'',
        email:'',
        birth:'',
        gender:'',
        sgin:'',
        country:''
      },
      rules: {
        age: [
          { validator: checkAge, trigger: 'blur' }
        ],
        email:[
          {type:'email', message:'请输入正确的邮箱地址',trigger: 'blur'}
        ]
      },
      changepwdForm:{
        password:'',
        newpwd:'',
        checkNewpwd:''
      },
      pwdrules:{
        password:[
          {validator: validateOldPass, trigger: 'blur'}
        ],
        newpwd:[
          {validator: validateNewPass, trigger: 'blur'}
        ],
        checkNewpwd:[
          {validator: validateNewPass2, trigger: 'change'}
        ]
      },
      options: [{
        value: 'America',
        label: '美国'
      },{
        value: 'Brazil',
        label: '巴西'
      }, {
        value: 'Canada',
        label: '加拿大'
      },{
        value: 'China',
        label: '中国'
      }, {
        value: 'Egypt',
        label: '埃及'
      }, {
        value: 'England',
        label: '英国'
      }, {
        value: 'Finland',
        label: '芬兰'
      }, {
        value: 'France',
        label: '法国'
      }, {
        value: 'Germany',
        label: '德国'
      }, {
        value: 'India',
        label: '印度'
      }, {
        value: 'Italy',
        label: '意大利'
      }, {
        value: 'Iran',
        label: '伊朗'
      }, {
        value: 'Japan',
        label: '日本'
      }, {
        value: 'Norway',
        label: '挪威'
      }, {
        value: 'Russia',
        label: '俄罗斯'
      }, {
        value: 'South Korea',
        label: '韩国'
      }, {
        value: 'Spain',
        label: '西班牙'
      },  {
        value: 'Sweden',
        label: '瑞典'
      }, {
        value: 'Vietnam',
        label: '越南'
      }],
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //修改资料
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          localStorage.setItem('username',this.profileForm.username)
          localStorage.setItem('birth',this.profileForm.birth)//birth为string，非Date
          localStorage.setItem('email',this.profileForm.email)
          localStorage.setItem('sgin',this.profileForm.sgin)
          localStorage.setItem('gender',this.profileForm.gender)
          this.$message({
            message: '资料修改成功',
            type: 'success'
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //修改密码
    changePassword(formName){
      this.$refs[formName].validate((valid) => {
        if (valid){
          localStorage.setItem('password',this.changepwdForm.newpwd)
          //修改成功提示
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.dialogVisible = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    logout(){
      this.$message({
        message: '您已退出登录',
        type: 'success'
      });
      localStorage.setItem('isLogin',false)//修改登录状态
      this.$router.replace({
        path:'home'
      })
    }
  },
  created(){
    this.password = localStorage.getItem('password')
    this.time = localStorage.getItem('time')
    this.profileForm.username = localStorage.getItem('username')
    this.profileForm.age = localStorage.getItem('age')
    this.profileForm.birth = localStorage.getItem('birth')
    this.profileForm.gender = localStorage.getItem('gender')
    this.profileForm.email = localStorage.getItem('email')
    this.profileForm.sgin = localStorage.getItem('sgin')
    this.profileForm.country = localStorage.getItem('country')
  }
}
</script>

<style lang="scss" scoped>
  .profileContainer{
    width: 75%;
    min-height: 900px;
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
    .profileContent{
      width: 80%;
      min-height: 900px;
      display: flex;
      flex-flow: column nowrap;
      .title{
        width: 100%;
        margin-top: 2rem;
        color: #344767;
        display: flex;
        justify-content: center;
      }
      .profileAside{
        margin-top: 4rem;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        /deep/.avatar-uploader .el-upload {
          margin-top: 4rem;
          border: 2px dashed #d9d9d9;
          border-radius: 0.75rem;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        /deep/.avatar-uploader .el-upload:hover {
          border-color: #409EFF;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
        .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }
        .time{
          margin-top: 1.5rem;
          font-size: 0.9rem;
          color: #344767;
        }
      }
      .profileMain{
        margin-top: 5rem;
        .profileForm{
          width: 65%;
        }
        .logout{
          margin-top: 1rem;
          margin-left: 0;
          width: 52%;
          border-radius: 0.5rem;
        }
      }
    }
  }
  .changepwdForm{
    margin-left: 4rem;
    width: 65%;
  }
</style>