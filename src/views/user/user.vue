<template>
  <div class="table-wrapper">
    <table-toolbar>
      <div slot="plain" class="plain-ct">
        <div class="search-item">
          <el-input v-model="formInline.user" placeholder="输入文章标题"></el-input>
        </div>
        <el-button-group>
          <el-button type="primary">搜索</el-button>
          <el-button type="primary">添加</el-button>
        </el-button-group>
      </div>
    </table-toolbar>

    <el-table :data="allUserData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="180" align="center"></el-table-column>
      <el-table-column label="最后登录时间" width="180" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>

      <el-table-column prop="identity" label="用户身份" align="center"></el-table-column>
      <el-table-column prop="isOnline" label="在线状态" align="center">
        <el-switch v-model="isOnline" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      ></el-pagination>
    </div>

    <home-dialog :outerVisible="isShow" @changeDialog="handleDialog"></home-dialog>
  </div>
</template>

<script>
import TableToolbar from "@/components/TableToolbar";
import HomeDialog from "@/components/addDialog";
import { mapGetters } from "vuex";
export default {
  methods: {
    handleClick(row) {}
  },

  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },

      person: {},

      isShow: false,
      isOnline: true,
      allUserData: [],
      userData: [],
      pagination: {
        total: 10,
        pageSizes: [10, 20, 30],
        pageSize: 10,
        layout: "total,size,prev,pager,next,jumper",
        currentPage: 1,
        pageIndex: 1
      }
    };
  },

  components: {
    TableToolbar,
    HomeDialog
  },

  computed: {
    ...mapGetters("user", ["userList"])
  },

  created() {
    this.getUser();
  },

  methods: {
    //子传参
    handleDialog(data) {
      this.isShow = false;
      if (data) {
      }
    },
    handleEdit() {
      alert(1);
    },
    handleDelete() {
      alert(2);
    },
    onSubmit() {
      this.isShow = true;
    },

    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.setPage();
    },
    handleCurrentChange(val) {
      this.pagination.pageIndex = val;
      this.setPage();
    },

    setPage() {
      this.userData = [];
      let size = this.pagination.pageSize;
      let max = this.pagination.pageIndex * size;
      let min = (this.pagination.pageIndex - 1) * size;
      this.pagination.total = this.allUserData.length;

      let k = 0;
      this.allUserData.forEach((elem, i) => {
        if (i >= min && i < max) {
          if (k % size == 0) {
          }
          this.userData[k] = elem;
          k++;
        }
      });
    },
    getUser() {
      this.$store.dispatch("user/getUser").then(() => {
        this.allUserData = this.userList;
      });
    }
  }
};
</script>
<style lang='stylus' scoped>
.search-item {
  font-size: 0.4rem;
}
</style>