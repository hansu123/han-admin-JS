<template>
  <div class="tableToolBar">

      <slot name="plain"></slot>
    
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
.tableToolBar {
  padding:10px;
  background:#eee;
}
</style>