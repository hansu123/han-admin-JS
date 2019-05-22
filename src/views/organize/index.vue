<template>
  <div class="table-wrapper">
   <table-toolbar>
      <div slot="plain" class="plain-ct">
        <div class="search-item">
          <el-input v-model="keyWord" placeholder="请输入" clearable></el-input>
        </div>
        <el-button-group>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button type="primary" icon="el-icon-plus">新增</el-button>
        </el-button-group>
      </div>
    </table-toolbar>
    <el-tree
      :data="data"
      show-checkbox
      node-key="F_ID"
      :props="defaultProps"
      default-expand-all
      :expand-on-click-node="false"
      :highlight-current="true"
      @check="handleCheck"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="() => append(data)"></el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-delete"
            @click="() => remove(node, data)"
          ></el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import TableToolbar from "@/components/TableToolbar";
export default {
  components: {
    TableToolbar
  },
  data() {
    return {
      data: [
        {
          F_ID: "1",
          F_ParentId: "0",
          F_FullName: "层级1",
          children: [
            {
              F_ID: "2",
              F_ParentId: "1",
              F_FullName: "层级2",
              children: [
                {
                  F_ID: "3",
                  F_ParentId: "2",
                  F_FullName: "层级3",
                  children: [
                    {
                      F_ID: "4",
                      F_ParentId: "3",
                      F_FullName: "层级4",
                      children: [],
                      route: null,
                      Root: "1",
                      OrderIndex: null
                    },
                    {
                      F_ID: "5",
                      F_ParentId: "3",
                      F_FullName: "层级4",
                      children: [],
                      route: null,
                      Root: "1",
                      OrderIndex: null
                    },
                    {
                      F_ID: "6",
                      F_ParentId: "3",
                      F_FullName: "层级4",
                      children: [],
                      route: null,
                      Root: "1",
                      OrderIndex: null
                    }
                  ],
                  route: null,
                  Root: "-1",
                  OrderIndex: null
                }
              ],
              route: null,
              Root: "-1",
              OrderIndex: null
            }
          ],
          route: null,
          Root: "-1",
          OrderIndex: null
        }
      ],
      defaultProps: {
        label: "F_FullName",
        children: "children"
      },
      obj: {},
      keyWord:""
    };
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    handleCheck() {
      alert(1);
    },
    handleClick() {
      this.$set(this.obj, "name", "hansu");
    }
  }
};
</script>
<style lang="css" scoped>
.custom-tree-node {
  width: 500px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 25px;
  padding-right: 8px;
}
</style>

<style >
.el-tree-node__content {
  height: 40px !important;
  padding: 5px 10px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
}
</style>