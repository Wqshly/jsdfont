<template>
  <div style="height: 100%">
    <div class="main-style">
      <div class="toolbar-style">
        <h2 class="title-style">新的创作</h2>
        <div>
          <el-button class="menu-item" @click.native="typeManage">
            <i class="el-icon-setting icon-style"></i>
            <div class="menu-content">分类管理</div>
          </el-button>
          <el-button class="menu-item" @click.native="newTab('text-article', '/text-article')">
            <i class="el-icon-edit-outline icon-style"></i>
            <div class="menu-content">文字消息</div>
          </el-button>
          <el-button class="menu-item" @click.native="newTab('pic-article', '/pic-article')">
            <i class="el-icon-picture-outline icon-style"></i>
            <div class="menu-content">图文消息</div>
          </el-button>
          <el-button class="menu-item" @click.native="newTab('media-article', '/media-article')">
            <i class="el-icon-video-camera icon-style"></i>
            <div class="menu-content">视频消息</div>
          </el-button>
          <el-button class="menu-item" @click.native="newTab('model-manage', '/model-manage')">
            <i class="el-icon-s-order icon-style"></i>
            <div class="menu-content">模板管理</div>
          </el-button>
        </div>
      </div>
      <table-template
        ref="article"
        :refresh-url="refreshUrl"
        :add-url="addUrl"
        :edit-url="editUrl"
        :delete-url="deleteUrl"
        :table-title="tableTitle"
        :table-header-list="tableHeaderList"
        :table-p-k="tablePK"
        :button-boolean="buttonBoolean"
        @editRecord="editRecord"
        @select-row="selectRowClick">
        <!-- 新增窗口 -->
        <el-form slot="add" style="overflow: auto" label-width="100px" :model="addForm">
          <el-form-item label="编码" prop="staffId">
            <el-input v-model="addForm.number"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="staffId">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="资质类别" prop="startTime">
            <el-input v-model="addForm.category"></el-input>
          </el-form-item>
          <el-form-item label="生效时间" prop="endTime">
            <el-input v-model="addForm.entryIntoForceTime" placeholder="填写时间请按: 2005-05-30的格式填写"></el-input>
          </el-form-item>
          <el-form-item label="到期时间" prop="reasons">
            <el-input v-model="addForm.deadline"></el-input>
          </el-form-item>
        </el-form>
        <!-- 编辑窗口 -->
        <el-form slot="edit" :model="editForm" label-width="100px" :rules="editFormRule">

          <el-form-item label="标题:" prop="title">
            <el-input placeholder="请在此处输入标题" v-model="editForm.title"></el-input>
          </el-form-item>
          <el-form-item label="作者:" prop="author">
            <el-input placeholder="请在此处输入作者" v-model="editForm.author"></el-input>
          </el-form-item>
          <el-form-item label="类别:" prop="sortName">
            <el-select placeholder="请选择" @click.native="getArticleType()" v-model="editForm.sortName">
              <el-option
                v-for="item in articleType"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="封面:">
            <div class="avatar-uploader">
              <img-upload v-on:upload-pic="uploadPic" :options="options" img-height="120px"
                          img-width="120px"></img-upload>
            </div>
          </el-form-item>
          <el-form-item label="摘要:" prop="introduction">
            <el-input type="textarea" :rows="5" placeholder="请在此处输入摘要" v-model="editForm.introduction"></el-input>
          </el-form-item>
          <el-form-item label="正文内容:" prop="content">
            <rich-text height="800" v-model="editForm.content"></rich-text>
          </el-form-item>
        </el-form>
      </table-template>
    </div>
    <el-dialog title="分类管理" :visible.sync="typeManageVisible">
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="articleTypeForm.name"
        ref="saveTagInput"
        size="small"
        @blur="addArticleType"
        @keyup.enter.native="$event.target.blur"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加分类</el-button>
    </el-dialog>
  </div>
</template>

<script>
import TableTemplate from '@/components/TableTemplate'
import BasicTableTemp from '@/components/BasicTableTemp'
import ImgUpload from '@/components/ImgUpload'
import RichText from '@/components/RichText'

