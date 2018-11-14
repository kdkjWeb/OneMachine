import Vue from 'vue';
import Vuex from 'vuex';;
Vue.use(Vuex)

//配置API接口地址
const API_ROOT = process.env.API_ROOT;

const state = {
  token: '',
  updateUrl: API_ROOT
}


export default new Vuex.Store({
    state: state,
    getters: {
      getToken: state=>state.token
    },
    mutations: {
        setToken(state,data){
          sessionStorage.token = data;
          state.token = data;
        }
    }
})
