<template>
  <el-form :model="registerForm" :rules="rules" ref="ruleForm" label-width="100px" class="user-add-container">
    <el-form-item label="用户名" prop="name">
      <el-col :span="11">
        <el-input v-model="registerForm.name"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-col :span="11">
        <el-input v-model="registerForm.password" type="password"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="确认密码" prop="ensurePassword">
      <el-col :span="11">
        <el-input v-model="registerForm.ensurePassword" type="password"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        registerForm: {
          name: '',
          password: '',
          ensurePassword: '',
          email: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
          ],
          ensurePassword: [
            {required: true, message: '请确认密码', trigger: 'blur'},
            {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-add-container{
    padding: 20px;
  }
</style>
