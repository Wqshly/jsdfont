<template>
  <div class="fill-contain background-pic">
    <div class="form-container">
      <section class="main-form">
        <div class="title">
          <p>系&nbsp;&nbsp;统&nbsp;&nbsp;登&nbsp;&nbsp;录</p>
        </div>
        <el-form :model="loginForm" style="padding-top: 50px" :rules="rules" ref="loginForm">
          <el-form-item prop="phone">
            <el-input v-model="loginForm.phone" placeholder="请输入员工编号或手机号"
                      prefix-icon="el-icon-wqs-shezhi-zhanghaoguanli"
                      clearable/>
          </el-form-item>
          <el-form-item style="margin-bottom: 10px" prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" prefix-icon="el-icon-wqs-suoding"
                      show-password clearable/>
          </el-form-item>
          <el-form-item style="margin-bottom: 5px;">
            <el-checkbox style="float: right;margin-right: 20px">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button style="float: left;width: 100px;" @click="login('loginForm')">登录</el-button>
            <el-button style="float: right;width: 100px;" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </section>
    </div>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      loginForm: {
        phone: null,
        password: null
      },
      rules: {
        phone: [
          {required: true, message: '请输入员工编号或手机号', trigger: 'blur'},
          {min: 2, max: 11, message: '请输入正确的手机号或员工编号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate((valid) => {
        this[formName].password = this.$commonsMethod.encryptedData(this[formName].password)
        // console.log(this[formName].password)
        if (valid) {
          const url = '/user/login'
          this.$refs[formName].$api.requestApi.post(url, this[formName])
            .then(res => {
              let _this = this
              sessionStorage.setItem('save_user_id', res.data.id)
              sessionStorage.setItem('save_username', res.data.name)
              _this.$router.push('/home')
            })
            .catch()
        }
      })
    },
    register () {
      this.$api.getRequestApi.get('/staff/staffCount')
        .then(res => {
          if (res.data !== 0) {
            this.$router.push('/register')
          } else {
            this.$router.push('/initRegister')
          }
        })
        .catch(err => {
          console.log(err.data)
        })
    }
  }
}

</script>

<style lang="less" scoped>
  @import "../style/style";

  .background-pic {
    .background-img("../assets/img/login-bg.jpg");
  }

  .form-container {
    .global-centre(450px, 360px);
    .width-and-height(450px, 360px);
  }

</style>
