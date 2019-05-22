import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);
import admintor from "./modules/admintor"
import article from "./modules/article"
import user from "./modules/user"
import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"
// import VuexPersistence from 'vuex-persist'

// console.log(admintor.state.token)
// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage,
//   reducer: (state) => ({elemToken:admintor.state.token,roleInfo:admintor.state.roleInfo}), 
// })



export default new Vuex.Store({

modules:{
 admintor,
 article,
 user
},  

state,
getters,
mutations,
actions,

// plugins: [vuexLocal.plugin]

})