<template>
 
<div class="sign-wrapper">

  <div class="sign-container">
    <div class="sign-body">
<h2 class="sign-title">注册后台账号</h2>
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="name">
    <el-input v-model="ruleForm.name" type="text"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input v-model="ruleForm.pass" type="password"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkpass">
    <el-input v-model="ruleForm.checkpass" type="password"></el-input>
  </el-form-item>
  <el-form-item label="确认身份" prop="region">
    <el-select v-model="ruleForm.region">
      <el-option label="管理员" value="manager"></el-option>
      <el-option label="普通用户" value="employee"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
   <div class="signup-item"><span>已有账号，<router-link to="/signIn" >立即登录</router-link></span></div>
 </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        pass: "",
        checkpass: "",
        region: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        checkpass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        region: [{ required: true, message: "请确认身份", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let url = "http://127.0.0.1:3000/admin/regist";
          let $name = this.ruleForm.name;
          let $pass = this.ruleForm.pass;
          let $identity = this.ruleForm.region;
          let formData = this.qs.stringify({
            name: $name,
            password: $pass,
            identity: $identity
          });
          this.axios.post(url, formData).then(result => {
            if (result.data.code===0) {
              this.$message({
                message: "注册成功,3s跳转",
                type: "success"
              });

              setTimeout(() => {
                this.$router.push("/signin");
              }, 3000);
            } else {
              this.$message({
                message: "注册失败",
                type: "error"
              });
            }
          });
        } else {
          console.log("请核对好信息后再次提交");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped="stylus">


.sign-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  .sign-container {
    width: 17rem;
    height: 10rem;
    position:relative;
    border-radius: 0.1rem;
    
    
    background:url('https://cdn.wilddog.com/www-nd/images/account/signup_bg-5ff4429982.jpg') no-repeat;
    background-size:100% 100%;
  

    .sign-body {
      width: 8rem;
      height: 8rem;
      position:absolute;
      top:1rem;
      left:1rem;
     
      background: #fff;
      box-shadow: 0 0 0.3rem #ccc;

      .sign-title {
        color: #332;
        font-size: 0.5rem;
        text-align: center;
      }

      .demo-ruleForm {
        width: 7rem;
        height: 7rem;
      }
    }
    .signup-item{
    position:absolute;
    right:2rem;
    bottom:1rem;
    color:#AFAFAF;
    font-size:.3rem;
    align-self:center;
    }
  }
}
</style>
