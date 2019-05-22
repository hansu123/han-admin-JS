// import request from "@/utils/request";

import { post,get } from "@/utils/request";
//封装登录API

class AdminModel {
  async login(data) {
    let res=await post({
      url: "admin/login",
      data
    })
    return res
  }
  async GetRoutes(params){
    console.log(params)
    let res=await get({
      url:"route/routeList",
      params
    })
    return res
  }
}

export default new AdminModel

