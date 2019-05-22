<template>
  <div class="admin-wrapper">
    <home-header @handleCollapse="changeSiderStatus"></home-header>
    <el-row class="admin-content">
      <el-col class="home-sider">
        <home-sider :isCollapse="isCollapse"></home-sider>
      </el-col>
      <el-col class="home-body">
        <keep-alive>
          <transition name="component-fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import HomeHeader from "@/components/header.vue";
import HomeSider from "@/components/sider.vue";
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    changeSiderStatus() {
      this.isCollapse = !this.isCollapse;
    }
  },
  components: {
    HomeHeader,
    HomeSider
  }
};
</script>



<style lang="stylus" >
* {
  padding: 0;
  margin: 0;
}

.admin-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;

  .admin-content {
    flex: 1;
    display: flex;
    align-items: stretch;

    .home-sider {
      width: 5rem;
    }

    .home-body {
      flex: 1;
      width: 100%;
      height: calc(100vh - 1.2rem);
      overflow: scroll;
      padding: 0.2rem;
      box-sizing: border-box;
    }
  }
}

a {
  color: #fff;
  font-size: 0.3rem;
}


</style>