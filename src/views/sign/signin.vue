<template>
  <div class="sign-wrapper">
    <div class="sign-container">
      <div class="sign-body">
        <h2 class="sign-title">后台登录系统</h2>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="ruleForm.name"
              type="text"
              v-focus
              @keyup.enter.native="submitForm('ruleForm')"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              v-model="ruleForm.pass"
              type="password"
              @keyup.enter.native="submitForm('ruleForm')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" class="signin-button">立即登陆</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="记住密码" name="type"></el-checkbox>
              <el-checkbox label="15天自动登录" name="type"></el-checkbox>
            </el-checkbox-group>
            <p class="admin">测试账号:admin 密码:123456</p>
          </el-form-item>
        </el-form>
      </div>
      <div class="signup-item">
        <span>
          还没有账号，
          <router-link to="/signup">立即注册</router-link>
        </span>
      </div>
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
        type: [],
      
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.loading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // let url="http://127.0.0.1:3000/admin/login";
          let $name = this.ruleForm.name;
          let $pass = this.ruleForm.pass;
          let formData = this.qs.stringify({
            name: $name,
            password: $pass
          });
          // this.axios.post(url,formData).then((result)=>{

          //  if (result.data.message == "ok") {
          //   // this.$message({
          //   //   message: "欢迎回来",
          //   //   type: "success"
          //   // });

          //  const {token}=result.data;
          //  localStorage.setItem("eleToken",token);
          //  let myToken=dejwt(token);
          //  this.$router.push('/index');

          // }
          this.$store
            .dispatch("admintor/checkLogin", formData)
            .then(() => {
                this.$message({
                  message: "登录成功,3s跳转",
                  type: "success"
                });

                setTimeout(() => {
                  this.$router.push("/index");
                }, 3000);
        
            })
            .catch(err => {
              this.$message({
                message: "登陆失败",
                type: "error"
              });
            });
        } else {
          console.log("请仔细核对信息后再提交");
          return false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
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
    height: 8rem;
    position: relative;
    display: flex;
    border-radius: 0.1rem;
    background: url('https://cdn.wilddog.com/www-nd/images/account/signup_bg-5ff4429982.jpg') no-repeat;
    background-size: 100% 100%;

    .sign-body {
      width: 8rem;
      height: 10rem;
      position: absolute;
      top: -1rem;
      left: 1rem;
      background: #fff;
      box-shadow: 0 0 0.3rem #ccc;

      .sign-title {
        color: #332;
        font-size: 0.5rem;
        margin-top: 1.5rem;
        text-align: center;
      }

      .admin {
        color: #ccc;
        text-align: center;
      }

      .demo-ruleForm {
        margin-top: 1rem;
        width: 7rem;
        height: 7rem;

        .signin-button {
          width: 100%;
        }
      }
    }

    .signup-item {
      position: absolute;
      right: 2rem;
      bottom: 1rem;
      color: #AFAFAF;
      font-size: 0.3rem;
      align-self: center;
    }
  }
}
</style>
