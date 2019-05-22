import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from './http'
import store from './store/store'


//全局引入styles
import  '@/styles/index.styl'


//引入插件

import  myPlugin from "@/plugins/index"
Vue.use(myPlugin)

//懒加载插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  // preload:1.3,//预加载的宽高
  loading:"@/common/img/boy.png",
  error:"@/common/img/err.jpg",
  attempt:3,//尝试加载的次数
  listenEvents:['scroll','wheel','mousewheel','resize','animationend','transitionend','touchmove'], //你想让vue监听的事件
})

//引入全局指令
import "@/directive/index"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import VueI18n from "vue-i18n"
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale:'zh',//语言标识，默认为中文
  messages:{
    'zh':require('@/lang/zh/index'),
    'en':require('@/lang/en/index')
  }
})



//引入mock




//iconfont图标样式
import "../src/common/css/iconfont.css";




import axios from "axios"
axios.defaults.withCredentials=true;
Vue.prototype.axios=axios;

import qs from "qs";

Vue.prototype.qs=qs;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
