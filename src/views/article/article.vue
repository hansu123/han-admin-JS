<template>
  <div class="table-wrapper">
    <table-toolbar>
      <div slot="plain" class="plain-ct">
        <search-bar :searchData="searchConditions" ref="searchBar"></search-bar>
        <el-button-group>
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="getList('refresh')"></el-button>
        </el-button-group>
      </div>
    </table-toolbar>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="180" align="center"></el-table-column>
      <el-table-column label="Date" prop="postTime" align="center"></el-table-column>
      <el-table-column prop="author" label="作者" width="180" align="center"></el-table-column>
      <el-table-column prop="title" label="文章标题" align="center"></el-table-column>
      <el-table-column prop="cate" label="文章分类" align="center"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="handleEdit(scope.row)" v-auth>编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)" v-auth>删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="pagination.pagesizes"
        :page-size="pagination.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      ></el-pagination>
    </div>

    <edit-dialog
      :outerVisible="isShowEditDialog"
      :ruleForm="articleEditData"
      @changeDialog="handleDialog"
    ></edit-dialog>
  </div>
</template>

<script>
import TableToolbar from "@/components/TableToolbar";
import searchBar from "@/components/searchBar";
import EditDialog from "@/components/editDialog.vue";
import { mapGetters } from "vuex";
import auth  from "@/directive/auth";
export default {
  data() {
    return {
      isShowEditDialog: false,
      articleEditData: {},
      allTableData: [],
      tableData: [],
      pagination: {
        total: 0,
        pagesize: 10,
        pagesizes: [10, 20, 30, 40],
        currentPage: 1
      },
      articleData: [],
      searchConditions: {
        author: "",
        cate: "",
        postTime: []
      },
      value: "ss",
      options: [{ value: 1, label: "hansu" }, { value: 2, label: "lilei" }]
    };
  },

  components: {
    EditDialog,
    TableToolbar,
    searchBar
  },

  computed: {
    ...mapGetters("article", ["getArticleList"])
  },

  mounted() {
    this.getList();
  },

  methods: {
    getList(r) {
      let params = this.$refs.searchBar.formInline;
      this.$store
        .dispatch("article/getList", params)
        .then(() => {
          this.allTableData = this.getArticleList;
          this.pagination.total = this.allTableData.length;
          this.setPage();
        })
        .catch(err => {
          throw err;
        });
      if (r === "refresh") {
        this.$message({
          type: "success",
          message: "已是最新数据"
        });
      }
    },
    handleDialog() {
      this.isShowEditDialog = false;
    },
    handleEdit(data) {
      this.articleEditData = data;
      this.isShowEditDialog = true;
    },

    handleDelete(data) {
      this.$confirm("此操作将永久删除文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("article/delArticle", data._id)
            .then(() => {
              // this.getList();
              this.allTableData = this.getArticleList;
              this.pagination.total = this.allTableData.length;

              this.setPage();

              this.$message({
                message: "删除成功",
                type: "success"
              });
            })
            .catch(err => {
              throw err;
              this.$message({
                type: "success",
                message: "删除失败!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    onSubmit() {},
    handleSizeChange(val) {
      this.pagination.currentPage = val;
    },
    handleCurrentChange(val) {
      this.pagination.pagesize = val;
    },
    setPage() {
      this.tableData = this.allTableData.filter((elem, i, arr) => {
        return i < this.pagination.pagesize;
      });
    },
    search() {
      this.getList();
    },
    showDialog() {},
    handleClick(row) {},
    handleChange() {
      alert(this.value);
    }
  },
  directives:{
    auth
  }
};
</script>
<style lang='stylus' scoped></style>