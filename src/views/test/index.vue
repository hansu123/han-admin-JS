<template>
  <div class="table-wrapper">
    <msg-form :msg.sync="msg"></msg-form>
    <el-button @click="changeMsg">点击</el-button>
    {{msg}}
  </div>
</template>

<script>
import MsgForm from "./form.vue";
export default {
  components: {
    MsgForm
  },
  data() {
    return {
      msg: "msg"
    };
  },
  computed: {},
  methods: {
    changeMsg(){
      this.msg = "hello";
    }
  },
  created() {}
};
</script>
<style  scoped>
</style>