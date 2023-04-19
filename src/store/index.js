import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentWeekNumber:0,
    tag:'',
    username:'',
    isDark:false,
    device:'PC'
  },
  getters: {
  },
  mutations: {
    GET_WEEKNUMBER(state,value){
      state.currentWeekNumber = value
    },
    GET_TAG(state,value){
      state.tag = value
    },
    GET_USERNAME(state,value){
      state.username = value
    },
    GET_ISDARK(state){
      state.isDark = !state.isDark
      localStorage.setItem('isDark',state.isDark)
    },
    GET_DIVICE(state,value){
      if(value === 'mobile'){
        state.device = 'Mobile'
      }
      else{
        state.device = 'PC'
      }
    }
  },
  actions: {
    getWeekNumber(context,value){
      context.commit('GET_WEEKNUMBER',value)
    },
    getTag(context,value){
      context.commit('GET_TAG',value)
    },
    getUsername(context){
      if(JSON.parse(localStorage.getItem('isLogin'))){
        context.commit('GET_USERNAME',localStorage.getItem('username'))
      }
      else{
        context.commit('GET_USERNAME','')
      }
    },
    getIsDark(context){
      context.commit('GET_ISDARK')
    },
    getDevice(context,value){
      context.commit('GET_DIVICE',value)
    }
  },
  modules: {
  }
})
