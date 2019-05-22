<template>
<div class="layout">
		<div class="main">
			<div class="err">
				<p class="err_text">非常抱歉，您访<br>问的页面不存在</p>
				<router-link to="signin" class="err_back">返回首页</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {}
}

</script>
<style lang='stylus' scoped>

.layout{width:100%;}
.err{position:relative;width:11rem;height:6rem;margin:2rem auto 1rem;background:url("../../src/common/img/err.jpg") no-repeat 21px 18px;font-size:14px}
.err_text{position:absolute;top:5rem;left:4.8rem;color:#808080;}
.err_back{position:absolute;top:5.1rem;right:0.8rem;width:3.1rem;height:0.8rem;text-indent:-999px;overflow:hidden;cursor:pointer}
</style>