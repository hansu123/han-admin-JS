# Vuex

### 一.起步

*   [vuex官方文档](<https://vuex.vuejs.org/zh/>)
*   [vuex知识补充](<https://www.cnblogs.com/yaowen/p/8927343.html>)


### 二.State

#### 2.1注册

```javascript
state:{
    count:0
}
```

#### 2.2用法:

直接使用：this.$store.state.(count)  //任意位置可使用

map：(count) //存放在computed中，任意位置可使用

#### 2.3辅助函数

mapState:就是封装好的一个函数，返回的是对象，一般有下面两种用法

- 取别名

  ```javascript
  computed:{
  ...mapState({
  getCount:(state)=>{return state.count}
  })
  } 
  ```

- 相同名称

  ```javascript
  computed:{
  ...mapState({
  count:'count'
  })
  }
  =>可以简写为
  computed:{
  ...mapState(['count'])
  }
  ```

### 三.Getters

#### 2.1注册

```javascript
getters:{
    filterCount(state){
        return state.count
    }
}
```

> 别忘了写 state

#### 2.2用法:

直接使用：this.$store.getters.filterCount  //任意位置可使用

map：(filterCount) //存放在computed中，任意位置可使用

#### 2.3辅助函数

mapGetters:就是封装好的一个函数，返回的是对象，一般有下面两种用法

- 取别名

  ```javascript
  computed:{
  ...mapGetters({
  getFilterCount:'filterCount'
  })
  } 
  ```

- 相同名称

  ```javascript
  computed:{
  ...mapState({
  filterCount:'filterCount'
  })
  }
  =>可以简写为
  computed:{
  ...mapState(['filterCount'])
  }
  ```

组件调用

`{{filterCount}}`

实例中调用

`this.filterCount`

### 四.Mutations:

#### 4.1注册

```javascript
mutations:{
    increment(state){
        state.count++;
    }
}
```

#### 4.2传参

- 载荷方式：

直接使用：this.$store.commit("increment",{参数1:value}) 

map：this.$store.commit({参数1:value})

```javascript
this.$store.commit("increment",{num:1}) 

mutations:{
    increment(state,payload){
        console.log(payload) //{num:1}
        state.count+=payload.num;
    }
}
```

- 对象方式

直接使用：this.$store.dispatch({type:"Increment",参数1:000value}) 

map：this.myIncrement({type:"Increment",参数1:000value})

```javascript
this.$store.commit({type:"increment",num:1}) 

mutations:{
    increment(state,payload){
        console.log(payload) //{type:"increment",num:1}
        state.count+=payload.num;
    }
}
```

#### 4.3辅助函数

mapMutations:就是封装好的一个函数，返回的是对象，一般有下面两种用法

- 取别名(使用于传递参数)

  ```javascript
  methods:{
  ...mapMutations({
  getCount:‘increment’
  })
  } 
  ```

- 相同名称(适用于不必传递参数)

  ```javascript
  methods:{
  ...mapMutations({
  increment:'increment'
  })
  }
  =>可以简写为
  methods:{
  ...mapMutations(['increment'])
  }
  ```

#### 4.4使用

* 直接使用

```javascript
methods:{
mutationsA(){
this.$store.commit({type:"increment",num:1})    
}
}
```

组件中调用

```HTML
<button @click="mutationsA">增加</button>
```

* map调用

```javascript
import {mapMutations} from "vuex"
methods:{
...mapMutations(['increment']),
mutationsA(){
this.increment({type:"increment",num:1})    
}
}
```

组件中调用

```HTML
<button @click="mutationsA">增加</button>
```

#### 4.5常量替代

* 新建mutation-types.js

```
export const SET_STUDENTINFO='SET_STUDENTINFO'
```

* 引入

```javascript
import {SET_STUDENTINFO} from './mutation-types.js
```

* 替换

```javascript
[SET_STUDENTINFO](state){
    ....
}
```

* 调用

```javascript
this.$store.commit(SET_STUDENTINFO)
```

### 五.Actions:

主要处理异步函数，比如请求数据

#### 5.1注册

接收一个上下文对象，来调用state，getter，commit

```javascript
actions:{
    myIncrement(ctx){
        ctx.state.count; //调用state
        ctx.getters.getCount; //调用getters
        ctx.commit("increment") //调用mutations
    }
}
```

参数结构，因为上文提到ctx，调取commit的时候是ctx.commit说明commit是ctx中的一个方法，那么我们可以使用参数解构。怎么更好的理解：

ex:(不涉及this改变的情况下)

```javascript
var student={
    sing(){
        console.log("hello")
    }
}
student.sing() //hello
```

=>

```javascript
var student={
    sing(){
        console.log("hello")
    }
}
var {sing}=student
sing() //hello
```

这下应该理解了吧，所以我们可以写成下面这样

```javascript
actions:{
    myIncrement({commit}){
        commit("increment") //调用mutations
    }
}
```

#### 5.2传参

* 载荷方式：

直接使用：this.$store.dispatch("myIncrement",{参数1:value}) 

map：this.$store.dispatch({参数1:value})

```javascript
this.$store.dispatch("myIncrement",{num:1}) 
actions:{
    myIncrement({commit},payload){
        console.log(payload) //{num:1}
        commit("increment") //调用mutations
    }
}
```

* 对象方式

直接使用：this.$store.dispatch({type:"myIncrement",参数1:000value}) 

map：this.myIncrement({type:"myIncrement",参数1:000value})

```javascript
this.$store.dispatch({type:"myIncrement",num:1}) 
actions:{
    myIncrement({commit},payload){
        console.log(payload) //{type:"myIncrement",num:1}
        commit("increment") //调用mutations
    }
}
```

#### 5.3辅助函数

mapActions:就是封装好的一个函数，返回的是对象，一般有下面两种用法

- 取别名(使用于传递参数)

  ```javascript
  methods:{
  ...mapActions({
  getMyInCrement:'myIncrement’
  })
  } 
  ```

- 相同名称(适用于不必传递参数)

  ```javascript
  methods:{
  ...mapActions({
  myIncrement:'myIncrement'
  })
  }
  =>可以简写为
  methods:{
  ...mapActions(['myIncrement'])
  }
  ```

#### 5.4使用

- 直接使用

```javascript
methods:{
actionsA(){
this.$store.patch({type:"myIncrement",num:1})    
}
}
```

组件中调用

```HTML
<button @click="actionsA">增加</button>
```

- map调用

```javascript
import {mapMutations} from "vuex"
methods:{
...mapActions(['myIncrement']),
actionsA(){
this.myIncrement({type:"myIncrement",num:1})    
}
}
```

组件中调用

```HTML
<button @click="actionsA">增加</button>
```

#### 5.5 组合actions

我们都知道actions是异步的，有时候我们会有这样的需求，在执行完一个actions之后，需要再执行另一个actions或者是异步请求，有点类似之前回调地狱的那种请求，那个时候我们解决的办法是将异步请求封装在promise中，这里也同样如此。

````javascript
actions:{
    myIncrement({commit},num){
        return new Promise((resolve,reject)=>{
            getUser().then((res)=>{
            let data=res;
            commit("increment",data);
            resolve();
            }).catch(((err)=>{
            console.log(err)
            }))
        })
    }
}
````

这样我们在调用的时候就可以链式调用

```javascript
methods:{
    myIncrement(){
        this.$store.dispatch("myIncrement").then(
            ()=>{....}
        )
    }
}
```

### 六.modules

#### 6.1使用

注册：

```javascript
const user={
    state:{},
    getters:{},
    mutations:{},
    actions:{}
}
```

```javascript
import user from "./modules/user"
const store=new Vuex.Store({
    modules:{
        user
    }
})
```

调用：

* (无命名空间)

```javascript
this.$store.state.user.data
this.$store.getters.getData;
this.$store.commit()
this.$store.dispatch()
```

> 在模块中，state 是被限制到模块的命名空间下，需要命名空间才能访问。 但actions 和mutations, 其实还有 getters 却没有被限制，在默认情况下，它们是注册到全局命名空间下的，所以他们的调用依旧可以写成以前的形式。但是这种做法并没有达到我们想要分离模块的意图，我们不想因为名称相同而发生不必要的冲突。（名称相同，都会发生调用）

* （加入命名空间）

```javascript
const user={
    namespaced:true,
    state:{},
    getters:{},
    mutations:{},
    actions:{}
}
```

```javascript
this.$store.state.user.data
this.$store.getters.getData;
this.$store.commit("user/..")
this.$store.dispatch("user/..")
```

#### 6.2辅助函数（加入命名空间）

```javascript
...mapGetters('user',['filterStudent'])
...mapMutations('user',[])
...mapActions('user',[])
```

ex:

getters:

```html
<p>{{filterStudent}}</p>
```

```javascript
computed:{
 ...mapGetters('user',['filterStudent']),   
}
```

actions:

```javascript
methods:{
 ...mapActions('user',['myIncrement']),
 actionsB(){
    this.myIncrement()
 }   
}
```

#### 6.3数据共享

如何使用其他模块的数据和方法？

首先先打印actions中的ctx得到如下结果：

![](https://hansu-1253325863.cos.ap-shanghai.myqcloud.com/newblog/markdown/vue/vuex/rootstate.jpg)

会发现有rootGetters,rootState等属性

rootGetters:

getCount 这是全局的getters

user/filterStudent 这是user模块下的getters

rootState:

count和num都是全局的state

user:Object 展开就是user下的state

参考博文

[如何调用其他模块数据](<https://blog.csdn.net/Wbiokr/article/details/80685559>)

### 七.项目架构



```javascript
├── state.js //全局state
├── getters.js //全局getter
├── mutations.js //全局mutations
├── actions.js //全局actions
├── index.js //入口文件，导出store
├── modules //模块管理
    ├── user.js
    └── ....
```

