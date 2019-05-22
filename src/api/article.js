// import request from "@/utils/request";

import { get, post, _del } from "@/utils/request"

//封装登录API

class ArticleModel {


  async GetList(params) {

    let res = await get({
      url: "article/articleList",
      // url:"article/list",
      params
    })

    return res
  }


  async DelArticle(params) {

    let res = await get({
      url: "article/articleDelete",
      params: { id: params }
    })
    return res;
  }

  async AddArticle(data, headers) {
    console.log(data, headers)
    let res=await post({
      url: "article/articleAdd",
      data,
      headers
    })
    return res;
  }


}

export default new ArticleModel()
