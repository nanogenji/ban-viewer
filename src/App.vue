<template>
  <div id="app" :class="{dark:isDark,light:!isDark}">
    <Header></Header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <Footer></Footer>
    <el-backtop :bottom="80" :right='80'></el-backtop>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  data(){
    return{
      isDark:false
    }
  },
  components: {
    Header,
    Footer,
  },
  watch:{
    '$store.state.isDark':{
      handler:function(newValue){
        //获取root元素
        const root = document.querySelector(':root');
        this.isDark = newValue
        if(this.isDark){
          root.style.setProperty('color-scheme', 'dark');
        }
        else{
          root.style.setProperty('color-scheme', 'light');
        }
      }
    }
  },
  created() {
    this.isDark = JSON.parse(localStorage.getItem('isDark'))
  },
}
</script>
<style>
/* :root{
  color-scheme: dark;
  filter: invert(1);
} */
.dark{
  --primary-color:#eb9199;
  --primary-background:#1a1a1a;
  --regular-background:#333;
  --secondary-background:#242424;
  --btn-background:#2f2f2f;
  --pure:#ffffff;
  --primary-text:#eee;
}
.light{
  --primary-color:#ff9ea6;
  --primary-background:#f2f2f2;
  --regular-background:#fffc;
  --secondary-background:#fcfcfc;
  --btn-background:#f4f4f5;
  --pure:#000000;
  --primary-text:#344767;
}
body{
  margin: 0px;
}
#app {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-background);
}
</style>
