import axios from "axios";

import {Loading,Message} from "element-ui";

import router from "./router";

let loading;

function startLoading(){

loading=Loading.service({
lock:true,
text:"拼命加载中",
background:"rgba(0,0,0,0.7)"

})
}  //配置loading

function closeLoading(){
loading.close();
}

axios.interceptors.request.use((request)=>{
startLoading();
let token=localStorage.getItem("eleToken");
console.log(token)
if(token)
{
  request.headers.Authorization=token;
}

return request;//将请求返回给后台
},(error)=>{
return Promise.reject(error)    
});//请求拦截

axios.interceptors.response.use((response)=>{


closeLoading();



return response;//将响应返回给前台页面
},(error)=>{

closeLoading();
if(error.response.status==401){
Message.error("token已过期请重新登录");
localStorage.removeItem("eleToken");

router.push("/")

}

return Promise.reject(error)    
})

export default axios;