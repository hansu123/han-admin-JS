import store from "@/store/store";
export default {

  bind(el, binding) {

    let { identity } = store.getters.roleInfo || "";
    if (identity != "manager") {
      el.style.display = "none";
    }
  }
}