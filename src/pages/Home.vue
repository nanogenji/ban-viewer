<template>
  <div :class="{Home:true,dark:isDark,light:!isDark}">
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
        :img='item.images?item.images.large:"无图片"'
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
      apiError:'',
      doing:'',
      isDark:false
    }
  },
  components:{
    MainCard,
    WeekdayNavi
  },
  methods:{
    //doing排序
    compare(obj1, obj2){
      let val1 = obj1.collection.doing?obj1.collection.doing:0
      let val2 = obj2.collection.doing?obj2.collection.doing:0
      if(val1 < val2){
        return 1
      }
      else if(val1 > val2){
        return -1
      }
      return 0
    }
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
    },
    '$store.state.isDark':{
      handler:function(newValue){
        this.isDark = newValue
      }
    }
  },
  // beforeCreate(){
  // },
  //获取放送信息
  created(){
    this.isDark = JSON.parse(localStorage.getItem('isDark'))
    if(!localStorage.getItem('isLogin')){
      localStorage.setItem('isLogin',false);
    }
    axios.get('https://api.bgm.tv/calendar').then( //'http://localhost:8080/api/calendar'
      response => {
        this.items = response.data[0].items//默认星期数
        for(let i = 0;i < 7;i++){
          for(let j = 0;j < response.data[i].items.length;j++){//部分item没有collection.doing属性
            if(!response.data[i].items[j].collection){
              response.data[i].items[j].collection = {doing:0}
            }
          }
          response.data[i].items.sort(this.compare)//按doing人数排序
        }
        // console.log(response.data)
        // console.log(response.data[0].items.sort(this.compare))
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
    min-width: 350px;
    padding-bottom: 5rem;
    margin-top: -7.4rem;
    border-radius: 0.75rem;
    backdrop-filter: saturate(600%) blur(30px);
    // background-color: #fffc;
    background-color: var(--regular-background);
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
@media screen and (max-width:630px){
  .Home{
    width: 92%;
  }
}
</style>
