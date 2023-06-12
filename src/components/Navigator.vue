<template>
  <div :class="{navi:true,dark:isDark,light:!isDark}">
    <!-- PC -->
    <div class='navbar' v-if="$store.state.device === 'PC'">
      <div class='brand' @click="toHome">BanViewer</div>
      <ul class="collapse">
        <li class="collapse-item">
          <a style="letterSpacing:3px">影视</a>
          <div class="dropdown-container">
            <ul class="dropdown">
              <li class="dropdown-item" @click="toRanking(2)"><i class="el-icon-trophy dropdown-icon"></i><a style="marginLeft:12px">Top50</a><i class="el-icon-arrow-right"></i></li>
              <li class="dropdown-item" @click="toRecently(2)"><i class="el-icon-time dropdown-icon"></i><a style="marginLeft:12px">近期新作</a><i class="el-icon-arrow-right"></i></li>
              <li class="dropdown-item" @click="toTags(2)"><i class="el-icon-guide dropdown-icon"></i><a style="marginLeft:12px">热门标签</a><i class="el-icon-arrow-right"></i></li>
              <li class="dropdown-item" @click="toViewAll(2)"><i class="el-icon-files dropdown-icon"></i><a style="marginLeft:12px">查看全部</a><i class="el-icon-arrow-right"></i></li>
            </ul>
          </div>
        </li>
        <li class="collapse-item">
          <a style="letterSpacing:3px">音乐</a>
          <div class="dropdown-container">
            <ul class="dropdown">
              <li class="dropdown-item" @click="toRanking(3)"><i class="el-icon-trophy dropdown-icon"></i><a style="marginLeft:12px">Top50</a><i class="el-icon-arrow-right"></i></li>
              <li class="dropdown-item" @click="toRecently(3)"><i class="el-icon-time dropdown-icon"></i><a style="marginLeft:12px">近期新作</a><i class="el-icon-arrow-right"></i></li>
              <li class="dropdown-item" @click="toTags(3)"><i class="el-icon-guide dropdown-icon"></i><a style="marginLeft:12px">热门标签</a><i class="el-icon-arrow-right"></i></li>
              <li class="dropdown-item" @click="toViewAll(3)"><i class="el-icon-files dropdown-icon"></i><a style="marginLeft:12px">查看全部</a><i class="el-icon-arrow-right"></i></li>
            </ul>
          </div>
        </li>
        <li class="collapse-item">
          <a style="letterSpacing:3px">图书</a>
          <div class="dropdown-container">
            <ul class="dropdown">
              <li class="dropdown-item" @click="toRanking(1)"><i class="el-icon-trophy dropdown-icon"></i><a style="marginLeft:12px">Top50</a><i class="el-icon-arrow-right"></i></li>
              <li class="dropdown-item" @click="toRecently(1)"><i class="el-icon-time dropdown-icon"></i><a style="marginLeft:12px">近期新作</a><i class="el-icon-arrow-right"></i></li>
              <li class="dropdown-item" @click="toTags(1)"><i class="el-icon-guide dropdown-icon"></i><a style="marginLeft:12px">热门标签</a><i class="el-icon-arrow-right"></i></li>
              <li class="dropdown-item" @click="toViewAll(1)"><i class="el-icon-files dropdown-icon"></i><a style="marginLeft:12px">查看全部</a><i class="el-icon-arrow-right"></i></li>
            </ul>
          </div>
        </li>
        <li class="collapse-item">
          <a style="letterSpacing:3px">游戏</a>
          <div class="dropdown-container">
            <ul class="dropdown">
              <li class="dropdown-item" @click="toRanking(4)"><i class="el-icon-trophy dropdown-icon"></i><a style="marginLeft:12px">Top50</a><i class="el-icon-arrow-right"></i></li>
              <li class="dropdown-item" @click="toRecently(4)"><i class="el-icon-time dropdown-icon"></i><a style="marginLeft:12px">近期新作</a><i class="el-icon-arrow-right"></i></li>
              <li class="dropdown-item" @click="toTags(4)"><i class="el-icon-guide dropdown-icon"></i><a style="marginLeft:12px">热门标签</a><i class="el-icon-arrow-right"></i></li>
              <li class="dropdown-item" @click="toViewAll(4)"><i class="el-icon-files dropdown-icon"></i><a style="marginLeft:12px">查看全部</a><i class="el-icon-arrow-right"></i></li>
            </ul>
          </div>
        </li>
        <li class="collapse-item" @click="toAbout">
          <a>关于</a>
        </li>
      </ul>
      <div>
        <a @click="switchTheme('default')">
          <i v-show="!isDark" class="el-icon-sunny theme"></i>
        </a>
        <a @click="switchTheme('dark')">
          <i v-show="isDark" class="el-icon-moon-night theme"></i>
        </a>
      </div>
      <button class="login" v-if="!this.btnFlag" @click="toLogin">登录账号</button>
      <button class="user" v-else @click="toProfile">{{this.username}}</button>
    </div>
    <!-- mobile -->
    <div class="navbar-mobile" v-if="$store.state.device === 'Mobile'">
      <div class="navbar-title-mobile">
        <div class='brand-mobile' @click="toHome">BanViewer</div>
        <button class="menuBtn-mobile" v-hammer:tap="showList">
          <i class="el-icon-menu" v-show="!this.isShowList"></i>
          <i class="el-icon-close" v-show="this.isShowList"></i>
        </button>
      </div>
      <el-collapse-transition>
      <div class="menu-mobile" v-show="this.isShowList">
        <div class="menu-col">
          <ul class="menu-col-list" v-hammer:tap="showListAnime">
            <a>影视</a>
            <el-collapse-transition>
              <div v-show="this.isShowAnime">
                <li class="menu-dropdown" v-hammer:tap="(event)=> tomRanking(2)"><i class="el-icon-trophy"></i><a style="marginLeft:12px">Top50</a></li>
                <li class="menu-dropdown" v-hammer:tap="(event)=> tomRecently(2)"><i class="el-icon-time"></i><a style="marginLeft:10px">近期新作</a></li>
                <li class="menu-dropdown" v-hammer:tap="tomTags"><i class="el-icon-guide"></i><a style="marginLeft:10px">热门标签</a></li>
                <li class="menu-dropdown" v-hammer:tap="(event)=> toViewAll(2)"><i class="el-icon-files"></i><a style="marginLeft:10px">查看全部</a></li>
              </div>
            </el-collapse-transition>
          </ul>
          <ul class="menu-col-list" v-hammer:tap="showListMusic">
            <a>音乐</a>
            <el-collapse-transition>
              <div v-show="this.isShowMusic">
                <li class="menu-dropdown" v-hammer:tap="(event)=> tomRanking(3)"><i class="el-icon-trophy"></i><a style="marginLeft:12px">Top50</a></li>
                <li class="menu-dropdown" v-hammer:tap="(event)=> tomRecently(3)"><i class="el-icon-time"></i><a style="marginLeft:10px">近期新作</a></li>
                <li class="menu-dropdown" v-hammer:tap="tomTags"><i class="el-icon-guide"></i><a style="marginLeft:10px">热门标签</a></li>
                <li class="menu-dropdown" v-hammer:tap="(event)=> toViewAll(3)"><i class="el-icon-files"></i><a style="marginLeft:10px">查看全部</a></li>
              </div>
            </el-collapse-transition>
          </ul>
          <ul class="menu-col-list" v-hammer:tap="showListBook">
            <a>图书</a>
            <el-collapse-transition>
              <div v-show="this.isShowBook">
                <li class="menu-dropdown" v-hammer:tap="(event)=> tomRanking(1)"><i class="el-icon-trophy"></i><a style="marginLeft:12px">Top50</a></li>
                <li class="menu-dropdown" v-hammer:tap="(event)=> tomRecently(1)"><i class="el-icon-time"></i><a style="marginLeft:10px">近期新作</a></li>
                <li class="menu-dropdown" v-hammer:tap="tomTags"><i class="el-icon-guide"></i><a style="marginLeft:10px">热门标签</a></li>
                <li class="menu-dropdown" v-hammer:tap="(event)=> toViewAll(1)"><i class="el-icon-files"></i><a style="marginLeft:10px">查看全部</a></li>
              </div>
            </el-collapse-transition>
          </ul>
          <ul class="menu-col-list" v-hammer:tap="showListGame">
            <a>游戏</a>
            <el-collapse-transition>
              <div v-show="this.isShowGame">
                <li class="menu-dropdown" v-hammer:tap="(event)=> tomRanking(4)"><i class="el-icon-trophy"></i><a style="marginLeft:12px">Top50</a></li>
                <li class="menu-dropdown" v-hammer:tap="(event)=> tomRecently(4)"><i class="el-icon-time"></i><a style="marginLeft:10px">近期新作</a></li>
                <li class="menu-dropdown" v-hammer:tap="tomTags"><i class="el-icon-guide"></i><a style="marginLeft:10px">热门标签</a></li>
                <li class="menu-dropdown" v-hammer:tap="(event)=> toViewAll(4)"><i class="el-icon-files"></i><a style="marginLeft:10px">查看全部</a></li>
              </div>
            </el-collapse-transition>
          </ul>
        </div>
      </div>
      </el-collapse-transition>
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
      theme:'default',
      isShowList:false,
      isShowAnime:false,
      isShowMusic:false,
      isShowBook:false,
      isShowGame:false
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
      if(this.$store.state.device === 'Mobile'){
        this.$router.push({
          path:'/msearchresult',
          query:{
            type
          }
        })
        this.isShowList = false
      }
      else{
        this.$router.push({
          path:'/searchresult',
          query:{
            type
          }
        })
      }

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
    },
    // mobile
    showList(){
      this.isShowList = !this.isShowList
      this.isShowAnime = false,
      this.isShowMusic = false,
      this.isShowBook = false,
      this.isShowGame = false
    },
    showListAnime(){
      this.isShowAnime = !this.isShowAnime
      this.isShowMusic = false,
      this.isShowBook = false,
      this.isShowGame = false
    },
    showListMusic(){
      this.isShowMusic = !this.isShowMusic
      this.isShowAnime = false,
      this.isShowBook = false,
      this.isShowGame = false
    },
    showListBook(){
      this.isShowBook = !this.isShowBook
      this.isShowAnime = false,
      this.isShowMusic = false,
      this.isShowGame = false
    },
    showListGame(){
      this.isShowGame = !this.isShowGame
      this.isShowAnime = false,
      this.isShowMusic = false,
      this.isShowBook = false
    },
    tomRanking(type){
      this.$router.push({
        path:'/mranking',
        query:{
          type
        }
      })
      this.isShowList = false
    },
    tomTags(){
      this.$router.push({
        path:'/mtags',
      })
      this.isShowList = false
    },
    tomRecently(type){
      this.$router.push({
        path:'/mrecently',
        query:{
          type
        }
      })
      this.isShowList = false
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
    // height: 80px;
    // min-height: 56px;
    min-width: 64px;
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
      // height: 70%;
      // height: 56px;
      height: 60px;
      width: 90%;
      margin-top: 12px;
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
        font-size: 15px;
        .collapse-item{
          // margin-left: 1rem;
          // margin-right: 1rem;
          margin-top: 0.4rem;
          height: 80%;
          // width: 40px;
          width: 80px;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          list-style:none;
          cursor:pointer;
        }
        .collapse-item:hover{
          background-color: rgba(255, 201, 206, 0.4);
        }
        .collapse-item >a{
          transition-duration: 0.2s;
        }
        .collapse-item:hover >a{
          color: var(--primary-color);
          // font-weight: 600;
          transition-duration: 0.2s;
        }
        .collapse-item:hover .dropdown-container{
          display: block;
          animation-name: menu;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }
        .dropdown-container{
          display: none;
          opacity: 0;
          position: absolute;
          top: 3.4rem;
          margin-left: 8.2rem;
          width: 11rem;
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
              width: 100%;
              padding: 0.8rem 0.5rem;
              // margin-top: 0.4rem;
              color: var(--regular-text);
              border-radius: 0.5rem;
              font-size: 14px;
              .dropdown-icon{
                font-size: 18px;
                margin-left: 0.4rem;
              }
              .el-icon-arrow-right{
                position: absolute;
                margin-top: 4px;
                right: 20px;
                opacity: 0;
              }
            }
            .dropdown-item:hover{
              color: var(--primary-text);
              background-color: rgba($color: #e3e3e3, $alpha: 0.3);
              transition-duration:0.2s;
            }
            .dropdown-item:hover .el-icon-arrow-right{
              opacity: 1;
            }
          }
        }
        .dropdown-container::before{
          content: '';
          display: block;
          position: absolute;
          width: 14px;
          height: 14px;
          background: var(--secondary-background);
          top: -7px;
          left: 15%;
          transform: translateX(-50%) rotate(45deg);
        }
      }
      .login{
        width: 8%;
        height: 60%;
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
        transition-duration: 0.2s;
      }
      .login:hover{
        color: var(--primary-background);
        // background: linear-gradient(149deg,#ff9ea6,#ffc7cc);
        background-color: var(--primary-color);
        transition-duration: 0.3s;
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
      .theme{
        font-size: 18px;
        margin-top: 0.1rem;
        margin-right: 0.8rem;
      }
      .theme:hover{
        color: var(--primary-color);
        transition-duration: 0.2s;
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

<style lang="scss" scoped>
  .navbar-mobile{
    min-height: 56px;
    width: 90%;
    margin-top: 12px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    border-radius: 0.5rem;
    backdrop-filter: saturate(200%) blur(30px);//与.dropdown-container的同属性互斥
    background-color: var(--regular-background);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .navbar-title-mobile{
      width: 100%;
      height: 56px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      .brand-mobile{
        margin-left: 2rem;
        line-height: 100%;
        font-size: 1.2rem;
        color: var(--primary-text);
      }
      .brand-mobile:hover{
        cursor: pointer;
      }
      .menuBtn-mobile{
        width: 50px;
        height: 70%;
        margin-right: 1rem;
        background-color: var(--regular-color);
        border: none;
        border-radius: 0.5rem;
        // box-shadow: 0 2px 12px 0 rgb(255, 158, 166);
        box-shadow: 0 1px 12px 0 rgb(255, 208, 218);
        font-weight: 700;
        font-size: 1.4rem;
        // color: #fff;
        color: var(--primary-color);
        overflow: hidden;
      }
    }
    .menu-mobile{
      .menu-col{
        .menu-dropdown{
          padding: 5px 2px;
          list-style: none;
          color: var(--regular-text);
        }
      }
    }
  }
</style>
