<template>
  <div class="s-wrapper">
    <el-form :inline="true" :model="formInline" class="searchBar">
      
      
      
      
      <!--文章列表-->
      <el-form-item v-if="formInline.author!=undefined">
        <el-select v-model="formInline.author" placeholder="author">
          <el-option
            v-for="item in authorOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="formInline.cate!=undefined">
        <el-select v-model="formInline.cate" placeholder="cate">
          <el-option
            v-for="item in cateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="formInline.postTime!=undefined">
        <el-date-picker v-model="formInline.postTime[0]" type="date" placeholder="开始日期" @change="handleDate" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>

       <el-form-item v-if="formInline.postTime!=undefined">
        <el-date-picker v-model="formInline.postTime[1]" type="date" placeholder="结束日期" @change="handleDate" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>

      <!--qualityTest-->
      <el-form-item v-if="formInline.Numbers!=undefined">
        <el-input clearable v-model="formInline.user" placeholder="Numbers"></el-input>
      </el-form-item>
      <el-form-item v-if="formInline.NG1!=undefined">
        <el-input clearable v-model="formInline.NG1" placeholder="NG1"></el-input>
      </el-form-item>
      <el-form-item v-if="formInline.NG2!=undefined">
        <el-input clearable v-model="formInline.NG2" placeholder="NG2"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["searchData"],
  components: {},
  data() {
    return {
      formInline: {},
      authorOptions: [{ value: "hansu" }, { value: "lilei" }],
      cateOptions: [{ value: "js" }, { value: "html" }]
    };
  },
  mounted() {
    console.log(this.searchData);
    this.formInline = this.searchData;
  },
  methods: {
    handleDate() {
      console.log(this.formInline.postTime);
    }
  }
};
</script>
<style  scoped>
.searchBar {
  display: flex;
  flex: 1;
  height:40px;
}

</style>