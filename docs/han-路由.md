# 路由配置



1.因为siderbar中需要引用路由数据，来循环遍历路由，展示菜单，以前是路由写一个路由表，然后在siderBar页面中在写一个仅仅是菜单的路由。

重构后打算直接引用路由表中的路由。

所以将路由分为菜单路由（asyncRouter)和基本路由(baseRouter)。

route结构

asyncRoute

baseRoute



左侧menu中route数据来源分析

#### 1.组件siderbar传递数据:routes="allRoute"给子组件siderbarItem

- allRouter=>state.permission.<font color="red">**allRouter**</font>(permission是modules)

- permisson.js

  - mutations:

    SET_ROUTER:(state,allowedRouter)=>{
          state.allowedRouter=allowedRouter;   //权限路由
         <font color="red"> **state.allRouter**</font>=baseRouter.concat(allowedRouter);  //用于        渲染侧边栏
    }

  - <font color="red"> **state.allRouter **</font> 来自 <font color="blue"> **state.allRouter**</font>

#### 2.actions中的getAllowRouter()触发mutations中的SET_ROUTER

getAllowRouter()主要代码

```javascript
let allowedRouter = getRouters(store.getters.userRole);
commit('SET_ROUTER', allowedRouter);
```

可见数据来源于<font color="blue"> **allowedRouter**</font>

<font color="blue"> **allowedRouter**</font>来源于getRouters这个方法

#### 3.getRouters(store.getters.userRole)

store.getters.userRole这个参数是请求筛选（通过F_ID匹配）后的路由表的数据
store.getters.userRole来自API的getUserRole请求后commit('SET_USERROLE',r);
getUserRole中用到state.userInfo.F_ID，userInfo来自API的getUserInfo

getRouters中主要干了两件事

* setMenu2Hash(arrMenus);将返回的store.getters.userRole中的所有route变成hash路由结构
* hashMenus数组用来存储路径权限（0或1）
* findLocalRoute(asyncRouter);将本地路由与线上的路由做对比，将本地的route中的path，在hashMenus中是否为true来判断是否有权限显示该路由，最后将要显示的路由放在allowedRouter中返回

4.后台路由格式

```javascript
[{
    F_ID:1
    F_ParentId:0
    route:..
    routeName:..
},{
    F_ID:2
    P_ParentId:1
    route:..
    routeName:..
}]
```

要先处理转化为树结构

```js

//层级关系转树状图
export function buildMenu(array, ckey) {
  let menuData = [];
  let indexKeys = Array.isArray(array) ? array.map((e) => { return e.F_ID }) : [];
  ckey = ckey || 'F_ParentId';
  array.forEach(function (e, i) {
    //一级菜单
    if (!e[ckey] || (e[ckey] === e.F_ID)) {
      delete e[ckey];
      menuData.push(deepClone(e)); //深拷贝
    } else if (Array.isArray(indexKeys)) {
      //检测ckey有效性
      let parentIndex = indexKeys.findIndex(function (F_ID) {
        return F_ID === e[ckey];
      });
      if (parentIndex === -1) {
        menuData.push(e);
      }
    }
  });
  let findChildren = function (parentArr) {
    if (Array.isArray(parentArr) && parentArr.length) {
      parentArr.forEach(function (parentNode) {
        array.forEach(function (node) {
          if (parentNode.F_ID === node[ckey]) {
            if (parentNode.children) {
              parentNode.children.push(node);
            } else {
              parentNode.children = [node];
            }
          }
        });
        if (parentNode.children) {
          findChildren(parentNode.children);
        }
      });
    }
  };
  findChildren(menuData);
  return menuData;
}
```

路由权限

Login->调用dispatch->调用utils中的storage.js的方法setToken

在路由守卫中增加请求路由环节

getUserInfo->通过登录获取的token，获取用户详细信息，存储在userInfo中

getRoleInfo->根据userInfo中的ID去请求匹配的路由，存储在userRole中

getAllowRouter->然后跟本地的路由进行筛选->得到最终的路由，存储在allowRouter中





注意：

* 刷新路由丢失

```javascript
if (isLogin) {
      
        store.dispatch("admintor/getRoute").then(()=>{
          store.dispatch("admintor/getAllowedRoute")
          next() // hack方法 确保addRoutes已完成 ,
        });
        // next();
        
      }
else { next("/signin"); }
```

异步事件加载完再执行next()

* 刷新菜单高亮active丢失

`     <el-menu :default-active="$route.name" ...>`





