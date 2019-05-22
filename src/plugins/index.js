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
          el.style.color = binding.value
        }
      }),


      //全局mixin
      Vue.mixin({


      }),

      //添加实例（属性或方法）
      Vue.prototype.$hansu = "hansu"
  }

}
