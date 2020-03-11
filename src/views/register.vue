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
                      :onblur="validPhoneNumber" clearable/>
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
            <el-upload class="avatar-uploader" action='string' :before-upload="beforeUpload"
                       :auto-upload="false" :show-file-list="false" :on-change='changeUpload'>
              <img v-if="uploadSuccess" :src="imageFile.file" class="avatar">
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
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
          <vue-cropper
            ref="cropper"
            :img="option.image"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :fixedBox="option.fixedBox"></vue-cropper>
        </div>
      </div>
      <div slot="footer">
        <el-button type="primary" @click.native="uploadPicture">确认</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
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
      uploadSuccess: false,
      dialogVisible: false,
      option: {
        image: '',
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      loading: false, // 防止重复提交
      registerForm: {
        phone: '',
        nickName: '',
        password: '',
        rePassword: '',
        picLocation: ''
      },
      imageFile: {
        name: '',
        type: '',
        file: ''
      },
      rules: {
        phone: [
          {required: true, message: '请输入电话号码', trigger: 'blur'},
          {min: 11, max: 11, message: '输入正确的电话号码', trigger: 'blur'},
          {pattern: /^1[34578]\d{9}$/, message: '输入正确的电话号码', trigger: 'blur'},
          {validator: isRegister, message: '该员工不存在或公司尚未录入该员工信息,请待录入信息后再进行注册!', trigger: 'blur'}
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
    async beforeUpload (file) {
      const minSize = file.size / 1024 > 20
      const maxSize = file.size / 1024 / 1024 < 8
      if (!minSize) {
        this.$message.error('上传图片大小不能小于20k')
      } else if (!maxSize) {
        this.$message.error('上传图片最大不能大于8M')
      }
    },
    async changeUpload (file) {
      this.dialogVisible = true
      this.fileinfo = file
      console.log(file)
      this.option.image = window.URL.createObjectURL(file.raw)
      this.$nextTick(() => {
        console.log(this.option.image)
      })
    },
    async uploadPicture () {
      this.$refs.cropper.getCropData((data) => {
        const splitName = this.fileinfo.name.split('.')
        const type = splitName[splitName.length - 1]
        this.imageFile.name = 'user' + this.fileinfo.uid + '.' + type
        this.imageFile.file = data
        this.$api.requestApi.post('/user/imageUpload/', this.imageFile)
          .then(res => {
            console.log(res.data)
            this.registerForm.picLocation = res.data.data
            this.dialogVisible = false
            this.uploadSuccess = true
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    returnLoginPage () {
      this.$router.push('/login')
    },
    async validPhoneNumber () {
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
    async submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this[formName].password = this.$commonsMethod.encryptedData(this[formName].password)
          this[formName].rePassword = this.$commonsMethod.encryptedData(this[formName].rePassword)
          this.$api.postRequestApi.post('/user/register', this.registerForm)
            .then(res => {
              console.log(res.data)
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
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
    width: 120px;
    height: 120px;
    display: block;
  }

  .avatar-uploader {
    float: left;
  }

  .cropper-content {
    .cropper {
      width: auto;
      height: 300px;
    }
  }
</style>
