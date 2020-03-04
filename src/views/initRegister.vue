<template>
  <div class="fill-contain background-pic">
    <div class="form-container">
      <section class="main-form">
        <h2 class="title">初&nbsp;始&nbsp;用&nbsp;户&nbsp;设&nbsp;置</h2>
        <el-form class="form-style" :model="initRegisterForm" :rules="rules" label-width="100px"
                 style="padding-top: 50px;padding-right: 100px;" ref="initRegisterForm">
          <el-form-item label="姓名:" prop="name">
            <el-input v-model="initRegisterForm.name" placeholder="请输入姓名"
                      prefix-icon="el-icon-wqs-shezhi-zhanghaoguanli"
                      clearable/>
          </el-form-item>
          <el-form-item label="昵称:" prop="nickName">
            <el-input v-model="initRegisterForm.nickName" placeholder="请输入昵称"
                      prefix-icon="el-icon-wqs-shezhi-zhanghaoguanli"
                      clearable/>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input type="password" v-model="initRegisterForm.password" placeholder="请输入密码"
                      prefix-icon="el-icon-wqs-shezhi-zhanghaoguanli"
                      clearable/>
          </el-form-item>
          <el-form-item label="密码:" prop="rePassword">
            <el-input type="password" v-model="initRegisterForm.rePassword" placeholder="请重复密码"
                      prefix-icon="el-icon-wqs-shezhi-zhanghaoguanli"
                      clearable/>
          </el-form-item>
          <el-form-item label="性别:" prop="sex">
            <el-radio v-model="initRegisterForm.sex" label="男">男</el-radio>
            <el-radio v-model="initRegisterForm.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="手机号:" prop="phone">
            <el-input v-model="initRegisterForm.phone" placeholder="请输入姓名"
                      prefix-icon="el-icon-wqs-shezhi-zhanghaoguanli"
                      clearable/>
          </el-form-item>
          <el-form-item label="身份证号:" prop="identify">
            <el-input v-model="initRegisterForm.identify" placeholder="请输入姓名"
                      prefix-icon="el-icon-wqs-shezhi-zhanghaoguanli"
                      clearable/>
          </el-form-item>
          <el-form-item label="用户头像:" prop="picLocal">
            <el-upload
              v-model="initRegisterForm.picLocation"
              accept="image/jpeg,image/png"
              class="avatar-uploader"
              name="picture"
              action="http://localhost:8088/api/user/imageUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-error="handleAvatarFailed"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="initRegister('initRegisterForm')">立即创建</el-button>
            <el-button @click="resetForm('initRegisterForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'initRegister',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.initRegisterForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const idCardValidity = (rule, code, callback) => {
      const city = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江 ',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北 ',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏 ',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外 '
      }
      let tip = ''
      let pass = true

      if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        tip = '身份证号格式错误'
        pass = false
      } else if (!city[code.substr(0, 2)]) {
        tip = '地址编码错误'
        pass = false
      }
      if (!pass) {
        callback(new Error(tip))
      } else {
        callback()
      }
    }
    return {
      imageUrl: '',
      initRegisterForm: {
        name: '',
        nickName: '',
        password: '',
        rePassword: '',
        sex: '男',
        phone: '',
        identify: '',
        picLocation: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
        ],
        nickName: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {max: 11, message: '长度在 12 个字符以内', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 5, message: '长度过短', trigger: 'blur'},
          {max: 18, message: '长度过长', trigger: 'blur'}
        ],
        rePassword: [
          {validator: validatePass, trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入电话号码', trigger: 'blur'},
          {min: 11, max: 11, message: '输入正确的电话号码', trigger: 'blur'},
          {pattern: /^1[34578]\d{9}$/, message: '输入正确的电话号码', trigger: 'blur'}
        ],
        identify: [
          {required: true, message: '请输入身份证号', trigger: 'blur'},
          {
            pattern: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
            message: '请输入正确的证件号'
          },
          {validator: idCardValidity, trigger: 'blur'}
        ],
        picLocation: [
          {required: true, message: '请先上传图片', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    initRegister (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this[formName].password = this.$commonsMethod.encryptedData(this[formName].password)
          this[formName].rePassword = this.$commonsMethod.encryptedData(this[formName].rePassword)
          this.$api.requestApi.post('/user/initRegister', this[formName])
            .then(res => {
              if (res.data.code === 2002) {
                this.$confirm('初始用户已存在!', '提示', {
                  confirmButtonText: '确定'
                })
              } else if (res.data.code === 0) {
                this.$confirm('初始用户注册成功!', '提示', {
                  confirmButtonText: '确定'
                }).then(
                  this.$router.push('/login')
                )
              } else {
                this.$confirm('未知错误，请及时联系管理员!', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消'
                })
              }
              console.log(res.data)
            })
            .catch((res) => {
              console.log(res)
              this.$confirm('未知错误，请及时联系管理员!', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              })
            }
            )
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleAvatarSuccess (res, file) {
      if (res) {
        console.log(file)
        this.imageUrl = URL.createObjectURL(file.raw)
        this.initRegisterForm.picLocation = res.data
        console.log(this.initRegisterForm.picLocation)
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

  .background-pic {
    background-image: url("../assets/img/register.jpg");
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .title {
    text-align: center;
    margin: 20px auto;
    font-size: 30px;
  }

  .form-container {
    text-align: center;
    border-radius: 30px;
    background: rgba(255, 255, 255, 0.5);
    overflow: hidden;
    width: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
  }

  .form-style {
    margin: 20px auto;
  }

  .row-style {
    text-align: start;
    height: 50px;
    width: 400px;
    margin: auto;
  }

  .p-style {
    width: 100px;
    float: left;
    text-align: left;
  }

  .input-style {
    width: 250px;
    height: 30px;
    float: left;
    border: 1px solid #f2f2f2;
    border-radius: 10px;
    padding: 0 0 0 10px;
  }

  .sex-input {
    margin: 0 10px 0 40px;
  }

  .button {
    background: #fff;
    width: 300px;
    height: 40px;
    float: left;
    border: 1px solid #f2f2f2;
    border-radius: 10px;
    cursor: pointer;
  }

  .button:focus {
    outline: none;
    background-color: #fff;
  }

  .input-style::-ms-input-placeholder {
    text-align: center;
  }

  .input-style::-moz-placeholder {
    text-align: center;
  }

  .input-style::-webkit-input-placeholder {
    text-align: center;
  }

  .input-button {
    margin: 15px auto;
    width: 300px;
    height: 50px;
  }

  .input-style:focus {
    outline: none;
    border-color: #5591a6;
    background-color: #fff;
  }

  .input-style::-webkit-input-placeholder { /* WebKit browsers */
    color: #bababa;
  }

  .input-style:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #bababa;
  }

  .input-style::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #bababa;
  }

  .input-style:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #bababa;
  }

  .import-sign {
    float: left;
    margin: 0 0 0 15px;
    color: #ff0000;
    padding: 5px;
    font-size: 20px;
  }

  .tips-content {
    text-align: center;
    font-size: 20px;
    margin: 15px auto;
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
