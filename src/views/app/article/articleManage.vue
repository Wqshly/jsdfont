<template>
  <div style="height: 100%">
    <div class="main-style">
      <div class="toolbar-style">
        <h2 class="title-style">新的创作</h2>
        <div style="">
          <el-button class="menu-item" @click.native="newTextArticle">
            <i class="el-icon-edit-outline icon-style"></i>
            <div class="menu-content">文字消息</div>
          </el-button>
          <el-button class="menu-item">
            <i class="el-icon-picture-outline icon-style"></i>
            <div class="menu-content">图文消息</div>
          </el-button>
          <el-button class="menu-item">
            <i class="el-icon-video-camera icon-style"></i>
            <div class="menu-content">视频消息</div>
          </el-button>
          <el-button class="menu-item">
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
  </div>
</template>

<script>
import TableTemplate from '@/components/TableTemplate'

export default {
  name: 'articleManage',
  data () {
    return {
      staffID: null,
      refreshObj: {},
      refreshUrl: 'qualification/findAllQualification',
      addUrl: 'qualification/addQualification',
      editUrl: 'qualification/editQualification',
      deleteUrl: 'qualification/deleteQualification',
      tableName: 'qualificationManagementTable',
      tableTitle: '资质管理', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'number', label: '编码', width: '140'},
        {value: 'name', label: '名称', width: '120'},
        {value: 'category', label: '资质类别', width: '120'},
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
    TableTemplate
  },
  methods: {
    newTextArticle (ev) {
      let target = ev.target
      if (target.nodeName === 'SPAN') {
        target = ev.target.parentNode
      } else if (target.nodeName === 'I' || target.nodeName === 'DIV') {
        target = ev.target.parentNode.parentNode
      }
      target.blur()
      const {href} = this.$router.resolve({
        name: 'article-add',
        path: '/article-add'
      })
      window.open(href, '_blank')
    }
  }
}
</script>

<style scoped>
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
