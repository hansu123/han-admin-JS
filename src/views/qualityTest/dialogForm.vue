<template>
  <div class="addForm">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="Numbers" prop="Numbers">
        <el-input v-model="ruleForm.Numbers"></el-input>
      </el-form-item>
      <el-form-item label="NG1" prop="NG1">
        <el-input v-model="ruleForm.NG1"></el-input>
      </el-form-item>
      <el-form-item label="NG2" prop="NG2">
        <el-input v-model="ruleForm.NG2"></el-input>
      </el-form-item>
      <el-form-item label="Zero" prop="Zero" v-if="ruleForm.Zero||this.actionType==0">
        <el-input v-model="ruleForm.Zero" :disabled="this.actionType==1&&!ruleForm.Zero?true:false"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {isNum} from "@/utils/checkRules"
export default {
  props: ["actionType"],
  components: {},
  data() {
    return {
      detectionData: {},
      ruleForm: {},
      rules: {
        NG1: [
          { required: true, message: "不能为空", trigger: "change" },
          { validator: this.checkNumber, trigger: "change" }
        ],
        NG2: [
          { required: true, message: "不能为空", trigger: "change" },
          { validator:this.checkNumber, trigger: "change" }
        ],
        Zero: [
          { required: true, message: "不能为空", trigger: "change" },
          { validator:this.checkNumber, trigger: "change" }
        ]
      }
    };
  },
  methods: {
    setFormData(payload) {
      this.ruleForm = payload;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    validate() {
      let isValidate;
      this.$refs.ruleForm.validate(valid => {
        isValidate = valid;
      });
      return isValidate;
    },
    checkNumber(rule, value, fn) {
      console.log(isNum(value))
      if (isNum(value)==1) {
        fn();
      } else if(isNum(value)==-1) {
        fn(new Error("请输入数字"));
      }
      else{
        fn(new Error("数字格式不正确"));
      }
    }
  }
};
</script>
<style  lang="stylus" scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>