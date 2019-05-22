<template>
  <div class="article">
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  }
};
</script>
<style  scoped>
</style>