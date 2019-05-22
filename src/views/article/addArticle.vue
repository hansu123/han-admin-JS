<template>
  <div class="add-wrapper">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input type="text" placeholder="请输入文章标题" v-model="ruleForm.title"/>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate">
        <el-select v-model="ruleForm.cate" placeholder="请选择">
          <el-option label="css" value="css"></el-option>
          <el-option label="javascript" value="javascript"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章简介" prop="summary">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="文章简介,最多输入100个字"
          v-model="ruleForm.summary"
          maxlength="100"
        ></el-input>
      </el-form-item>

      <!--富文本编辑器-->
      <el-form-item>
        <mavon-editor
          style="height:450px"
          v-model="ruleForm.content"
          ref="md"
          @change="changeMavon"
          @imgAdd="$imgAdd"
        ></mavon-editor>
      </el-form-item>
      <!--缩略图-->
      <el-form-item label="上传图片">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
          :auto-upload="false"
          ref="upload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确认发布</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import marked from "marked";
import articleModel from "../../api/article";
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

export default {
  data() {
    return {
      fileList: [],
      configs: {},
      ruleForm: {
        title: "",
        cate: "",
        summary: "",
        content: "",
        fileList: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        cate: [{ required: true, message: "请选择分类", trigger: "change" }],
        summary: [
          { required: true, message: "请填写文章简介", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    mavonEditor
  },
  methods: {
    changeMavon() {},
    $imgAdd() {},
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //提交文章
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formData = new FormData();
          let file = this.$refs.upload.uploadFiles[0];
          let config = {       
            headers: { "Content-Type": "multipart/form-data" }
          };

          if (!file) {
            // 若未选择文件
            this.message({
              message: "请添加文件",
              type: "warning"
            });
            return;
          }
          let { title, cate, summary, content } = this.ruleForm;

          formData.append("file", file.raw);
          formData.append("title", title);
          formData.append("cate", cate);
          formData.append("summary", summary);
          formData.append("content", marked(content));
          console.log(formData.get("file"));
          articleModel.AddArticle(formData,config)
            .then(() => {
              this.$message({
                message: "添加成功",
                type: "success"
              });
            })
            .catch(err => {
              if (err) {
                this.$message({
                  message: "添加失败",
                  type: "error"
                });
              }
            });
        } else {
          this.$message({
            message: "请填写正确信息",
            type: "warning"
          });
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
<style lang='stylus' scoped>
.add-wrapper {
  padding: 0.1rem 0.2rem;
}
</style>
