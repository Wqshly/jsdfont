<template>
  <div style="height: 100%">
    <div class="main-style">
      <div class="toolbar-style">
        <h2 class="title-style">选择操作</h2>
        <el-button class="menu-item" @click.native="changeChoice(1)">
          <i class="el-icon-view icon-style"></i>
          <div class="menu-content">效果预览</div>
        </el-button>
        <el-button class="menu-item" @click.native="changeChoice(2)">
          <i class="el-icon-upload icon-style"></i>
          <div class="menu-content">添加图片(无链接)</div>
        </el-button>
        <el-button class="menu-item" @click.native="changeChoice(3)">
          <i class="el-icon-upload2 icon-style"></i>
          <div class="menu-content">添加图片(有链接)</div>
        </el-button>
        <el-button class="menu-item" @click.native="changeChoice(4)">
          <i class="el-icon-edit-outline icon-style"></i>
          <div class="menu-content">编辑图片</div>
        </el-button>
        <el-button class="menu-item" @click.native="changeChoice(5)">
          <i class="el-icon-delete icon-style"></i>
          <div class="menu-content">删除图片</div>
        </el-button>
      </div>
      <div class="toolbar-style">
        <h2 class="title-style dynamic-title">{{titleName}}</h2>
        <template v-if="this.choice === 1">
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </template>
        <template v-if="this.choice === 2">
          <el-row>
            <el-col :span="11">
              <h2 class="title-style">网络图片</h2>
              <el-form label-width="100px" style="margin: 15px;">
                <el-form-item label="输入网址">
                  <el-input placeholder="在此处输入网络图片的网址">
                    <el-button slot="append">确认上传</el-button>
                  </el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="1">
              <el-divider direction="vertical" content-position="center"></el-divider>
            </el-col>
            <el-col :span="2">
              <h2 class="title-style">本地图片</h2>
            </el-col>
            <el-col :span="10">
              <img-upload v-on:upload-pic="uploadPic" :options="options" style="margin: 15px 60px;"></img-upload>
              <el-button style="float: right;margin-right: 30px;" type="primary" @click="submitPic()">确认上传</el-button>
            </el-col>
          </el-row>
        </template>
        <template v-if="this.choice === 3">
          <el-row>
            <el-col :span="11">
              <h2 class="title-style">网络图片</h2>
              <el-form label-width="100px" style="margin: 15px;">
                <el-form-item label="绑定链接">
                  <el-input placeholder="在此处输入图片绑定的链接">
                  </el-input>
                </el-form-item>
                <el-form-item label="输入网址">
                  <el-input placeholder="在此处输入网络图片的网址">
                  </el-input>
                </el-form-item>
                <el-button style="float: right;" type="primary">确认</el-button>
              </el-form>
            </el-col>
            <el-col :span="1">
              <el-divider direction="vertical" content-position="center"></el-divider>
            </el-col>
            <el-col :span="12">
              <h2 class="title-style">本地图片</h2>
              <el-form label-width="100px">
                <el-form-item label="绑定链接">
                  <el-input placeholder="在此处输入图片绑定的链接">
                  </el-input>
                </el-form-item>
                <el-form-item label="上传图片" style="width: 600px;float: left">
                    <img-upload v-on:upload-pic="uploadPic" :options="options"></img-upload>
                </el-form-item>
                <el-button style="float: right;margin-top: 90px;" type="primary" @click="submit()">确认上传</el-button>
              </el-form>
            </el-col>
          </el-row>
        </template>
        <template v-if="this.choice === 4">
          <el-row>
            <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
              <el-card :body-style="{ padding: '0px' }">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                <div style="padding: 14px;">
                  <span>好吃的汉堡</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <el-button type="text" class="button">操作按钮</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </template>
        <template v-if="this.choice === 5">
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import TableTemplate from '@/components/TableTemplate'
import ImgUpload from '@/components/ImgUpload'

export default {
  name: 'picManage',
  data () {
    return {
      currentDate: new Date(),
      imageFile: {
        name: '',
        type: '',
        file: ''
      },
      options: {
        fixedNumber: [7, 5]
      },
      choice: 1,
      imageUploadForm: {
        path: '',
        linkPath: ''
      },
      titleName: '效果预览',
      finalEditor: sessionStorage.getItem('save_username')
    }
  },
  components: {
    TableTemplate,
    ImgUpload
  },
  methods: {
    async submitPic () {
      this.$api.requestApi.post('/picture/uploadPicture', this.imageFile)
        .then(res => {
          console.log(res.data)
          this.imageUploadForm.path = res.data.data
          this.imageUploadForm.finalEditor = this.finalEditor
          console.log(this.imageUploadForm)
          this.$api.requestApi.post('/picture/addPicture', this.imageUploadForm)
            .then(res => {
              if (res.data.code === 0) {
                this.$message({
                  message: '上传成功！',
                  type: 'success'
                })
                this.imageFile = null
                console.log(this.imageFile)
              } else {
                this.$message.error('上传失败!')
              }
            })
            .catch()
        })
        .catch(err => {
          console.log(err)
        })
    },
    async uploadPic (data) {
      this.imageFile = data
      console.log(this.imageFile)
    },
    changeChoice (choice) {
      if (choice === 1) {
        this.titleName = '效果预览'
      }
      if (choice === 2) {
        this.titleName = '添加图片'
      }
      if (choice === 3) {
        this.titleName = '添加图片'
      }
      if (choice === 4) {
        this.titleName = '编辑图片'
      }
      if (choice === 5) {
        this.titleName = '删除图片'
      }
      this.choice = choice
    },
    buttonReset (ev) {
      let target = ev.target
      if (target.nodeName === 'SPAN') {
        target = ev.target.parentNode
      } else if (target.nodeName === 'I' || target.nodeName === 'DIV') {
        target = ev.target.parentNode.parentNode
      }
      target.blur()
    }
  }
}
</script>

<style scoped>
  .el-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 16em;
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
  }

  .main-style {
    padding-right: 5px;
    height: 100%;
    overflow: auto;
  }

  .toolbar-style {
    margin: 20px 0;
    min-height: 200px;
    /*width: 100%;*/
    padding: 24px 40px;
    background-color: #FFFFFF;
    border-radius: 15px;
  }

  .title-style {
    padding: 15px 0;
    font-size: 20px;
    font-weight: 400;
    line-height: 1;
    font-family: -apple-system-font, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", Arial, sans-serif;
  }

  .menu-item {
    height: 140px;
    margin-right: 10px;
    border: 1px dashed #dfe3e5;
    display: flex;
    justify-content: center;
    cursor: pointer;
    float: left;
    width: 200px;
  }

  .icon-style {
    font-size: 30px;
    display: inline-block;
    vertical-align: middle;
    width: 32px;
    height: 32px;
    background-size: cover;
    margin-top: 30px;
    margin-bottom: 20px;
  }

  .menu-content {
    text-align: center;
    position: relative;
  }

  .dynamic-title {
    text-align: center;
    font-size: 2.5em;
    margin: 15px auto;
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

  .avatar {
    width: 350px;
    height: 250px;
  }
</style>
