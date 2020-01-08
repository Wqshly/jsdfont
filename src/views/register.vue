<template>
  <div class="fill-contain background-pic">
    <div class="form-container">
      <section class="main-form">
        <div class="title">
          <p>用&nbsp;&nbsp;户&nbsp;&nbsp;注&nbsp;&nbsp;册</p>
        </div>
        <el-form :model="registerForm" :rules="rules" label-width="100px"
                 style="padding-top: 50px;padding-right: 100px;" ref="register">
          <el-form-item label="员工号:" prop="staffId">
            <el-input v-model="registerForm.staffId" placeholder="请输入员工编号"
                      prefix-icon="el-icon-wqs-shezhi-zhanghaoguanli"
                      clearable/>
          </el-form-item>
          <el-form-item label="用户名:" prop="username">
            <el-input v-model="registerForm.username" placeholder="请输入用户名"
                      prefix-icon="el-icon-wqs-shezhi-zhanghaoguanli"
                      clearable/>
          </el-form-item>
          <el-form-item label="用户密码:" prop="password">
            <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"
                      prefix-icon="el-icon-wqs-suoding"
                      clearable/>
          </el-form-item>
          <el-form-item label="确认密码:" prop="repassword">
            <el-input type="password" v-model="registerForm.repassword" placeholder="确认密码"
                      prefix-icon="el-icon-wqs-suoding"
                      clearable/>
          </el-form-item>
          <el-form-item label="电话号码:" prop="phone">
            <el-input type="email" v-model="registerForm.phone" placeholder="电话号码" prefix-icon="el-icon-wqs-suoding"
                      clearable/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('registerForm')">立即创建</el-button>
            <el-button @click="resetForm('register')">重置</el-button>
          </el-form-item>
        </el-form>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        staffId: '',
        username: '',
        password: '',
        repassword: '',
        phone: ''
      },
      rules: {
        staffId: [
          {required: true, message: '请输入员工ID', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        username: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 5, message: '长度过短', trigger: 'blur'},
          {max: 11, message: '长度过长', trigger: 'blur'}
        ],
        repassword: [
          {validator: validatePass, trigger: 'blur'}
        ]
      }
      // data: {
      //   phone: this.registerForm.phone,
      //   password: this.registerForm.password,
      //   staffId: this.registerForm.staffId
      // }
    }
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.postRequestApi.post('/user/register', this.registerForm)
        }
      })
      // this.$api.signApi.register({
      //   phone: formName.phone,
      //   password: formName.password,
      //   staffId: formName.staffId
      // })
      // this.$axios({
      //   method: 'post',
      //   url: 'api/user/register',
      //   data: {
      //     phone: this.registerForm.phone,
      //     password: this.registerForm.password,
      //     staffId: this.registerForm.staffId
      //   }
      // }).then(res => {
      //   console.log(res.data)
      // }).catch(error => {
      //   console.log('错误')
      //   console.log(error)
      // })
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../style/style";

  .form-container {
    .global-centre(700px, 900px);
    .width-and-height(700px, 900px);
  }

  .background-pic {
    .background-img("../assets/img/register.jpg");
  }
</style>
