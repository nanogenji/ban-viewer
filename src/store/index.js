import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentWeekNumber:0,
    tag:'',
    username:''
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
      console.log('actions'+JSON.parse(localStorage.getItem('isLogin')))
      if(JSON.parse(localStorage.getItem('isLogin'))){
        context.commit('GET_USERNAME',localStorage.getItem('username'))
      }
      else{
        context.commit('GET_USERNAME','')
      }
    }
  },
  modules: {
  }
})
