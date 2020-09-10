<template>
  <div class="fill-contain background-pic">
    <div class="form-container">
      <section class="main-form">
        <div class="title">
          <p>内&nbsp;&nbsp;部&nbsp;&nbsp;员&nbsp;&nbsp;工&nbsp;&nbsp;注&nbsp;&nbsp;册</p>
          <p style="font-size: 16px;padding-top: 25px">(注册前请先确认您的信息是否已录入本公司数据库)</p>
        </div>
        <el-form :model="registerForm" :rules="rules" label-width="100px"
                 style="padding-top: 50px;padding-right: 60px;" ref="registerForm">
          <el-form-item label="电话号码:" prop="phone">
            <el-input v-model="registerForm.phone" placeholder="输入您的手机号，用以核对是否是本公司的员工" prefix-icon="el-icon-wqs-suoding"
                      clearable/>
          </el-form-item>
          <el-form-item label="昵称:" prop="nickName">
            <el-input v-model="registerForm.nickName" placeholder="输入昵称" prefix-icon="el-icon-wqs-suoding"
                      clearable/>
          </el-form-item>
          <el-form-item label="用户密码:" prop="password">
            <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"
                      prefix-icon="el-icon-wqs-suoding"
                      clearable/>
          </el-form-item>
          <el-form-item label="确认密码:" prop="rePassword">
            <el-input type="password" v-model="registerForm.rePassword" placeholder="确认密码"
                      prefix-icon="el-icon-wqs-suoding"
                      clearable/>
          </el-form-item>
          <el-form-item label="用户头像:" prop="picLocation">
            <div class="avatar-uploader">
              <img-upload v-on:upload-pic="uploadPic" :options="options"></img-upload>
            </div>
          </el-form-item>
          <el-form-item style="padding-top: 15px;">
            <el-button style="float: left;" type="primary" @click="submitForm('registerForm')">立即创建</el-button>
            <el-button style="float: left;" @click="resetForm('registerForm')">重置</el-button>
            <el-button style="float:right;" @click="returnLoginPage">返回登录页面</el-button>
          </el-form-item>
        </el-form>
      </section>
    </div>
  </div>
</template>

<script>
import ImgUpload from '@/components/ImgUpload'
export default {
  components: {
    ImgUpload
  },
  data () {
    const isRegister = this.validPhoneNumber
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
      options: {
        fixedNumber: [1, 1]
      },
      registerForm: {
        phone: '',
        nickName: '',
        password: '',
        rePassword: '',
        picLocation: ''
      },
      rules: {
        phone: [
          {required: true, message: '请输入电话号码', trigger: 'blur'},
          {min: 11, max: 11, message: '输入正确的电话号码', trigger: 'blur'},
          {pattern: /^1[34578]\d{9}$/, message: '输入正确的电话号码', trigger: 'blur'},
          {validator: isRegister, trigger: 'blur'}
        ],
        nickName: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {min: 1, message: '长度过短', trigger: 'blur'},
          {max: 12, message: '长度过长', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 5, message: '长度过短', trigger: 'blur'},
          {max: 11, message: '长度过长', trigger: 'blur'}
        ],
        rePassword: [
          {required: true, message: '不能为空!', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ],
        picLocation: [
          {required: true, message: '请先上传图片', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    async uploadPic (data) {
      this.$api.requestApi.post('/user/imageUpload/', data)
        .then(res => {
          console.log(res.data)
          this.registerForm.picLocation = res.data.data
          console.log(this.registerForm.picLocation)
        })
        .catch(err => {
          console.log(err)
        })
    },
    returnLoginPage () {
      this.$router.push('/login')
    },
    async validPhoneNumber () {
      this.$api.requestApi.getJson('/user/userValid/' + this.registerForm.phone)
        .then(res => {
          console.log(res.data)
          const value = res.data.code
          if (value === 1003) {
            this.$message({
              message: '公司无此员工或尚未录入此员工信息!',
              type: 'error'
            })
          } else if (value === 1004) {
            this.$message({
              message: '公司无此员工或尚未录入此员工信息!',
              type: 'error'
            })
          }
          return res.data.code === 0
        })
        .catch(err => {
          console.log(err)
        })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this[formName].password = this.$commonsMethod.encryptedData(this[formName].password)
          this[formName].rePassword = this.$commonsMethod.encryptedData(this[formName].rePassword)
          this.$api.postRequestApi.post('/user/register', this.registerForm)
            .then(res => {
              console.log(res.data)
              if (res.data.code === 0) {
                this.$message({
                  message: '注册成功!',
                  type: 'success'
                })
                this.$router.push('/login')
              } else {
                this.$message.error('注册失败!')
              }
            })
            .catch(err => {
              this.$message.error('未知错误，请联系管理员!')
              console.log(err)
            })
        }
      })
    }
  }
}
</script>

<style lang="less">
  @import "../style/style";

  .form-container {
    .global-centre(600px, 660px);
    .width-and-height(600px, 660px);
    background: rgba(255, 255, 255, 0.6);
    border-radius: 20px;
  }

  .background-pic {
    .background-img("../assets/img/register.jpg");
  }

  .avatar-uploader {
    float: left;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    background: rgba(255, 255, 255, 0.5);
    border: 2px dashed #8c939d;
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
