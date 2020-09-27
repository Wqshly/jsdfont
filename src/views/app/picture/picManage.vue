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
        <div ref="carousel">
          <template v-if="this.choice === 1">
            <el-carousel indicator-position="outside" :height="carouselHeight + 'px'">
              <el-carousel-item v-for="item in picImage" :key="item.id" :name="item.id">
                <template v-if="item.linkPath !== null && item.linkPath !== ''">
                  <a :href="item.linkPath" target="_blank">
                    <img style="width:100%;height:100%;" v-lazy="item.path" alt="加载超时"/>
                  </a>
                </template>
                <template v-else>
                  <img style="width:100%;height:100%;" v-lazy="item.path" alt="加载超时"/>
                </template>
              </el-carousel-item>
            </el-carousel>
          </template>
          <template v-if="this.choice === 2">
            <el-row>
              <el-col :span="11">
                <h2 class="title-style">网络图片</h2>
                <el-form :model="webImgUploadForm" label-width="100px" style="margin: 15px;" ref="webImgUploadForm">
                  <el-form-item label="绑定链接" prop="linkPath">
                    <el-input v-model="webImgUploadForm.linkPath" placeholder="在此处输入图片绑定的链接">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="输入网址" prop="path">
                    <el-input v-model="webImgUploadForm.path" placeholder="在此处输入网络图片的网址">
                    </el-input>
                  </el-form-item>
                  <el-button style="float: right;" type="primary" @click="addPicRecord('webImgUploadForm')">确认
                  </el-button>
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
                    <img-upload ref="imgUpload" v-on:upload-pic="uploadPic" :options="options"
                                style="margin: 15px 60px;" img-width="240px" img-height="120px"></img-upload>
                  </el-form-item>
                  <el-button style="float: right;margin-top: 90px;" type="primary" @click="submitPic()">确认上传</el-button>
                </el-form>
              </el-col>
            </el-row>
          </template>
          <template v-if="this.choice === 3">
            <div ref="card">
              <el-row>
                <el-col :span="8" v-for="item in picImage" :key="item"
                        :style="{'height': carouselHeight/3 + 30 + 'px'}">
                  <el-card class="card-btn-show">
                    <div class="card-icon">
                      <el-button class="icon-appearance" @click.native="letForward(item.id)">
                        <i class="el-icon-arrow-left card-icon-style"></i>
                        <div class="menu-content">向前一张</div>
                      </el-button>
                      <el-button class="icon-appearance" @click.native="editImgInfo(item)">
                        <i class="el-icon-edit card-icon-style"></i>
                        <div class="menu-content">编辑链接</div>
                      </el-button>
                      <el-button class="icon-appearance" @click.native="deleteImg(item.id)">
                        <i class="el-icon-delete card-icon-style"></i>
                        <div class="menu-content">删除图片</div>
                      </el-button>
                      <el-button class="icon-appearance" @click.native="letNext(item.id)">
                        <i class="el-icon-arrow-right card-icon-style"></i>
                        <div class="menu-content">向后一张</div>
                      </el-button>
                    </div>
                    <img class="card-img" v-lazy="item.path" alt="加载超时"/>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </template>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="editImgDialogVisible" title="编辑图片信息" :close-on-click-modal="false" ref="editImgInfo">
      <el-form :model="editImgForm" label-width="100px" ref="editImgForm">
        <template v-if="isLocalPic()">
          <el-form-item label="图片路径" prop="path">
            <el-input v-model="editImgForm.path"></el-input>
          </el-form-item>
        </template>
        <el-form-item label="图片链接" prop="linkPath">
          <el-input v-model="editImgForm.linkPath"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click.native="editSave">保存</el-button>
      <el-button @click.native="editImgDialogVisible = false">取消</el-button>
    </el-dialog>
  </div>
</template>

<script>
import TableTemplate from '@/components/TableTemplate'
import ImgUpload from '@/components/ImgUpload'

