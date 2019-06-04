#vuex数据持久化

`vuex`存储数据，当页面刷新时会发生数据丢失的情况。解决方式有两个：

###一. localStorage本地存储

这里注意的是localStorage存储JSON对象的时候，需要先将其反序列化（JSON.stringify)转化为json字符串存储，然后取的时候再序列化（JSON.parse)

vuex中：

```javascript
  actions: {
    async checkLogin({ commit }, payload) {
      let d = await adminModel.login(payload);
      const { token } = d.data;
      localStorage.setItem("eleToken", token);
        
      let myToken = dejwt(token);
      localStorage.setItem('roleInfo',JSON.stringify(myToken));
  
      commit(SET_TOKEN, token);
      commit(SET_ROLEINFO, myToken);
    }
  }
```

auth.js(自定义指令)

```javascript
import store from "@/store/store";
export default {
  bind(el, binding) {
    let { identity } =           JSON.parse(store.state.admintor.roleInfo);
    console.log(identity);
    if (identity != "manager") {
      el.style.display = "none";
    }
  }
}
```

###二.使用插件`vuex-persist`

* npm i vuex-persist -S
* 