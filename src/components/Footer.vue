<template>
  <div :class="{footer:true,light:!isDark,dark:isDark}">
    <div class="footerMain">
      <div class="footerInfo">
        <i class="el-icon-video-camera-solid"></i>
        <a class="brand">BanViewer</a>
        <div class="icons">
          <i class="el-icon-s-platform icon"></i>
          <i class="el-icon-s-data icon"></i>
          <i class="el-icon-eleme icon"></i>
          <i class="el-icon-s-custom icon"></i>
          <i class="el-icon-share icon"></i>
        </div>
      </div>
      <div class="footerCol">
        <div class="title">
          <a>信息</a>
        </div>
        <a class="content" @click="demo">关于我们</a>
        <a class="content" @click="demo">联系我们</a>
        <a class="content" @click="demo">用户协议</a>
        <a class="content" @click="demo">加入我们</a>
      </div>

      <div class="footerCol">
        <div class="title">
          <a>资源与社区</a>
        </div>
        <a class="content" @click="demo">友情链接</a>
        <a class="content" @click="demo">广告合作</a>
        <a class="content" @click="demo">开发日志</a>
      </div>

      <div class="footerCol">
        <div class="title">
          <a>支持服务</a>
        </div>
        <a class="content" @click="demo">帮助中心</a>
        <a class="content" @click="demo">侵权申诉</a>
        <a class="content" @click="demo">协议汇总</a>
        <a class="content" @click="demo">公告</a>
      </div>

      <div class="footerCol">
        <div class="title">
          <a>鸣谢</a>
        </div>
        <a class="content" href="https://v2.vuejs.org/">Vue</a>
        <a class="content" href="https://bangumi.github.io/api/">bangumi</a>
        <a class="content" href="https://element.eleme.io/">element</a>
        <a class="content">and so on...</a>
      </div>
    </div>
    <div class="copyright">All rights reserved. Copyright © 2023 BanViewer by <a class="copyright" href="https://github.com/nanogenji">personal</a></div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
export default {
  name:'Footer',
  data(){
    return{
      isDark:false
    }
  },
  methods:{
    demo:throttle(function(){
      this.$message({
        message:'这只是个示例',
        type:'success'
      })
    },1500)
  },
  watch:{
    '$store.state.isDark':{
      handler:function(newValue){
        this.isDark = newValue
      }
    }
  },
  created() {
    this.isDark = JSON.parse(localStorage.getItem('isDark'))

  },
}
</script>

<style lang="scss" scoped>
  .footer{
    width: 100%;
    height: 300px;
    margin-top: 3.5rem;
    // background-color: #ff0000;
    display: flex;
    flex-flow: column nowrap;
    justify-content:space-around;
    align-items: center;
    .footerMain{
      width: 70%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      .footerInfo{
        width: 13%;
        display: flex;
        flex-flow: column nowrap;
        .el-icon-video-camera-solid{
          margin-top: 0.3rem;
          font-size: 2.5rem;
          color: var(--primary-text);
        }
        .brand{
          color: var(--primary-text);
          margin-top: 1rem;
          font-size: 1.1rem;
          font-weight: 700;
        }
        .icons{
          width: 100%;
          height: 30px;
          margin-top: 1.2rem;
          display: flex;
          flex-flow: row nowrap;
          justify-content:space-between;
          .icon{
            font-size: 1.4rem;
            color: var(--primary-text);
          }
        }
      }
      .footerCol{
        display: flex;
        flex-flow: column nowrap;
        .title{
          height: 30px;
          font-weight: 600;
          font-size: 0.8rem;
          color: var(--primary-text);
        }
        .content{
          line-height: 1.7;
          font-size: 0.8rem;
          color: #666666;
          margin: 0.2rem 0;
          transition-duration: 0.3s;
        }
        .content:hover{
          cursor: pointer;
          color: var(--primary-text);
          transition-duration: 0.3s;
        }
      }
    }
    .copyright{
      font-size: 0.9rem;
      color: var(--primary-text);
    }
  }
  @media screen and (max-width:730px){
  .footer{
    .footerMain{
      .footerInfo{

        .brand{
          display: none;
        }
        .icons{
          display: none;
        }
      }
      .footerCol{
        .title{
          font-size: 0.7rem;
        }
        .content{
          font-size: 0.7rem;
        }
      }
    }
  }
}
</style>