export default {
  name: 'picManage',
  data () {
    return {
      editImgForm: {
        path: '',
        linkPath: ''
      },
      editImgDialogVisible: false,
      deleteId: [],
      carouselWidth: 0,
      carouselHeight: 0,
      picImage: {},
      webImgUploadForm: {
        path: '',
        linkPath: ''
      },
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
    editSave () {
      this.$api.requestApi.post('/picture/editPicture', this.editImgForm)
        .then(res => {
          this.editImgDialogVisible = false
          this.$message.success('修改成功')
        })
        .catch()
    },
    isLocalPic () {
      return !this.editImgForm.path.includes('39.107.49.176')
    },
    letForward (id) {
      // if (id ) {}
      this.$api.requestApi.get('/picture/exchangePreId/' + id)
        .then(res => {
          this.getPicInfo()
        })
    },
    letNext (id) {
      this.$api.requestApi.get('/picture/exchangeNextId/' + id)
        .then(res => {
          this.getPicInfo()
        })
    },
    editImgInfo (data) {
      this.editImgForm = data
      this.editImgDialogVisible = true
    },
    async deleteImg (data) {
      try {
        this.deleteId.push(data)
        this.$confirm('确认删除该图片？', '提示', {
          type: 'warning'
        })
          .then(() => {
            this.$api.requestApi.get('/picture/deletePicture/' + data)
              .then(res => {
                if (res.code === 0) {
                  this.getPicInfo()
                  this.$message.success('删除成功')
                } else {
                  this.$message.error('删除失败')
                }
              }).catch(err => {
                console.log(err.data)
              })
          })
          .catch(() => {
          })
      } catch (e) {
        console.log(e)
        this.$message({
          message: '未知错误!',
          type: 'error'
        })
      }
    },
    async addPicRecord (formName) {
      this.$api.requestApi.post('/picture/addPicture', this[formName])
        .then(res => {
          if (res.code === 0) {
            this.$message.success('上传成功!')
          } else {
            this.$message.error('上传失败!')
          }
          this.$refs[formName].resetFields()
        })
        .catch()
    },
    async submitPic () {
      this.$api.requestApi.post('/picture/uploadPicture', this.imageFile)
        .then(res => {
          if (res.code === 0) {
            this.imageUploadForm.path = res.data
            this.imageUploadForm.finalEditor = this.finalEditor
            this.addPicRecord('imageUploadForm')
            this.$refs.imgUpload.uploadSuccess = false
            this.imageFile = null
          } else {
            this.$message.error('图片提交失败!')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    async uploadPic (data) {
      this.imageFile = data
    },
    changeChoice (choice) {
      if (choice === 1) {
        this.getPicInfo()
        this.titleName = '效果预览'
      }
      if (choice === 2) {
        this.titleName = '添加图片'
      }
      if (choice === 3) {
        this.getPicInfo()
        this.titleName = '编辑图片'
      }
      this.choice = choice
    },
    setSize: function () {
      this.carouselHeight = 3 / 8 * this.carouselWidth
    },
    async getPicInfo () {
      this.$api.requestApi.get('/picture/findAllPicture')
        .then(res => {
          this.picImage = res.data
        }).catch()
    }
  },
  mounted () {
    this.carouselWidth = this.$refs.carousel.offsetWidth
    this.setSize()
    window.onresize = () => {
      this.carouselWidth = this.$refs.carousel.offsetWidth
      this.setSize()
    }
    this.getPicInfo()
  }
}
</script>

<style lang="less" scoped>

  .icon-appearance {
    margin: 0 10px 0 10px;
    float: left;
    height: 60px;
    width: 60px;
    border: 1px dashed #dfe3e5;
    display: flex;
    justify-content: center;
    cursor: pointer;
  }

  .card-icon {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
    position: absolute;
    z-index: 9;
    justify-content: center;
    display: none;
  }

  .card-img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }

  .card-btn-show :hover .card-icon {
    display: block;
  }

  .card-btn-show :hover .card-img {
    filter: alpha(Opacity=80);
    -moz-opacity: 0.8;
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

  .card-icon-style {
    font-size: 30px;
    display: inline-block;
    vertical-align: middle;
    width: 32px;
    height: 32px;
    background-size: cover;
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

</style>
