<template>
  <div class="header">
    <Navigator></Navigator>
    <HomeInfo></HomeInfo>
  </div>
</template>

<script>
import Navigator from './Navigator'
import HomeInfo from './HomeInfo'
export default {
  name:'Header',
  components:{
    Navigator,
    HomeInfo
  }
}
</script>

<style>
  .header{
    width: 100%;
    height: 700px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    /* background: linear-gradient(141deg,#ff7e7a,#ffffff); */
    /* background: linear-gradient(50deg,#ff7e7a,#ffffff); */
    /* background: linear-gradient(50deg,#ffd0da,#fdf7f9); */
    background: var(--gradient);
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.2);
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }
</style>