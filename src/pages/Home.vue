<template>
  <div class="Home">
    <div class="weekContainer">
      <WeekdayNavi/>
    </div>
    <div class="loading" v-if="this.totalData.length == []" v-loading='true' element-loading-text="正在加载中...请稍候"></div>
    <div class="loading" v-else-if="this.apiError">
      <el-alert
        title="加载错误...请稍后再试"
        type="error"
        effect="dark">
      </el-alert>
    </div>
      <div class="itemContainer">
        <MainCard v-for="item in items" :key='item.id'
        :id='item.id'
        :img='item.images.large'
        :name='item.name_cn?item.name_cn:item.name'
        :collection='item.collection'
        />
      </div>
  </div>
</template>
<script>
import MainCard from '../components/MainCard'
import WeekdayNavi from '../components/WeekdayNavi'
const axios = require('axios');
export default {
  name: 'Home',
  data(){
    return{
      items:[],
      current:0,//当前星期
      totalData:[],
      apiError:''
    }
  },
  components:{
    MainCard,
    WeekdayNavi
  },
  //更改星期数
  //$bus写法
  // mounted(){
  //   this.$bus.$on('getWeekNumber',(data)=>{
  //     this.current = data
  //     this.items = this.totalData.data[this.current].items//获取当前日期items
  //   })
  // },
  //Vuex写法
  watch:{
    '$store.state.currentWeekNumber':{
      handler:function(newValue){
        this.items = this.totalData.data[newValue].items
      }
    }
  },
  //获取放送信息
  created(){
    if(!localStorage.getItem('isLogin')){
      localStorage.setItem('isLogin',false);
    }
    axios.get('https://api.bgm.tv/calendar').then( //'http://localhost:8080/api/calendar'
      response => {
        console.log(response)
        this.items = response.data[0].items//默认星期数
        this.totalData = response
      },
      error => {
        this.apiError = error.message
        console.log(error.message)
      }
    )
  },
}
</script>

<style scoped lang='scss'>
  .Home{
    width: 75%;
    min-height: 1000px;
    padding-bottom: 5rem;
    margin-top: -7.4rem;
    border-radius: 0.75rem;
    background-color: #fff;
    backdrop-filter: saturate(600%) blur(30px);
    background-color: #fffc!important;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    align-items: center;
    .weekContainer{
      width: 100%;
      height: 8rem;
      margin-top: 0.6rem;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
    }
    .loading{
      width: 85%;
      min-height: 500px;
      //原生带有白色bgc
      /deep/.el-loading-mask{
        background-color: rgba(255,255,255,0);
      }
    }
        // .weekContent{
    //   width: 85%;
    //   min-height: 1000px;
    //   display: flex;
    //   flex-flow: column nowrap;
    //   justify-content: space-between;
    //   background-color: #000;
    //   .itemContainer{
    //     min-height: 1000px;
    //     display: flex;
    //     flex-flow: row wrap;
    //     justify-content: space-evenly;
    //   }
    //   .itemContainer{
    //     content: "";
    //     flex: auto;
    //   }
    // }
    .itemContainer{
      width: 85%;
      min-height: 1000px;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-evenly;
    }
    .itemContainer::after{
      content: '';
      width: 736px;
      // flex: auto;
    }
  }
</style>
