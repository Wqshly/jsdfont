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
        ref="qualificationManagementTable"
        :refresh-url="refreshUrl"
        :add-url="addUrl"
        :edit-url="editUrl"
        :delete-url="deleteUrl"
        :table-title="tableTitle"
        :table-header-list="tableHeaderList"
        :table-p-k="tablePK"
        :button-boolean="buttonBoolean"
        v-on:addRecord="addRecord"
        v-on:editRecord="editRecord"
        v-on:select-row="selectRowClick">
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
        <el-form slot="edit" style="overflow: auto" label-width="100px" :model="editForm">
          <el-form-item label="编码" prop="staffId">
            <el-input v-model="editForm.number"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="staffId">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="资质类别" prop="startTime">
            <el-input v-model="editForm.category"></el-input>
          </el-form-item>
          <el-form-item label="生效时间" prop="endTime">
            <el-input v-model="editForm.entryIntoForceTime"></el-input>
          </el-form-item>
          <el-form-item label="到期时间" prop="reasons">
            <el-input v-model="editForm.deadline"></el-input>
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

export default {
  name: 'articleManage',
  data () {
    return {
      dynamicTags: [],
      inputVisible: false,
      articleTypeForm: {name: ''},
      typeManageVisible: false,
      staffID: null,
      refreshObj: {},
      refreshUrl: 'qualification/findAllQualification',
      addUrl: 'qualification/addQualification',
      editUrl: 'qualification/editQualification',
      deleteUrl: 'qualification/deleteQualification',
      tableName: 'qualificationManagementTable',
      tableTitle: '文章管理', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'number', label: '编码', width: '140'},
        {value: 'name', label: '名称', width: '120'},
        {value: 'category', label: '所属分类', width: '120'},
        {value: 'entryIntoForceTime', label: '生效时间', width: '150'},
        {value: 'deadline', label: '到期时间', width: '150'},
        {value: 'finalEditor', label: '最后修改', width: '120'},
        {value: 'finalEditTime', label: '最后修改时间', minWidth: '200'}
      ],
      addForm: {
        number: '',
        name: '',
        category: '',
        entryIntoForceTime: '',
        deadline: '',
        finalEditor: '',
        finalEditTime: ''
      }, // 新增数据界面
      editForm: {
        number: null,
        name: null,
        category: null,
        entryIntoForceTime: null,
        deadline: null,
        finalEditor: null,
        finalEditTime: null
      }, // 编辑数据界面
      finalEditor: sessionStorage.getItem('save_username'),
      buttonBoolean: {
        addBtn: true,
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
    BasicTableTemp
  },
  methods: {
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
    }
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
