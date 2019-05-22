<template>
  <div class="home">
    <div id="main">
      <img v-lazy="'https://hansu-1253325863.cos.ap-shanghai.myqcloud.com/newblog/web/core-img/admin.jpg'"/>
    </div>
  </div>
</template>

<script>
// let echarts = require("echarts");
import echarts from "echarts";
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
};
</script>
<style lang='stylus' scoped>
.home {
  padding: 0.3rem;
  background: #eee;
  box-sizing:border-box;
  height:100%;
  display:flex;
  flex-direction :column;
  justify-content :center;
}

#main {
  width: 100%;
  height: 10rem;
  padding: 0.2rem 0;
  display: flex;
  justify-content:center;
}
</style>