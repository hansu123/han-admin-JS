import axios from "axios";
import { Loading, Message } from "element-ui";
import {getToken,removeToken} from "@/utils/storage"
import router from "../router";

let loading;

function startLoading() {

  loading = Loading.service({
    lock: true,
    text: "拼命加载中",
    background: "rgba(0,0,0,0.7)"

  })
}  //配置loading

function closeLoading() {
  loading.close();
}


const service = axios.create({
  baseURL: process.env.BASE_API,
  // baseURL: process.env.BASE_API,
  timeout: 1000,
  withCredentials: true
});

service.defaults.withCredentials = true

service.interceptors.request.use((request) => {

  startLoading();

  let token = getToken();

  console.log(token)

  if (token) {
    request.headers.Authorization = token;
  }

  if(request.method=='post'){
    console.log(request.headers)
  }

  return request;//将请求返回给后台
}, (error) => {
  return Promise.reject(error)
});//请求拦截

service.interceptors.response.use((response) => {

  closeLoading();
  return response;//将响应返回给前台页面
}, (error) => {

  closeLoading();

  if (error.response.status == 401) {
    Message.error("token已过期请重新登录");
    removeToken()
    router.push("/")
  }

  return Promise.reject(error)
})



function get({ url, params = {} }) {
  console.log(url,params)
  return service({
    method: "GET",
    url,
    params
  })
}

function post({ url, data = {} }) {
  return service({
    method: "POST",
    url,
    data
  })
}

function _del({ url, data = {} }) {
  return service({
    method: "POST",
    url,
    data
  })
}


export { get, post }