<template>
  <div class="container">
    <div class="title">
      <a>BanViewer</a>
    </div>
    <div class="introduction">
      <!-- <a>Welcome to Bangumi, a website focus on movie, music,books, hlep you to find your friends. Hope you have fun.</a> -->
      <a>欢迎使用BanViewer，这是一个专注于影视，音乐，书籍信息的站点，致力于发现生活中有趣的作品。</a>
    </div>
    <div class="search">
      <input type="text" class="search-content" v-model="inputValue" @keyup.enter="toSearch">
      <button type="button" :disabled="this.inputValue.length === 0?true:false" class="submitbtn" @click="toSearch"><i class="el-icon-search"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeInfo',
  data(){
    return {
      inputValue:'',
      oldInputValue:'',
    }
  },
  methods:{
    toSearch(){
      if(this.inputValue !== this.oldInputValue || this.$route.path === '/home'){
          this.$router.push({
          path:'searchresult',
          query:{
            inputValue:this.inputValue
          }
        })
        this.oldInputValue = this.inputValue//判断搜索词是否变化
      }
      else{
        return false
      }
    }
  }
}
</script>

<style scoped lang='scss'>
  .container{
    width: 50%;
    min-height: 36%;
    margin-top: 6rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    .title{
      font-size: 3rem;
      font-weight: 500;
      margin-top: 2rem;
      opacity: 0.8;
      color: #263349;
    }
    .introduction{
      height: 25%;
      font-size: 1.3rem;
      margin-top: 1rem;
      text-align: center;
      opacity: 0.8;
      color: #344767;
    }
    .search{
      width: 70%;
      height: 18%;
      background-color: rgba(255,255,255,0);
      border-radius: 999em;
      margin-top: 2rem;
      position: relative;
      padding: 0.2rem;
      .search-content{
        width: 90%;
        height: 100%;
        border: none;
        outline-style: none;
        font-size: 1.2rem;
        border-radius: 999em;
        padding-left: 1rem;
        background-color: rgba(255,255,255,0.2);
        //光标
        caret-color:#fff;
        text-indent:0.6rem;
        ///focus动画
        transition: background-color .2s;
        transition-duration: 0.2s;
        transition-timing-function: ease;
        transition-delay: 0s;
        transition-property: background-color;
      }
      .submitbtn{
        position: absolute;
        right: 7%;
        top: 8%;
        width: 45px;
        height: 45px;
        background-color: #fff;
        border-radius: 999rem;
        opacity: 0.7;
        border: none;
        cursor: pointer;
        //离开动画
        transition: all 0.2s linear;
        .el-icon-search{
          font-size: 18px;
        }
      }
      .submitbtn:hover{
        opacity: 1;
        transition: 0.2s;
      }
      .search-content:focus{
      background-color: rgba(255,255,255,0.5)
      }
    }
  }
</style>
