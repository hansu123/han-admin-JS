<template>
  <div class="qualityTest">
    <table-toolbar>
      <div slot="plain" class="plain-ct">
        <search-bar :searchData="searchConditions" ref="searchBar"></search-bar>
        <el-button-group>
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="showDialog(0)">新增</el-button>
         <el-button type="primary" icon="el-icon-download" @click="exportExcel">导出</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="getData('refresh')"></el-button>
        </el-button-group>
      </div>
    </table-toolbar>

    <el-table :data="tableData" style="width: 100%" align="center" @row-dblclick="handleDbclick" :default-sort = "{prop: 'NG1', order: 'descending'}">
      <el-table-column label="序号" type="index" :index="indexMethod" width="180" align="center"></el-table-column>

      <el-table-column label="Numbers" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.Numbers.length>0">
            <span style="margin-left: 10px" v-for="(elem,i) of scope.row.Numbers">{{elem}}</span>
          </div>
          <div v-else>
            <span style="margin-left: 10px">{{scope.row.Numbers}}</span>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="NG1" width="180" align="center" sortable="true">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.NG1| percenFilter}}</span>
        </template>
      </el-table-column>-->
      <el-table-column
        label="NG1"
        width="180"
        align="center"
        prop='NG1'
        :sortable="true"
        :sort-method="sortChange"
      >
      
      </el-table-column>
      <el-table-column label="NG2" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.NG2| percenFilter}}</span>
        </template>
      </el-table-column>

      <!--做成筛选-->
      <!-- <el-table-column label="Zero" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.Zero?scope.row.Zero:'无'}}</span>
        </template>
      </el-table-column>-->
      <el-table-column
        label="Zero"
        width="100"
        prop="tag"
        :filters="[{ text: '类型1', value: false }, { text: '类型2', value: true }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '类型1' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.Zero?scope.row.Zero:'无'}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="类型"
        width="100"
        prop="tag"
        :filters="[{ text: '类型1', value: false }, { text: '类型2', value: true }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '类型1' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.Zero?'类型2':'类型1'}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="NG2/NG1" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ (scope.row.NG2/scope.row.NG1) | percenFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">添加</el-button> -->
          <el-button size="mini" type="primary" @click="showDialog(1,scope.row)" v-auth>修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <br>

    <!-- <el-pagination
      style="float:right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>-->

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" center>
      <addForm ref="Form" abc="1" :actionType="actionType"></addForm>

      <span slot="footer" class="dialog-footer" v-if="this.actionType!=2">
        <el-button @click="isVisible">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import addForm from "./dialogForm";
import TableToolbar from "@/components/TableToolbar";
import searchBar from "@/components/searchBar";
import { getDecList } from "@/api/qualityTest";
import { deepClone } from "@/utils/index";
import auth from "@/directive/auth";
export default {
  components: {
    addForm,
    TableToolbar,
    searchBar
  },
  data() {
    return {
      total: 0,
      tableData: [],
      currentPage: 4,
      dialogVisible: false,
      dialogTitle: "",
      decData: {},
      rowData: {},
      searchConditions: { Numbers: "", NG1: "", NG2: "", Zero: "" },
      actionType: undefined
    };
  },
  methods: {
    search() {
      getDecList(this.$refs.searchBar.formInline).then(res => {
        // let data = JSON.parse(res.data);
        let data = res.data;
        this.total = data.total;
        this.tableData = data.list;
      });
    },
    getData(r) {
      getDecList().then(res => {
        // let data = JSON.parse(res.data);

        let data = res.data;
        this.total = data.total;
        this.tableData = data.list;
        if (r == "refresh") {
          this.$message({
            message: "已是最新数据",
            type: "success"
          });
        }
      });
    },
    showDialog(i, d) {
      this.actionType = i;
      console.log(d);
      switch (i) {
        case 0:
          (this.dialogVisible = true),
            (this.dialogTitle = "新增检测"),
            (this.rowData = {});
          break;
        case 1:
          (this.dialogVisible = true),
            (this.dialogTitle = "质量检测"),
            (this.rowData = d);
          break;
        case 2:
          (this.dialogVisible = true),
            (this.dialogTitle = "质量检测"),
            (this.rowData = d);
          break;
      }

      this.$nextTick(() => {
        this.$refs.Form.setFormData(deepClone(this.rowData));
        //  this.$refs.Form.setFormData(this.rowData);
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    isVisible() {
      this.dialogVisible = false;
    },
    handleConfirm() {
      if (this.$refs.Form.validate()) {
        if (this.actionType == 0) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          console.log(this.$refs.Form.ruleForm);
        }

        this.isVisible();
      }
    },
    indexMethod(index) {
      return index * 1 + 1;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    filterTag(value, row) {
      console.log(row.Zero);
      return Boolean(row.Zero) == value;
    },
    handleDbclick(row, event, column) {
      this.showDialog(2, row);
    },
    sortChange(a, b) {
   
      if(a.NG1==b.NG1){return 1}
      return b.NG1-a.NG1;
    },
    exportExcel(){
      
    }
  },
  filters: {
    percenFilter(value) {
      return parseInt(value.toFixed(2) * 100) + "%";
    }
  },
  created() {
    this.getData();
  },
  directives: {
    auth
  }
};
</script>
<style scoped>
</style>