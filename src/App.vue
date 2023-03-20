<template>
  <div id="app">
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
  components: {
    Header,
    Footer,
  },
}
</script>

<style>
body{
  margin: 0px;
}
#app {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
}
</style>