export default {
  name: 'articleManage',
  data () {
    const sortNameValid = (rule, value, callback) => {
      if (value === '请选择') {
        callback(new Error('请选择类别!'))
      } else {
        callback()
      }
    }
    return {
      imageFile: {
        name: '',
        type: '',
        file: ''
      },
      dynamicTags: [],
      articleType: [],
      options: {
        fixedNumber: [1, 1]
      },
      inputVisible: false,
      articleTypeForm: {name: ''},
      typeManageVisible: false,
      staffID: null,
      refreshObj: {},
      refreshUrl: 'article/findAllArticle',
      addUrl: 'article/addArticle',
      editUrl: 'article/editArticle',
      deleteUrl: 'article/deleteArticle',
      tableName: 'article',
      tableTitle: '文章管理', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'sortName', label: '文章类别', width: '140'},
        {value: 'title', label: '文章标题', width: '120'},
        {value: 'author', label: '作者', width: '120'},
        {value: 'introduction', label: '简介', width: '150'},
        {value: 'picLink', label: '缩略图', width: '150'},
        // {value: 'content', label: '正文内容', width: '120'},
        {value: 'titleStatus', label: '是否置顶', width: '120'},
        {value: 'createTime', label: '最后编辑时间', minWidth: '200'}
      ],
      addForm: {
        sortName: '',
        title: '',
        author: '',
        introduction: '',
        picLink: '',
        content: '',
        createTime: '',
        updateTime: '',
        titleStatus: ''
      }, // 新增数据界面
      editForm: {
        sortName: null,
        title: null,
        author: null,
        introduction: null,
        picLink: null,
        content: null,
        createTime: null,
        updateTime: null,
        titleStatus: null
      }, // 编辑数据界面
      editFormRule: {
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
      finalEditor: sessionStorage.getItem('save_username'),
      buttonBoolean: {
        addBtn: false,
        editBtn: true,
        deleteBtn: true,
        refreshBtn: true,
        import: false,
        export: false,
        acceptOrder: false
      }
    }
  },
  components: {
    TableTemplate,
    BasicTableTemp,
    ImgUpload,
    RichText
  },
  methods: {
    getArticleType () {
      this.$api.requestApi.get('/basicCoding/findBasicCodingWithType/articleType')
        .then(res => {
          console.log(res.data)
          this.articleType = res.data
          console.log(this.articleType)
          if (res.data.length === 0) {
            this.articleType.unshift({name: '无分类，请先添加分类！', number: 'Null'})
            console.log(this.articleType)
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
    async uploadPic (data) {
      this.imageFile = data
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      this.$api.requestApi.get('basicCoding/deleteBasicCoding/articleType/' + tag)
      console.log(tag)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    addArticleType () {
      if (this.articleTypeForm.name !== null && this.articleTypeForm.name !== '') {
        this.articleTypeForm.type = 'articleType'
        this.articleTypeForm.finalEditor = this.finalEditor
        this.$api.requestApi.post('basicCoding/addBasicCoding', this.articleTypeForm)
          .then(res => {
            this.dynamicTags.push(this.articleTypeForm.name)
            console.log(this.dynamicTags)
            this.articleTypeForm.name = ''
          })
          .catch(err => {
            console.log(err.data)
          })
      }
      this.inputVisible = false
    },
    typeManage () {
      this.getType('/basicCoding/findBasicCodingWithType/articleType')
      this.typeManageVisible = true
    },
    newTab (name, path) {
      const {href} = this.$router.resolve({
        name: name,
        path: path
      })
      window.open(href, '_blank')
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
    getType (url) {
      this.$api.requestApi.get(url)
        .then(res => {
          this.dynamicTags = []
          for (let i = 0; i < res.data.length; i++) {
            // console.log(res.data.data[i].name)
            this.dynamicTags.push(res.data[i].name)
          }
        })
        .catch()
    },
    selectRowClick (row) {
      this.editForm = row
      // this.id = row.id
    },
    editRecord () {
      this.$api.requestApi.postJson('/article/uploadPicture', this.imageFile)
        .then(res => {
          this.editForm.picLink = res.data
          this.$refs[this.tableName].updateData(this.editUrl, this.refreshUrl, this.editForm)
        }).catch()
    }
  },
  mounted () {
    this.$refs[this.tableName].refreshData(this.refreshUrl, this.refreshObj)
  }
}
</script>

<style scoped>

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
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
