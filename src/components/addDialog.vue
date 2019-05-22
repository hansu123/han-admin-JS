<template>
  <div>


  
  <el-dialog title="添加用户" :visible.sync="outerVisible" >


<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
   <el-form-item label="邮箱" prop="email">
    <el-input v-model="ruleForm.email"></el-input>
  </el-form-item>
  <el-form-item label="确认身份" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择">
<el-option label="管理员" value="manager"></el-option>
      <el-option label="普通用户" value="employee"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="性别" prop="sex">
    <el-radio-group v-model="ruleForm.sex">
      <el-radio label="男"></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')" >立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>




    <div slot="footer" class="dialog-footer">
      <el-button @click="handleStatus">取 消</el-button>
    </div>
  </el-dialog>

  </div>
</template>

<script>
export default {
   props:['outerVisible'],
   data() {
      return {
        outerVisible: false,
        innerVisible: false,
   
        ruleForm: {
          name: '',
          email:'',
          region: '',
          sex: '',
      
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
           email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
          ],
          region: [
            { required: true, message: '请选择身份', trigger: 'change' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
         
        }
      }


    
  },



  methods: {
     

handleStatus(){
this.outerVisible=false;
this.$emit("changeDialog")

},
submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
        
            
            let url="http://localhost:3000/admin/addUser";
            this.axios.post(url,this.ruleForm).then((result)=>{

            if(result.data.code==1){

            this.$emit("changeDialog",this.ruleForm)
              
            }
            else{console.log(2)}
            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },

    watch:{

outerVisible(newname,oldname){
if(!newname){this.handleStatus()}
}

}

  
}

</script>
<style lang='stylus' scoped>
</style>