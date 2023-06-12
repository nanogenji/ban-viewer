<template>
  <div class="week">
    <!-- pc -->
    <ul class="weekbar" v-if="$store.state.device === 'PC'">
      <li @click="weekNumber(0)" :class="this.current == 0?'active weekbarItem':'weekbarItem'">星期日</li>
      <li @click="weekNumber(1)" :class="this.current == 1?'active weekbarItem':'weekbarItem'">星期一</li>
      <li @click="weekNumber(2)" :class="this.current == 2?'active weekbarItem':'weekbarItem'">星期二</li>
      <li @click="weekNumber(3)" :class="this.current == 3?'active weekbarItem':'weekbarItem'">星期三</li>
      <li @click="weekNumber(4)" :class="this.current == 4?'active weekbarItem':'weekbarItem'">星期四</li>
      <li @click="weekNumber(5)" :class="this.current == 5?'active weekbarItem':'weekbarItem'">星期五</li>
      <li @click="weekNumber(6)" :class="this.current == 6?'active weekbarItem':'weekbarItem'">星期六</li>
    </ul>
    <!-- mobile -->
    <ul class="weekbar" v-if="$store.state.device === 'Mobile'">
      <li @click="weekNumber(0)" :class="this.current == 0?'active weekbarItem':'weekbarItem'">周日</li>
      <li @click="weekNumber(1)" :class="this.current == 1?'active weekbarItem':'weekbarItem'">周一</li>
      <li @click="weekNumber(2)" :class="this.current == 2?'active weekbarItem':'weekbarItem'">周二</li>
      <li @click="weekNumber(3)" :class="this.current == 3?'active weekbarItem':'weekbarItem'">周三</li>
      <li @click="weekNumber(4)" :class="this.current == 4?'active weekbarItem':'weekbarItem'">周四</li>
      <li @click="weekNumber(5)" :class="this.current == 5?'active weekbarItem':'weekbarItem'">周五</li>
      <li @click="weekNumber(6)" :class="this.current == 6?'active weekbarItem':'weekbarItem'">周六</li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'WeekdayNavi',
  data(){
    return{
      current:0,
    }
  },
  methods:{
    //获取星期数
    //$bus写法
    // weekNumber(n){
    //   this.current = n;
    //   console.log(this.current)
    //   this.$bus.$emit('getWeekNumber',this.current)
    // }
    //Vuex写法
    weekNumber(week){
      this.current = week
      this.$store.dispatch('getWeekNumber',week)
    }
  }
}
</script>

<style lang='scss' scoped>
  .week{
    height: 130px;
    width: 65%;
    z-index: 999;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    .weekbar{
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      align-items: center;
      height: 70%;
      width: 90%;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      border-radius: 0.5rem;
      backdrop-filter: saturate(200%) blur(30px);
      background-color: var(regular-background);
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .weekbarItem{
        width: 12%;
        height: 52%;
        display: flex;
        align-items: center;
        justify-content: center;
        list-style:none;
        cursor:pointer;
        color: var(--primary-text);
        border-radius: 999rem;
      }
      .weekbarItem:hover{
        // color: #fff;
        // background-color: #ffbebc;
        color: var(--primary-color);;
        // background-color: var(--regular-color);
        transition-duration:0.2s;
      }
      .active{
        // color: #fff;
        // background-color: #ffbebc;
        color: var(--primary-color);
        background-color: var(--regular-color);
        transition-duration:0.2s;
      }
    }
  }
@media screen and (max-width:620px){
  .week{
    width: 90%;
    height: 100px;
    .weekbar{
      .weekbarItem{
        height: 90%;
        text-align: center;
      }
    }
  }
}
</style>