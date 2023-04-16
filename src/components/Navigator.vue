<template>
  <div :class="{navi:true,dark:isDark,light:!isDark}">
    <div class='navbar'>
      <div class='brand' @click="toHome">BanViewer</div>
      <ul class="collapse">
        <li class="collapse-item">
          <a style="letterSpacing:3px">影视</a>
          <div class="dropdown-container">
            <ul class="dropdown">
              <li class="dropdown-item" @click="toRanking(2)"><i class="el-icon-trophy"></i><a style="marginLeft:12px">Top50</a></li>
              <li class="dropdown-item" @click="toRecently(2)"><i class="el-icon-time"></i><a style="marginLeft:12px">近期新作</a></li>
              <li class="dropdown-item" @click="toTags(2)"><i class="el-icon-guide"></i><a style="marginLeft:12px">热门标签</a></li>
              <li class="dropdown-item" @click="toViewAll(2)"><i class="el-icon-files"></i><a style="marginLeft:12px">查看全部</a></li>
            </ul>
          </div>
        </li>
        <li class="collapse-item">
          <a style="letterSpacing:3px">音乐</a>
          <div class="dropdown-container">
            <ul class="dropdown">
              <li class="dropdown-item" @click="toRanking(3)"><i class="el-icon-trophy"></i><a style="marginLeft:12px">Top50</a></li>
              <li class="dropdown-item" @click="toRecently(3)"><i class="el-icon-time"></i><a style="marginLeft:12px">近期新作</a></li>
              <li class="dropdown-item" @click="toTags(3)"><i class="el-icon-guide"></i><a style="marginLeft:12px">热门标签</a></li>
              <li class="dropdown-item" @click="toViewAll(3)"><i class="el-icon-files"></i><a style="marginLeft:12px">查看全部</a></li>
            </ul>
          </div>
        </li>
        <li class="collapse-item">
          <a style="letterSpacing:3px">图书</a>
          <div class="dropdown-container">
            <ul class="dropdown">
              <li class="dropdown-item" @click="toRanking(1)"><i class="el-icon-trophy"></i><a style="marginLeft:12px">Top50</a></li>
              <li class="dropdown-item" @click="toRecently(1)"><i class="el-icon-time"></i><a style="marginLeft:12px">近期新作</a></li>
              <li class="dropdown-item" @click="toTags(1)"><i class="el-icon-guide"></i><a style="marginLeft:12px">热门标签</a></li>
              <li class="dropdown-item" @click="toViewAll(1)"><i class="el-icon-files"></i><a style="marginLeft:12px">查看全部</a></li>
            </ul>
          </div>
        </li>
        <li class="collapse-item">
          <a style="letterSpacing:3px">游戏</a>
          <div class="dropdown-container">
            <ul class="dropdown">
              <li class="dropdown-item" @click="toRanking(4)"><i class="el-icon-trophy"></i><a style="marginLeft:10px">Top50</a></li>
              <li class="dropdown-item" @click="toRecently(4)"><i class="el-icon-time"></i><a style="marginLeft:10px">近期新作</a></li>
              <li class="dropdown-item" @click="toTags(4)"><i class="el-icon-guide"></i><a style="marginLeft:10px">热门标签</a></li>
              <li class="dropdown-item" @click="toViewAll(4)"><i class="el-icon-files"></i><a style="marginLeft:10px">查看全部</a></li>
            </ul>
          </div>
        </li>
        <li class="collapse-item" @click="toAbout">
          <a>关于</a>
        </li>
      </ul>
      <div>
        <a @click="switchTheme('default')">
          <i v-show="!isDark" class="el-icon-sunny"></i>
        </a>
        <a @click="switchTheme('dark')">
          <i v-show="isDark" class="el-icon-moon-night"></i>
        </a>
      </div>
      <button class="login" v-if="!this.btnFlag" @click="toLogin">登录账号</button>
      <button class="user" v-else @click="toProfile">{{this.username}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigator',
  data(){
    return{
      btnFlag:false,
      username:'',
      isDark:false,
      theme:'default'
    }
  },
  methods:{
    toLogin(){
      this.$router.push({
        path:'/login'
      })
    },
    toHome(){
      this.$router.push({
        path:'/home'
      })
    },
    toProfile(){
      this.$router.push({
        path:'/profile',
        query:{
          username:this.username
        }
      })
    },
    toRanking(type){
      this.$router.push({
        path:'/ranking',
        query:{
          type
        }
      })
    },
    toRecently(type){
      this.$router.push({
        path:'/recently',
        query:{
          type
        }
      })
    },
    toTags(type){
      this.$router.push({
        path:'/tags',
        query:{
          type
        }
      })
    },
    toViewAll(type){
      this.$router.push({
        path:'/searchresult',
        query:{
          type
        }
      })
    },
    toAbout(){
      this.$router.push({
        path:'/about'
      })
    },
    isLogin(){
      this.btnFlag = true
    },
    isntLogin(){
      this.btnFlag = false
    },
    watchStorage (func1,func2) {
      window.addEventListener('setItemEvent', function (e) { // 监听setItem的 key，实现nav登录状态实时更新
        // console.log(e.key, e.value);
        if (e.key === 'isLogin') {
          if (e.value) {
            func1()
            //直接赋值不触发
            // this.btnFlag = true
          } else {
            func2()
            // this.btnFlag = false
          }
        }
      });
    },
    switchTheme(){
      // if(mode === 'dark'){
      //   this.theme = 'default'
      //   localStorage.setItem('theme','default');
      //   this.isdark = false
      // }
      // else{
      //   this.theme = 'dark'
      //   localStorage.setItem('theme','dark');
      //   this.isdark = true
      // }

      // if(mode === 'dark'){
      //   this.theme = 'light'
      //   this.isdark = false
      // }
      // else{
      //   this.theme = 'dark'
      //   this.isdark = true
      // }
      this.$store.dispatch('getIsDark')
    }
  },
  watch:{
    '$store.state.isDark':{
      handler:function(newValue){
        this.isDark = newValue
        console.log('vuex'+this.isDark)
      }
    }
  },
  created(){
    //注意类型转换，原类型为string
    this.isDark = JSON.parse(localStorage.getItem('isDark'))
    this.btnFlag = JSON.parse(localStorage.getItem('isLogin'))
    this.username = localStorage.getItem('username')
  },
  beforeMount(){
    this.watchStorage(this.isLogin,this.isntLogin)
  }
}
</script>

