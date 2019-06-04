#数据交互

### 一. 原始方式

http.js

```javascript
import axios from "axios"
axios.interceptors.request.use((requset)=>{
...
})
axios.interceptors.response.use((response)=>{   
...
})
```

main.js

```javascript
import axios from "./http"
Vue.prototype.axios=axios
```

组件中使用

```javascript
this.axios.get().then()
```

### 二. 第一种封装方式

由request文件封装请求拦截和响应拦截，并使用axios.create来封装接口

api写请求的接口，并配置相关参数

页面引用api文件，调用api方法

#### 1.请求拦截

request.js

```javascript
import axios from "axios"
const service=axios.create({
...
})
server.interceptors.request.use((requset)=>{
...
})
server.interceptors.response.use((response)=>{
...    
})
export default service
```

Api

```javascript
import request from ".."
export function getInfo(params){
    return request({
        url:"",
        method:"",
        params
    })
}
```

actions中使用

- promise版本

```javascript
import {getInfo} from ""
GetInfo(){
   return new Promise((resolve,reject)=>{
       getInfo().then((res)=>{
           ....;
           resolve();
       })
   }) 
}
```

- async版本

```javascript
import {getInfo} from ""
async GetInfo(){
      let data= getInfo();
      ....
}
```

组件直接调用

```javascript
import {getInfo} from ""
getInfo().then()
```

#### 2.请求方式

##### 2.1get:

params:{id:1}

##### 2.2post:

data:formData  /formData是json字符串

##### 2.3传文件和数据post的封装

```javascript
let { title, cate, summary, content } = this.ruleForm;
formData.append("file", file.raw);
formData.append("title", title);
formData.append("cate", cate);
formData.append("summary", summary);
formData.append("content", marked(content));

let config={headers:{ "Content-Type": "multipart/form-data" }}
AddArticle(formData, config)
```

api

```javascript
export function AddArticle(data,headers){
  console.log(data,headers)
  return request({
    url:"article/articleAdd",
    method:"post",
    data,
    headers
  })
}
```

### 三. 第二种封装方式

#### 进一步封装get,post

request.js

```javascript
import axios from "axios"
const service=axios.create({
...
})
server.interceptors.request.use((requset)=>{
...
})
server.interceptors.response.use((response)=>{
...    
})

function get({url,params={}}){
    return service({
        url,
        method:"GET",
        params
    })
}
function post({url,data={}}){
    return service({
        url,
        method:"POST",
        data
    })
}
export {get,post}
```

Api

```javascript
import {get,post} from ".."
export function getInfo(params){
    return get({
        url:"",
        params
    })
}
```

```javascript
import {get,post} from ".."
export function getInfo(data){
    return post({
        url:"",
        data
    })
}
```

### 四. 第三种封装方式—创建Model类

Model

```javascript
import {get,post} from ".."
class Model{
   async getInfo(params){
    let res=get({
        url:"",
        params
    })
    return res;
    } 
    ....
}
export default new Model()
```

actions中使用

- async版本

```javascript
import {Model} from ""
async GetInfo(){
      let data= await Model.getInfo();
      ....
}
```

组件直接调用

```javascript
import {Model} from ""
Model.getInfo().then()
```

### 五. 小程序的封装







