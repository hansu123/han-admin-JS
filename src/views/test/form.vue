<template>
<div class='wrapper'>
  {{msg}}
<el-button @click="changeMsg">点击</el-button>
</div>
</template>

<script>

export default {
props:["msg"],
data() {
return {

};
},
computed: {},
methods: {
changeMsg(){
  this.$emit("update:msg","hansu")
}
},
created() {

},
}
</script>
<style scoped>
</style>