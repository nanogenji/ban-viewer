<template>
  <div id="app" :class="{dark:isDark,light:!isDark}">
    <Header></Header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <Footer></Footer>
    <el-backtop v-if="$store.state.device === 'PC'" :bottom="80" :right='80'></el-backtop>
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
    },
  },
  beforeCreate(){
    if(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
      // console.log('mobile')
      this.$store.dispatch('getDevice','mobile')
    }else{
      // console.log('PC')
      this.$store.dispatch('getDevice','PC')
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
  --regular-color:#ffecf1;
  --primary-background:#1a1a1a;
  --regular-background:#333;
  --secondary-background:#242424;
  --btn-background:#2f2f2f;
  --selection:#bf3d5e;
  --pure:#ffffff;
  --primary-text:#eee;
  --regular-text:#909399;
  --gradient:linear-gradient(50deg,#ffd0dad7,#ffecf1d5);
  --scrollbar-track-color:rgb(66, 66, 66);
  --scrollbar-thumb-color:rgb(104, 104, 104);
}
.light{
  --primary-color:#ff9ea6;
  --regular-color:#ffecf1;
  --primary-background:#f2f2f2;
  --regular-background:#fffc;
  --secondary-background:#fcfcfc;
  --btn-background:#f4f4f5;
  --selection:#79ffe1;
  --pure:#000000;
  --primary-text:#344767;
  --regular-text:#909399;
  --gradient:linear-gradient(50deg,#ffd0da,#ffecf1);
  --scrollbar-track-color:rgb(241, 241, 241);
  --scrollbar-thumb-color:rgb(193, 193, 193);
}
::selection{
  background-color: var(--selection);
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
/* html::-webkit-scrollbar {
  width: 10px;
}
html::-webkit-scrollbar-track {
  background: rgb(241, 241, 241);
  border-radius: 10px;
}
html::-webkit-scrollbar-thumb {
  background: rgb(193, 193, 193);
  border-radius: 10px;
}
html::-webkit-scrollbar-thumb:hover {
  background: rgb(168, 168, 168);
  border-radius: 10px;
}
html::-webkit-scrollbar-thumb:active {
  background-color: rgb(120, 120, 120);
  border-radius: 10px;
} */
</style>
