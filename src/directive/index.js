import Vue from "vue"

Vue.directive("focus", {
  inserted(el) {
    el.children[0].focus()
  }
}
)

