import { SET_TOKEN, SET_ROLEINFO, SET_ROLEROUTE,SET_ROUTE } from "../mutation_type";
import adminModel from "../../api/admintor";
import dejwt from 'jwt-decode'
import { setToken, setUserInfo, getUserInfo } from "@/utils/storage"
import { emitTree, handleTreeData } from "@/utils/index"
import asyncRouter from "@/router/asyncRouter"
import store from "@/store/store"

const admintor = {
  namespaced: true,
  state: {
    token: localStorage.getItem("eleToken"),
    roleInfo: JSON.parse(localStorage.getItem('roleInfo')),
    roleRoute: undefined,
    allRoute:undefined
  },
  getters: {

  },
  mutations: {
    [SET_TOKEN](state, token) {
      state.token = token;
      setToken(token)
    },
    [SET_ROLEINFO](state, myToken) {
      console.log(myToken)
      state.roleInfo = myToken;
      setUserInfo(myToken)
    },
    [SET_ROLEROUTE](state, route) {
      state.roleRoute = route;
    },
    [SET_ROUTE](state, route) {
      state.allRoute = route;
    },


  },
  actions: {
    async checkLogin({ commit }, payload) {

      let d = await adminModel.login(payload);
      const { token } = d.data;

      let myToken = dejwt(token);
      commit(SET_TOKEN, token);
      commit(SET_ROLEINFO, myToken);

    },
    async getRoute({ commit }) {
      let { identity } = JSON.parse(getUserInfo());
      let d = await adminModel.GetRoutes({ identity })
   
      // let treeRoutes = emitTree(d.data, 'R_ID', 'R_PID')
      commit(SET_ROLEROUTE, d.data)
    },
    async getAllowedRoute({commit}){
      let finalRoutes = getFinalRoute(store.getters.roleRoute)
      console.log(finalRoutes)
      commit(SET_ROUTE, finalRoutes)
    }
  }
}

function getFinalRoute(routes) {
console.log(routes)
  // let localRoutes=handleTreeData(asyncRouter) 
  // console.log(localRoutes)
  let firstRouters=routes;
  let allowedRouter=[]
  let findLocalRoute = function(array, base) {
    let replyResult = [];
    array.forEach(function(route) {
      
      if (compareRouter(firstRouters,route)){
        if (Array.isArray(route.children)) {
          route.children = findLocalRoute(route.children, route.path);
        };
        replyResult.push(route);
      }
    });
    if (base) {
      return replyResult;
    } else {
      allowedRouter = allowedRouter.concat(replyResult);
    }
  };
  findLocalRoute(asyncRouter);
  
  return allowedRouter;

  function compareRouter(routes, val) {
    let isRouter = routes.filter((route) => {
      return route.route == val.name
    })
    return isRouter.length ? true : false
  }


}

export default admintor;