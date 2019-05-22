<template>
  <div class="home-sider">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#324057"
          text-color="#fff"
          active-text-color="#CBC3A6"
          :collapse="isCollapse"
          :default-active="$route.name"
      
        >
          <template v-for="(route,i) of items[0].children">
            <el-submenu :index="route.name" v-if="route.children">
              <template slot="title">
                <i :class="route.meta.icon"></i>
                <span>{{convertTitle(route.meta.title)}}</span>
              </template>

              <el-menu-item-group v-for="(elem,i) of route.children" :key="i">
                <router-link :to="elem.path" :key="elem.name">
                  <el-menu-item
                    :index="elem.name"
                    v-if="!elem.children"
                  >{{convertTitle(elem.meta.title)}}</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>

            <router-link :to="route.path" :key="route.name">
              <el-menu-item :index="route.name" v-if="!route.children">
                <i :class="route.meta.icon"></i>
                <span slot="title">{{convertTitle(route.meta.title)}}</span>
              </el-menu-item>
            </router-link>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import asyncRoute from "@/router/asyncRouter";
import { mapActions} from "vuex";
export default {
  props: ["isCollapse"],
  data() {
    return {
      items:this.$store.state.admintor.allRoute
    };
  },
 
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    convertTitle(value) {
      return this.$t("siderBar." + value);
    }
  }
};
</script>
<style lang='stylus' scoped>
.home-sider {
  height: 100%;

  .tac {
    height: 100%;
  }

  .el-menu-vertical-demo {
    height: calc(100vh - 1.2rem);
  }

  a {
    color: #fff;
  }

  a:visited {
    color: #fff;
  }
}
</style>