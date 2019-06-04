# vue插件

新建plugin.js

```javascript
export default {
  install(Vue, options) {
      
    //全局方法
    Vue.hansu = () => {
      alert("hansu")
    },
        
     //全局指令，过滤，过渡动画
      Vue.directive("color", {
        bind(el, binding) {
          console.log(binding)
          el.style.color = 'red'
        }
      }),

      //全局mixin
      Vue.mixin({
      data(){},
      methods:{},
      }),

      //添加实例（属性或方法）
      Vue.prototype.$hansu = "hansu"
      Vue.prototype.say=()=>{
          alert("hansu")
      }
  }

}

```

在main.js引入

```javascript
import  myPlugin from "@/plugins/index"
Vue.use(myPlugin)
```

组件中调用

```javascript
<p v-color="'red'">{{this.$hansu}}</p>
```





### 插件库

####懒加载插件

[lazyload](<https://www.npmjs.com/package/vue-lazyload>)

####数据持久化插件

