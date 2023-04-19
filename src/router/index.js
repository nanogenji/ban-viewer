import VueRouter from 'vue-router'
import Detail from '../pages/Detail'
import SearchResult from '../pages/SearchResult'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import HomeInfo from '../components/HomeInfo'
import Agreement from '../pages/Agreement'
import Profile from '../pages/Profile'
import Ranking from '../pages/Ranking'
import Recently from '../pages/Recently'
import Character from '../pages/Character'
import Person from '../pages/Person'
import Tags from '../pages/Tags'
import About from '../pages/About'
import mDetail from '../pages/mobile/mDetail'
import mSearchResult from '../pages/mobile/mSearchResult'
import mRanking from '../pages/mobile/mRanking'
import mTags from '../pages/mobile/mTags'
import mRecently from '../pages/mobile/mRecently'
import mCharacter from '../pages/mobile/mCharacter'
import mPerson from '../pages/mobile/mPerson'
import mSearch from '../pages/mobile/mSearch'
export default new VueRouter({
  routes:[
    {
      path:'/detail',
      component:Detail,
      meta:{
        scrollToMain:true
      }
    },
    {
      path:'/searchresult',
      component:SearchResult,
      meta:{
        scrollToMain:true
      }
    },
    {
      path:'/home',
      component:Home,
      meta:{
        scrollToTop:true
      }
    },
    {
      path:'/login',
      component:Login,
      meta:{
        scrollToMain:true
      }
    },
    {
      path:'/register',
      component:Register,
      meta:{
        scrollToMain:true,
        keepAlive:false
      }
    },
    {
      path:'/homeInfo',
      component:HomeInfo,
    },
    {
      path:'/ranking',
      component:Ranking,
      meta:{
        scrollToMain:true
      }
    },
    {
      path:'/agreement',
      component:Agreement,
      meta:{
        scrollToMain:true
      }
    },
    {
      path:'/profile',
      component:Profile,
      meta:{
        scrollToMain:true
      }
    },
    {
      path:'/recently',
      component:Recently,
      meta:{
        scrollToMain:true
      }
    },
    {
      path:'/character',
      component:Character,
      meta:{
        scrollToMain:true
      }
    },
    {
      path:'/person',
      component:Person,
      meta:{
        scrollToMain:true
      }
    },
    {
      path:'/tags',
      component:Tags,
      meta:{
        scrollToMain:true
      }
    },
    {
      path:'/about',
      component:About,
      meta:{
        scrollToMain:true
      }
    },
    {
      path:'/',
      redirect:'/home',
    },
    {
      path:'/mdetail',
      component:mDetail,
      meta:{
        scrollToMobile:true
      }
    },
    {
      path:'/msearchresult',
      component:mSearchResult,
      meta:{
        scrollToMobile:true
      }
    },
    {
      path:'/mranking',
      component:mRanking,
      meta:{
        scrollToMobile:true
      }
    },
    {
      path:'/mtags',
      component:mTags,
      meta:{
        scrollToMobile:true
      }
    },
    {
      path:'/mrecently',
      component:mRecently,
      meta:{
        scrollToMobile:true
      }
    },
    {
      path:'/mcharacter',
      component:mCharacter,
      meta:{
        scrollToMobile:true
      }
    },
    {
      path:'/mperson',
      component:mPerson,
      meta:{
        scrollToMobile:true
      }
    },
    {
      path:'/msearch',
      component:mSearch,
      meta:{
        scrollToMobile:true
      }
    }
  ],
  scrollBehavior(to, from, savedPosition){
    if (savedPosition) {//返回之前的原位置
      // savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
      return savedPosition
    }
    // eslint-disable-next-line
    else {
      const position = {}
      if (to.hash) {//如果路径中有哈希值，就采用锚点定位
        position.selector = to.hash
      }
      if (to.matched.some(m => m.meta.scrollToMain) && to.path !== from.path) {//元信息筛选+避免重复刷新
        position.x = 0
        position.y = 480
        //smooth
        position.behavior = "smooth"
      }
      if (to.matched.some(m => m.meta.scrollToTop) && to.path !== from.path) {
        position.x = 0
        position.y = 0
        position.behavior = "smooth"
      }
      if (to.matched.some(m => m.meta.scrollToMobile) && to.path !== from.path) {
        position.x = 0
        position.y = 280
        position.behavior = "smooth"
      }
     //如果返回一个 falsy (假的值)，或者是一个空对象，那么不会发生滚动。
      return position
    }
  },

})