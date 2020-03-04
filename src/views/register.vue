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
          <el-form-item label="用户头像:" prop="picLocal">
            <el-upload
              v-model="registerForm.picLocation"
              accept="image/jpeg,image/png"
              class="avatar-uploader"
              name="picture"
              action="http://localhost:8088/api/user/imageUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-error="handleAvatarFailed"
              :before-upload="beforeAvatarUpload">
              <img v-if="registerForm.imageUrl" :src="registerForm.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
export default {
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
      imageUrl: '',
      registerForm: {
        phone: '',
        password: '',
        rePassword: '',
        imageUrl: '',
        picLocation: ''
      },
      rules: {
        phone: [
          {required: true, message: '请输入电话号码', trigger: 'blur'},
          {min: 11, max: 11, message: '输入正确的电话号码', trigger: 'blur'},
          {pattern: /^1[34578]\d{9}$/, message: '输入正确的电话号码', trigger: 'blur'},
          {validator: isRegister, message: '该员工不存在或公司尚未录入该员工信息,请待录入信息后再进行注册!', trigger: 'blur'}
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
    returnLoginPage () {
      this.$router.push('/login')
    },
    validPhoneNumber () {
      this.$api.requestApi.postJson('/staff/staffValid', this.registerForm.phone)
        .then(res => {
          if (res.data.data === false) {
            this.$message({
              message: '公司无此员工或尚未录入此员工信息!',
              type: 'error'
            })
            return false
          } else {
            return true
          }
        })
        .catch()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.postRequestApi.post('/user/register', this.registerForm)
        }
      })
    },
    handleAvatarSuccess (res, file) {
      if (res) {
        console.log(file)
        this.registerForm.imageUrl = URL.createObjectURL(file.raw)
        this.registerForm.picLocation = res.data
        console.log(this.registerForm.picLocation)
      } else {
        this.$message({
          message: '上传头像失败，请重新上传',
          type: 'error'
        })
      }
    },
    handleAvatarFailed () {
      this.$message({
        message: '上传头像失败，请重新上传',
        type: 'error'
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="less" scoped>
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
    width: 178px;
    height: 178px;
    display: block;
  }

  .avatar-uploader {
    float: left;
  }
</style>