<style scoped lang='scss'>
  .navi{
    position: fixed;
    height: 80px;
    width: 65%;
    // min-width: 690px;
    z-index: 999;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    // color: #344767;
    color: var(--primary-text);
    .navbar{
      height: 70%;
      width: 90%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-evenly;
      align-items: center;
      border-radius: 0.5rem;
      backdrop-filter: saturate(200%) blur(30px);//与.dropdown-container的同属性互斥
      // background-color: #fffc;
      background-color: var(--regular-background);
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .brand{
        margin-left: 2rem;
        line-height: 100%;
        font-size: 1.2rem;
        color: var(--primary-text);
      }
      .brand:hover{
        cursor: pointer;
      }
      .collapse{
        width: 60%;
        margin-bottom: 0px;
        margin-top: 0px;
        height: 100%;
        margin-left: 5rem;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        .collapse-item{
          margin-left: 1rem;
          margin-right: 1rem;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          list-style:none;
          cursor:pointer;
        }
        .collapse-item:hover .dropdown-container{
          display: block;
          animation-name: menu;
          animation-duration: 0.2s;
          animation-fill-mode: forwards;
        }
        .dropdown-container{
          display: none;
          opacity: 0;
          position: absolute;
          top: 3.5rem;
          width: 10rem;
          height: 10rem;
          padding:1rem 1rem 2rem 1rem;
          list-style: none;
          border-radius: 0.5rem;
          // background-color: #fffc!important;
          background-color: var(--secondary-background);
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          // backdrop-filter: saturate(200%) blur(30px);
          .dropdown{
            padding-left: 0;
            list-style: none;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            .dropdown-item{
              width: 80%;
              padding: 0.5rem;
              margin-top: 0.4rem;
              color: var(--primary-text);
              border-radius: 0.5rem;
            }
            .dropdown-item:hover{
              background-color: rgba($color: #e3e3e3, $alpha: 0.6);
              transition-duration:0.5s;
            }
          }
        }
      }
      .login{
        width: 8%;
        height: 70%;
        margin-right: 1rem;
        background-color: var(--regular-color);
        border: none;
        border-radius: 0.5rem;
        // box-shadow: 0 2px 12px 0 rgb(255, 158, 166);
        box-shadow: 0 1px 12px 0 rgb(255, 208, 218);
        font-weight: 700;
        font-size: 0.9rem;
        // color: #fff;
        color: var(--primary-color);
        overflow: hidden;
      }
      .login:hover{
        cursor: pointer;
      }
      .user{
        min-width: 8%;
        height: 70%;
        margin-right: 1rem;
        background-color: #fff;
        border: none;
        border-radius: 0.5rem;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        font-weight: 700;
        font-size: 1rem;
        color: var(--primary-color);
      }
      .user:hover{
        cursor: pointer;
      }
    }
  }
@media screen and (max-width:970px){
  .navi{
    width: 100%;
    max-width: 620px;
  }
}
@media screen and (max-width:630px){
  .navi{
    width: 100%;
    min-width: 320px;
    .navbar{
      .brand{
        display: none;
      }
    .collapse{
      width: 90%;
      margin: 0;
      padding: 0;
      height: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
    }
      .login{
        display: none;
      }
      .user{
        display: none;
      }
    }
  }
}
  @keyframes menu{
    from{opacity: 0}
    to{opacity: 1}
  }
</style>
