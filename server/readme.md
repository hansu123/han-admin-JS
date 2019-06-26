





![](https://hansu-1253325863.cos.ap-shanghai.myqcloud.com/newblog/markdown/vue/admin.png)

[passport-jwt官网](https://www.npmjs.com/package/passport-jwt)



一个小坑：查询到的token必须加上前缀`Bearer`,这样再次请求就可以拿到数据了



axios的post遇到一点小坑

[axios官方文档]([https://www.kancloud.cn/yunye/axios/234845](https://www.kancloud.cn/yunye/axios/234845))



首先用户进行登录，后台匹配用户名和密码，如果在数据库中找到对应的账号和密码，就创建一个token，并将token返回给客户端。如果在数据库中匹配不到则返回提示用户信息错误。



如何在服务端设置token

jwt



客户端拿到token之后，我们需要每次向服务端发送请求的时候都必须要携带token。一种方案是使用cookie传值，但是cookie不能解决跨域问题，于是我们就在请求头中添加authorization，来解决这一问题。

但是拿到的token存在哪呢？我们可以使用本地存储，将token放在localStorage中，随取随用。

所以我们可以做一个请求拦截，在请求头中加入存储在localStorage中的token

```javascript
request.headers.Authorization=localStorage.getItem("token")
```

本地存储还有一个好处是，我们可以根据localstorage中是否存在这样的token，做一个路由守卫，后台请求我们可以验证token，但对于前后端分离的项目来说前台路由的跳转是不经过后台的，这个时候验证本地token确实是一个很棒的选择。



这样每次请求之后就会携带token了，那后台拿到token后如何解析呢？

后台如何验证token

使用passport/passport-jwt

1.初始化

```
//引入passport
const passport = require("passport");
//初始化
server.use(passport.initialize());
```

2.配置(一些配置官网上都有)

```javascript
//passport配置
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';//密钥

//验证token中的信息
passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {
console.log(jwt_payload);
AdminModel.findOne({name:jwt_payload.name}).then(result=>{
if(result){
    return done(null,result);
}
else{
    return done(null,false);
}})
}));
```

3.这样我们就可以在后台的每一个请求中调用，相当于增加了一层拦截。只有验证通过才能继续操作。

```javascript
router.get("地址",passport.authenticate("jwt",{session:false}),(req,res)=>{
.....
})
```



token过期时间的处理，逻辑就是通过判断当前时间戳与设置时间和过期时间进行比较，如果在范围内则没有过期，否则就是过期，并返回401.

```javascript
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
           let time = Math.round(Date.now() / 1000); //获取当前时间戳
           if (time >= jwt_payload.iat && time <= jwt_payload.exp) {
               AdminModel.findOne({
                   name: jwt_payload.name
               }).then(result => {
                   if (result) {
                       return done(null, result);
                   } else {
                       return done(null, false);
                   }
               })
           } else {        
               return done(null, false);
           }
}));
```

当状态码为401时，我们需要提醒用户，可以在响应拦截中告知用户。

```javascript
if(error.response.status==401){
Message.error("token已过期请重新登录");
localStorage.removeItem("eleToken");
router.push("/")
}
```

解析token





退出登录

* 清除本地localStorage中的token
* 跳转到登录页面





























regist发送注册请求后台

1.配置axios

`npm i axios -S`

```javascript
import axios from "axios"
Vue.prototype.axios=axios
```

使axios变成Vue原型对象上的方法,这样每一个实例对象都可以直接调用该方法

2.配置跨域访问

客户端->服务端 axios

```javascript
axios.defaults.withCredentials=true;
```

服务端->客户端 cors

```javascript
const cors=require("cors");
server.use(cors({
    origin: ["http://127.0.0.1:8080", "http://localhost:8080"], credentials: true
}));
```

3.axios对于post请求处理

需要将数据转化为字符串才能发送请求

这里需要安装qs模块

`npm i qs -S`

```javascript
import qs from "qs"
Vue.prototype.qs=qs
```

使用qs的静态方法qs.stringify({options})，来处理json数据

```javascript
let url="http://127.0.0.1:3000/admin/regist";
    let $name=this.ruleForm.name;
    let $email=this.ruleForm.email;
    let $pass=this.ruleForm.pass;
    let $identity=this.ruleForm.region;
    let formData=this.qs.stringify({
    name:$name,
    email:$email,
    pass:$pass,
    identity:$identity
    })
    this.axios.post(url,formData).then((result)=>{
    console.log(result)
})
```

注册返回信息处理

axios:响应拦截和请求拦截

```javascript
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
return request;//将请求返回给后台
},(error)=>{
return Promise.reject(error)    
});//请求拦截

axios.interceptors.response.use((response)=>{
closeLoading();
return response;//将响应返回给前台页面
},(error)=>{
return Promise.reject(error)    
}) //响应拦截
export default axios;
```



#### 存储token

登录校验成功后，拿到服务端返回的token并将其存储到localStorage中

```javascript
const {token}=result.data;
localStorage.setItem("eleToken",token);
this.$router.push('/home');
```

#### 路由守卫

用户A想访问home主页，如何判断其状态。通过第一次登录成功后返回在本地存储的token

```javascript
router.beforeEach(
(to,from,next)=>{
const isLogin=localStorage.getItem("eleToken");//查看本地是否存有token
if(to.path=="/signin"||to.path=="/signup"){
next();//访问登录注册正常跳转
}
else{
if(isLogin){next();}//访问其他页面必须验证通过，否则返回到登录页面
else{next("/signin");}
}
}
);
export default router;
```

如何保存token

解析token

```javascript
import dejwt from "jwt-token"
let myToken=dejwt(token);
```





### 页面制作：

路由嵌套

* children中的component别加s
* children中的path要加“/"

以上两点折磨的我差点砸电脑

#### HOME

1.echarts的使用

* 引入：

```javascript
let echarts=require("echarts")
```

* 初始化(在mounted中，因为此时渲染了dom)

```javascript
echarts.init(document.getElementById(elem)).setOption(this.option);
```

* 配置直接去官网上看[Echar插件](https://www.echartsjs.com) ，将option放在vue中的data中

```
left:'center'//标题居中
x:"center" //标题居中
```





#### siderbar

高度自适应浏览器窗口

```css
calc(100vh - 10px)  表示整个浏览器窗口高度减去10px的大小
calc(100vw - 10px)   表示整个浏览器窗口宽度减去10px的大小
```



#### 表单制作：

table使用组件

dialog组件添加到public



#### 添加文章

markdown编辑器的使用

[mavonEditor插件](https://github.com/hinesboy/mavonEditor)

#### 添加数据:





#### 删除数据：

* 删除按钮点击时会传递当前这一行的所有数据，然后将数据中的_id值作为get的参数和删除时在数组中查找的依据
* axios成功得到响应时，遍历数组，
  * 方案一：找到_id等于传入的 _id的那一组对象，使用数组方法splice完成删除，ok
  * 方案二：后台返回新的数据集，这样不用手动删除也可以即使更新信息

```javascript
handleDelete(data) {
      let url = "http://localhost:3000/article/articleDelete?id=" + data._id;
      this.axios
        .get(url)
        .then(res => {
          this.allTableData = res.data;
          this.pagination.total = res.data.length;
          this.setPage();
          this.$message({
            message: "删除成功",
            type: "success"
          });
        })
        .catch(err => {
          throw err;
   });
},
```

优化：

删除之前需要重新确认，但是这个思路我一直在dialog中纠结了好久，好吧，我错了直到我看到了elementui中的弹框，瞬间就写了出来

```javascript
 handleDelete(data) {
        this.$confirm('此操作将永久删除文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        放入删除操作
        })
        .catch(err => {
          throw err;
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
},
```



#### 数据分页

思路，还是使用分桶法（自己取的名）就是根据pageSize，然后用总的数据的索引和pageSize比较，索引小于pageSize的都放到一个容器中，然后用这个容器取循环数据。

当点击分页数的时候改变pageSize，再去调用setPage函数实现数据更新

当点击页码跳转的时候传入页码数，再去调用setPage函数实现数据更新

自己的写法

```javascript
setPage() {
      this.userData=[];
      let size=this.pagination.pageSize;
      let max=(this.pagination.pageIndex)*size;
      let min=(this.pagination.pageIndex-1)*size;
      this.pagination.total=this.allUserData.length;
      this.allUserData.forEach((elem, i) => {
        if (i>=min&&i<max) {
          this.userData[i] = elem;
      }
      });
}
```

遇到了一个小bug，看了半天才发现，`this.userData[i]`这里的i在第一页显示没问题，但是到了第二页这个i不再是从0开始，而是从`(pageSize-1)`开始，想了一下做个判断即可，取pageSize的模，为0则重置k

```javascript
  setPage() {
      this.userData=[];
      let size=this.pagination.pageSize;
      let max=(this.pagination.pageIndex)*size;
      let min=(this.pagination.pageIndex-1)*size;
      this.pagination.total=this.allUserData.length;
      let k=0;
      this.allUserData.forEach((elem, i) => {
       console.log(i,min,max)
        if (i>=min&&i<max) {
          if(k%size==0){console.log("ok")}
          this.userData[k] = elem;
          k++;
          console.log(k)
      }
      });
}
```

别人的写法(看了别人的写法，是分两个函数，分别定义，觉得也挺不错的，主要性能上提升比我好)

* 传入pageSize函数

使用了数组过滤的写法（学习一下）

```javascript
this.userData=[];
      let size=this.pagination.pageSize;
      this.pagination.total=this.allUserData.length;
      this.userData=this.allUserData.filter((elem, i) => { 
      return i<paesize 
});
```

* 跳转页码函数

```javascript
let this.userData=[];
let size=this.pagination.pageSize;
let max=(this.pagination.pageIndex)*size;
let min=(this.pagination.pageIndex-1)*size;
for(var j=0;min<max;j++ ){
this.userData[j]=this.allUserData[min]  
}
```

#### 数据修改

* 创建一个编辑对话框


* 点击编辑会得到这一行所有数据信息，然后将数据动态绑定传给对话框
* 对话框编辑之后，提交后台完成更新

[mongoose使用详解]([https://segmentfault.com/a/1190000008245062](https://segmentfault.com/a/1190000008245062))

#### markdown的整合

##### 富文本编辑器

##### marked解析markdown

`import marked from 'marked';`

```javascript
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

```

#### 优化

##### dialog的改进

dialog关闭按钮没有点击函数，导致无法动态传递outVisible，想法是写入watch监听每一次outVisible的变化，只要为false就执行动态传值。

```javascript
watch:{
outerVisible(newname,oldname){
if(!newname){this.handleStatus()}
}
}
```



#### vue中图片上传问题

主要代码如下：其实和ajax上传很类似，

* 主要是图片获取上有点不同

ajax:document.getElementById(..).files[0];

vue:this.$ref.upload.uploadFiles[0];

* 还有formData赋值的时候

ajax:formData.append("img",file);

vue:fomrData.append("file",file.raw);

```javascript
submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formData = new FormData();
          let file = this.$refs.upload.uploadFiles[0];
          let headerConfig = {
            headers: { "Content-Type": "multipart/form-data" }
          };
          if (!file) {
            // 若未选择文件
            this.message({
            message:"请添加文件",
            type:"warning"  
            });
            return;
          }
          let { title, cate, summary, content } = this.ruleForm;
          formData.append("file", file.raw);
          formData.append("title", title);
          formData.append("cate", cate);
          formData.append("summary", summary);
          formData.append("content", marked(content));

          this.axios
            .post(
              "http://localhost:3000/article/articleAdd",
              formData,
              headerConfig
            ).then((result) => {
              if (result.data.message == ok) {
                console.log(res)
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
              }
 })}
```





vuex数据刷新丢失解决



添加计算属性，如果数据丢失就从localStorage里拿

```javascript
computed:{
isUsername(){
let username=this.$store.state.name;
if(username==""||username===undefined){
username=localStorage.getItem("name")
}
return username;
}  
},
```



