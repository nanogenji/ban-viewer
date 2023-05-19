<template>
  <div class="container">
    <div class="title">
      <h1 class="banviewer">BanViewer</h1>
    </div>
    <div class="introduction" v-show="$store.state.device === 'PC'">
      <!-- <a>Welcome to Bangumi, a website focus on movie, music,books, hlep you to find your friends. Hope you have fun.</a> -->
      <a>欢迎使用BanViewer，这是一个专注于影视，音乐，书籍信息的站点，致力于发现生活中有趣的作品。</a>
    </div>
    <div class="search">
      <div class="searchForm">
        <input type="text" class="search-content" v-model="inputValue" @keyup.enter="toSearch" @click="showHistory($event)">
        <button type="button" :disabled="this.inputValue.length === 0?true:false" class="submitbtn" @click="toSearch"><i class="el-icon-search"></i></button>
      </div>
      <div class="searchHistory" @click.stop="keepBackground" v-show="isShow && this.historyList.length !== 0">
        <i class="el-icon-delete" @click="deleteHistory"></i>
        <el-tag
          v-for="history in historyList"
          :key="history.timestamp"
          closable
          class="tag"
          @click.stop="tagToSearch(history.value)"
          @close.stop="deleteTag(history.value)">
          {{history.value}}
        </el-tag>
      </div>
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
      historyList:[],
      isShow:false
    }
  },
  methods:{
    showHistory(event){
      if(this.$store.state.device === 'PC'){
        this.isShow = true
        event.stopPropagation();
      }
    },
    // eslint-disable-next-line
    keepBackground(){
    },
    closeHistory(){
      this.isShow = false
      console.log('close被触发了')
    },
    toSearch(){
      var time = new Date().getTime()
      // console.log('some'+this.historyList.some(item => item.value === this.inputValue))
      // console.log(this.historyList.findIndex(item => item.value === this.inputValue))
      // console.log(this.historyList[this.historyList.findIndex(item => item.value === this.inputValue)])
      if(this.inputValue !== ''){
        //保存上限
        if(this.historyList.length > 15){
          this.historyList.pop()
        }
        //tag是否已存
        if(!this.historyList.some(item => item.value === this.inputValue)){
          this.historyList.unshift({value:this.inputValue,timestamp:time})
          localStorage.setItem('searchHistory',JSON.stringify(this.historyList))
        }
        else{
          // let i = this.historyList.findIndex(item => item.value === this.inputValue)
          this.historyList = this.historyList.filter(item => item.value !== this.inputValue)
          this.historyList.unshift({value:this.inputValue,timestamp:time})
          localStorage.setItem('searchHistory',JSON.stringify(this.historyList))
        }
      }
      if(this.$store.state.device === 'Mobile'){
        if(this.inputValue !== this.oldInputValue || this.$route.path === '/home'){//判断搜索词是否变化
            this.$router.push({
            path:'msearchresult',
            query:{
              inputValue:this.inputValue
            }
          })
          this.oldInputValue = this.inputValue
        }
        else{
          return false
        }
      }
      if(this.inputValue !== this.oldInputValue || this.$route.path === '/home'){//判断搜索词是否变化
          this.$router.push({
          path:'searchresult',
          query:{
            inputValue:this.inputValue
          }
        })
        this.oldInputValue = this.inputValue
      }
      else{
        return false
      }
      this.isShow = false//防止搜索后立刻出现历史记录框
    },
    tagToSearch(value){
      if(this.$store.state.device === 'Mobile'){
            this.$router.push({
            path:'msearchresult',
            query:{
              inputValue:value
            }
          })
      }
      this.$router.push({
      path:'searchresult',
      query:{
        inputValue:value
        }
      })
    },
    deleteTag(value){
      this.historyList = this.historyList.filter(item => item.value !== value)
      localStorage.setItem('searchHistory',JSON.stringify(this.historyList))
    },
    deleteHistory(){
      this.historyList = []
      localStorage.removeItem('searchHistory')
    }
  },
  watch:{
    isShow(newValue){
        if(newValue){
          document.addEventListener('click',this.closeHistory)
        }
        else{
          document.removeEventListener('click',this.closeHistory)
        }
      }
  },
  created() {
  //     document.addEventListener('click',(e)=>{
  //     if(this.$refs.showPanel){
  //         let isSelf = this.$refs.showPanel.contains(e.target)
  //         if(!isSelf){
  //             this.isShow = false
  //         }
  //     }
  // })
    if(JSON.parse(localStorage.getItem('searchHistory'))){
      this.historyList = JSON.parse(localStorage.getItem('searchHistory'))
    }
  },
}
</script>

<style scoped lang='scss'>
  .container{
    // width: 50%;
    height: 480px;
    min-height: 36%;
    margin-top: 6rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    .title{
      font-size: 3rem;
      font-weight: 800;
      margin-top: 2rem;
      opacity: 0.8;
      letter-spacing: -3px;
      // color: #263349;
      .banviewer{
        background: linear-gradient(135deg,#ec7785,#9ef3e9);
        margin-bottom: 0;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .introduction{
      width: 60%;
      height: 15%;
      font-size: 1.3rem;
      margin-top: 1rem;
      text-align: center;
      opacity: 0.8;
      color: #344767;
    }
    .search{
      width: 70%;
      height: 15%;
      background-color: rgba(255,255,255,0);
      border-radius: 999em;
      // margin-top: 2rem;
      position: relative;
      margin-top: -0px;
      padding: 0.2rem;
      .search-content{
        width: 90%;
        height: 45px;
        border: none;
        outline-style: none;
        font-size: 1.2rem;
        border-radius: 999em;
        padding-left: 1rem;
        background-color: rgba(255,255,255,0.3);
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
      background-color: rgba(255,255,255,0.6)
      }
      .searchHistory{
        width: 86%;
        max-width: 565px;
        height: 100px;
        border-radius: 0.75rem;
        margin-left: 3%;
        margin-top: 5px;
        display: block;
        background-color: rgba(255,255,255,0.6);
        transition: background-color .2s;
        transition-duration: 0.2s;
        transition-timing-function: ease;
        transition-delay: 0s;
        transition-property: background-color;
        position: relative;
        .el-icon-delete{
          position: absolute;
          top: 10px;
          right: 15px;
          // color: var(--regular-text);
          color: #b3b3b3;
        }
        .el-icon-delete{
          cursor: pointer;
        }
        .tag{
          margin: 0.8rem 0.2rem 0.4rem 1.2rem;
          border-radius: 0.5rem;
          background-color: var(--regular-color);
          color: var(--regular-text);
        }
        .tag:hover{
          cursor: pointer;
        }
      }
      // .search-content:focus ~.searchHistory{
      //   display: block;
      //   background-color: rgba(255,255,255,0.6);
      // }
    }
    // .search:focus .searchHistory{
    //   display: block;
    //   background-color: rgba(255,255,255,0.6);
    // }
  }
@media screen and (min-width:630px) and (max-width: 1550px){
  .container{
    width: 80%;
    height: 480px;
    justify-content: flex-start;
    .title{
      margin-top: 0rem;
      font-size: 2rem;
    }
    .search{
      width: 70%;
    }
  }
}
@media screen and (max-width: 920px){
  .container{
    .introduction{
      display: none;
    }
  }
}
@media screen and (max-width:630px){
  .container{
    justify-content: flex-start;
    .title{
      margin-top: 0rem;
      font-size: 2rem;
    }
    .introduction{
      display: none;
    }
    .search{
      width: 100%;
    }
  }
}
</style>
