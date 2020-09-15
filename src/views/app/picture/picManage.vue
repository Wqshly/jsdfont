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
          <div class="menu-content">添加图片</div>
        </el-button>
        <el-button class="menu-item" @click.native="changeChoice(3)">
          <i class="el-icon-edit-outline icon-style"></i>
          <div class="menu-content">编辑图片</div>
        </el-button>
      </div>
      <div class="toolbar-style">
        <h2 class="title-style dynamic-title">{{titleName}}</h2>
        <template v-if="this.choice === 1">
          <div ref="carousel">
            <el-carousel indicator-position="outside" :height="carouselHeight + 'px'">
              <el-carousel-item v-for="item in picImage" :key="item.id" :name="item.id">
                <template v-if="item.linkPath !== null && item.linkPath !== ''">
                  <a :href="item.linkPath" target="_blank"><img style="width:100%;height:100%;" v-lazy="item.path" alt="加载超时"/></a>
                </template>
                <template v-else>
                  <img style="width:100%;height:100%;" v-lazy="item.path" alt="加载超时"/>
                </template>
              </el-carousel-item>
            </el-carousel>
          </div>
        </template>
        <template v-if="this.choice === 2">
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
              <el-form :model="imageUploadForm" label-width="100px" ref="imageUploadForm">
                <el-form-item label="绑定链接" prop="linkPath">
                  <el-input v-model="imageUploadForm.linkPath" placeholder="在此处输入图片绑定的链接(可不填)" clearable></el-input>
                </el-form-item>
                <el-form-item label="上传图片" style="width: 600px;float: left">
                  <img-upload ref="imgUpload" v-on:upload-pic="uploadPic" :options="options" style="margin: 15px 60px;"></img-upload>
                </el-form-item>
                <el-button style="float: right;margin-top: 90px;" type="primary" @click="submitPic()">确认上传</el-button>
              </el-form>
            </el-col>
          </el-row>
        </template>
        <template v-if="this.choice === 3">
          <el-row>
            <el-col :span="8" v-for="item in picImage" :key="item" style="max-width: 100%;max-height: 100%;">
              <el-card :body-style="{ padding: '0px' }">
                <el-button class="card-btn">
                  <img class="card-img" v-lazy="item.path" alt="加载超时"/>
                </el-button>
              </el-card>
            </el-col>
          </el-row>
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
      carouselWidth: 0,
      carouselHeight: 0,
      picImage: {},
      imageUploadForm: {
        path: '',
        linkPath: ''
      },
      currentDate: new Date(),
      imageFile: {
        name: '',
        type: '',
        file: ''
      },
      options: {
        fixedNumber: [8, 3]
      },
      choice: 1,
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
                this.$refs.imgUpload.uploadSuccess = false
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
        this.$api.requestApi.get('/picture/findAllPicture').then(res => {
          console.log(res.data)
          this.picImage = res.data.data
        }).catch()
        this.titleName = '效果预览'
      }
      if (choice === 2) {
        this.titleName = '添加图片'
      }
      if (choice === 3) {
        this.$api.requestApi.get('/picture/findAllPicture').then(res => {
          console.log(res.data)
          this.picImage = res.data.data
        }).catch()
        this.titleName = '编辑图片'
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
    },
    setSize: function () {
      this.carouselHeight = 3 / 8 * this.carouselWidth
    }
  },
  mounted () {
    this.carouselWidth = this.$refs.carousel.offsetWidth
    this.setSize()
    window.onresize = () => {
      this.carouselWidth = this.$refs.carousel.offsetWidth
      this.setSize()
    }
    this.$api.requestApi.get('/picture/findAllPicture').then(res => {
      console.log(res.data)
      this.picImage = res.data.data
    }).catch()
  }
}
</script>

<style scoped>

  .card-img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
    object-fit:cover;
    width: auto;
    height: auto;
  }

  .card-btn :hover .card-img {
    filter:alpha(Opacity=80);
    -moz-opacity:0.8;
    opacity: 0.8;
  }

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
