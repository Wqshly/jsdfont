<template>
  <div style="height: 100%;overflow: auto;background: #f5f5f5;">
    <div class="article-header">
    </div>
    <div class="main-style">
      <div class="center-style">
        <el-form :model="articleForm" label-width="100px" style="padding-right: 20px;padding-top: 50px;padding-bottom: 30px;" ref="articleForm" :rules="articleFormRule">
          <el-form-item label="标题:" prop="title">
            <el-input placeholder="请在此处输入标题" v-model="articleForm.title"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="作者:" prop="author">
                <el-input placeholder="请在此处输入作者" v-model="articleForm.author"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="类别:" prop="sortName">
                <el-select placeholder="请选择" @click.native="getArticleType()" v-model="articleForm.sortName">
                  <el-option
                    v-for="item in articleType"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="摘要:" prop="introduction">
            <el-input type="textarea" :rows="5" placeholder="请在此处输入摘要" v-model="articleForm.introduction"></el-input>
          </el-form-item>
          <el-form-item label="正文内容:" prop="content">
            <rich-text height="800" :toolbar="toolbar" v-model="articleForm.content"></rich-text>
          </el-form-item>
          <div class="footer">
            <el-form-item style="padding-top: 15px;padding-bottom: 10px">
              <el-button style="float: right; margin-right: 10px;width: 100px;" type="primary" @click="submit">提交
              </el-button>
              <el-button style="float: right; margin-right: 10px;width: 100px;" @click="preview">预览</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="countdownDialog"
      :show-close=false
      :close-on-click-modal=true
      :close-on-press-escape=false
      width="30%"
      center>
      <span style="font-size:18px;">已成功添加文章！该窗口将于{{second}}秒后关闭！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="windowClose" type="primary" :disabled="isDisabled">立即关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from '@/components/ImgUpload'
import RichText from '@/components/RichText'

export default {
  name: 'textArticle',
  components: {
    ImgUpload,
    RichText
  },
  data: function () {
    const sortNameValid = (rule, value, callback) => {
      if (value === '请选择') {
        callback(new Error('请选择类别!'))
      } else {
        callback()
      }
    }
    return {
      countdownDialog: false, // 控制弹出
      second: 5, // 设置初始倒计时
      isDisabled: false,
      editorOption: {
        placeholder: '输入文章内容'
      },
      articleForm: {
        sortName: '',
        title: '',
        author: '',
        introduction: '',
        picLink: '',
        content: '',
        createTime: '',
        updateTime: '',
        titleStatus: ''
      },
      articleFormRule: {
        title: [
          {required: true, message: '标题不能为空!', trigger: 'blur'}
        ],
        author: [
          {required: true, message: '作者不能为空!', trigger: 'blur'}
        ],
        sortName: [
          {required: true, message: '请选择类别!', trigger: 'blur'},
          {validator: sortNameValid, trigger: 'blur'}
        ],
        introduction: [
          {required: true, message: '摘要不能为空!', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '正文不能为空!', trigger: 'blur'}
        ]
      },
      toolbar: ['undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | removeformat'],
      articleType: []
    }
  },
  methods: {
    windowClose () {
      window.close()
    },
    getSecond () {
      const that = this
      const interval = window.setInterval(function () {
        --that.second
        if (that.second === 0) {
          that.isDisabled = false
          window.clearInterval(interval)
          window.close()
        }
      }, 1000)
    },
    getArticleType () {
      this.$api.requestApi.get('/basicCoding/findBasicCodingWithType/articleType')
        .then(res => {
          this.articleType = res.data
          if (res.data.length === 0) {
            this.articleType.unshift({name: '无分类，请先添加分类！', number: 'Null'})
          }
        })
        .catch(err => {
          this.$message({
            message: '网络请求失败',
            type: 'error'
          })
          console.log(err.data)
        })
    },
    submit () {
      this.$refs.articleForm.validate((valid) => {
        if (valid) {
          this.$api.requestApi.postJson('/article/addArticle', this.articleForm).then(res => {
            this.countdownDialog = true
            this.getSecond()
          })
        }
      })
    },
    preview () {
    }
  }
}
</script>

<style lang="less" scoped>
  .main-style {
    background: #f5f5f5;
    padding-right: 30px;
    padding-top: 60px;
    padding-bottom: 60px;
  }

  .center-style {
    width: 800px;
    margin: 0 auto;
    background: #FFFFFF;
  }

  .article-header {
    right: 17px;
    display: block;
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    font-size: 22px;
    color: #fff;
    border-radius: 5px;
    background: #FFFFFF;
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, .1);
    z-index: 1;
  }

  .info-header {
    position: fixed;
    z-index: 2;
    width: 100%;
    top: 0;
    height: 60px;
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgba(238, 238, 238, 0.5);
  }

  .footer {
    position: fixed;
    bottom: 0;
    height: 60px;
    width: 800px;
    background: #FFFFFF;
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, .1);
    z-index: 2;
  }
</style>

<style lang="less">

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

</style>
