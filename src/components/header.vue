<template>
  <div class="home-header">
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="header-title">
          <img
            src="https://hansu-1253325863.cos.ap-shanghai.myqcloud.com/newblog/web/icon-img/icon.png"
            class="home-logo"
          >博客后台管理系统
        </div>
      </el-col>

      <el-col :span="6">
        <div class="header-right">
          <!-- <i
            class="iconfont icon-quanping"
            @click="isScreenFull"
            style="cursor:pointer;font-size:20px;"
          ></i>
          <el-button size="mini">主题切换</el-button>
          <el-select
            v-model="language"
            placeholder="语言切换"
            size="mini"
            @change="changeLanguage"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>-->

          <!--收缩左侧菜单-->
          <!-- <el-button @click="handleCollapse">展开</el-button> -->

          <img src="@/common/img/boy.png" class="header-avatar">

          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              {{this.$store.getters.roleInfo.name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
              <!--{{roleInfo.name}}-->
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">
                <i class="iconfont icon-mima"></i>切换密码
              </el-dropdown-item>
              <el-dropdown-item command="signout">
                <i class="iconfont icon-tuichu"></i>退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import screenfull from "screenfull";
import { removeToken } from "@/utils/storage";
export default {
  data() {
    return {
      options: [{ value: "zh" }, { value: "en" }],
      language: ""
    };
  },

  computed: {
    ...mapGetters(["roleInfo"])
  },

  methods: {
    handleCommand(command) {
      if (command == "info") {
        console.log("个人信息");
      } else if (command == "signout") {
        this.$confirm("你确定要退出吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "退出成功!"
            });
            removeToken();
            this.$router.push("/signin");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      }
    },
    changeLanguage() {
      this.$i18n.locale = this.language;
    },
    isScreenFull() {
      if (!screenfull.enabled) {
        // 如果不允许进入全屏，发出不允许提示
        this.$message({
          message: "不支持全屏",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
      // this.$message({
      //     message: '全屏啦',
      //     type: 'success'
      //  })
    },
    handleCollapse() {
      this.$emit("handleCollapse");
    }
  }
};
</script>
<style lang='stylus' scoped>
.home-header {
  padding: 0 0.2rem;
  color: #fff;
  font-size: 0.5rem;
  line-height: 1.2rem;
  height: 1.2rem;
  background: #324057;

  .home-logo {
    width: 1rem;
    height: 1rem;
    margin-right: 0.1rem;
    vertical-align: middle;
  }

  .header-right {
    float: right;
    font-size: 0.3rem;
    margin-right: 0.2rem;

    .header-avatar {
      margin-right: 0.1rem;
      height: 0.8rem;
      vertical-align: middle;
      cursor: pointer;
    }

    .el-dropdown-link {
      cursor: pointer;
      color: #fff;
    }

    .el-icon-arrow-down {
      font-size: 0.3rem;
    }
  }
}
</style>