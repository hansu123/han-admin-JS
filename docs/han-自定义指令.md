#自定义指令

### 一. 基本用法

#### 1.钩子函数：

1. bind:只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个绑定时执行一次的初始化动作。
2. inserted:被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document中）。
3. update:被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
4. componentUpdated:被绑定元素所在模板完成一次更新周期时调用。
5. unbind:只调用一次，指令与元素解绑时调用。

#### 2.参数

指令钩子函数会被传入以下参数：

- `el`：指令所绑定的元素，可以用来直接操作 DOM 。

- `binding`

  ：一个对象，包含以下属性：

  - `name`：指令名，不包括 `v-` 前缀。`bingding.name`
  - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"`中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。

- `vnode`：Vue 编译生成的虚拟节点。移步 [VNode API](https://cn.vuejs.org/v2/api/#VNode-%E6%8E%A5%E5%8F%A3) 来了解更多详情。

- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

ex1:

```javascript
<div v-color="color"></div> 
//值可以是数字，数组，对象
//如果传字符串要加单引号，否则会认为是data中的变量
data(){
    return {
        color:"red"
    }  
},
directives:{
     talk: {
      bind(el, binding) {
        el.style.color = bingding.value;////color为动态绑定的data中color的值
      }
    }
}
<div v-color:color="'red'"></div>
directives:{
     talk: {
      bind(el, binding) {
        console.log(bing.arg);//绑定的参数名为color
        el.style.color = bingding.value;//value就是绑定的值,是字符串red
      }
    }
}

```

[具体看官方文档](<https://cn.vuejs.org/v2/guide/custom-directive.html>)

### 二. 全局自定义指令和局部自定义指令

做权限验证时，我们需要根据用户身份来判定是否显示一些页面的元素，这时候就可以使用自定的指令。

* 自定义指令传入一个字符串比如`<div v-auth="admin"></div>`
* 从vuex中取出用户的身份，并和传入的字符串做比较
* 如果不相同，将元素的样式设置为`display:none`

#### 1.全局自定义组件

index.js

```javascript
import Vue from "vue"
Vue.directive("auth",{
    bind(el, binding) {
    console.log(store.state.admintor.roleInfo);
    let { identity } = store.state.admintor.roleInfo;
    console.log(identity);
    if (identity != el.binding.value) {
      el.style.display = "none";
    }
  }
})
```

main.js中引入

`import "@/directive"`

####2.组件中使用

* auth.js

```javascript
import store from "@/store/store";
export default {

  bind(el, binding) {
    console.log(store.state.admintor.roleInfo);
    let { identity } = store.state.admintor.roleInfo;
    console.log(identity);
    if (identity != el.binding.value) {
      el.style.display = "none";
    }
  }
}
```

* 组件

````javascript
import talk from '@/directive/auth'
directives: { auth }
````



