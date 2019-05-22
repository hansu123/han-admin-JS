import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import { getToken ,getUserInfo} from "@/utils/storage"
Vue.use(Router)

import asyncRoutes from "./asyncRouter"
import baseRoutes from "./baseRouter"

const router = new Router({
  routes: [...asyncRoutes, ...baseRoutes]
});

//路由守卫
router.beforeEach(

  (to, from, next) => {

    const isLogin = getToken();

    if (to.path == "/signin" || to.path == "/signup") {
      next();
    }
    else {
      if (isLogin) {
      
        store.dispatch("admintor/getRoute").then(()=>{
          store.dispatch("admintor/getAllowedRoute")
          next() // hack方法 确保addRoutes已完成 ,
        });
        // next();
        
      }
      else { next("/signin"); }
    }
  }
);

export default router;
