import { SET_USER } from "../mutation_type"
import userModel from "../../api/user"

const user = {
  namespaced: true,
  state: {
    userList: []
  },
  getters: {
    userList(state) {
      return state.userList
    }
  },
  mutations: {
    [SET_USER](state, payload) {
      state.userList = payload;
    }
  },
  actions: {
    //  getUser({ commit }) {
    //   return new Promise((resovle,reject)=>{
    //     GetUser().then(res=>{
    //       let d=res.data;
    //       commit(SET_USER, d);
    //       resovle()
    //     });
    //   }) 
    // }

    async getUser({ commit }) {
      let d = await userModel.GetUser();
      commit(SET_USER, d.data);
    }
  },
}
export default user;