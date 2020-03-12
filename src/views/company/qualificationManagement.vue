<template>
  <div>
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
</template>

<script>
import TableTemplate from '@/components/TableTemplate'

export default {
  name: 'qualificationManagement',
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
        {value: 'finalEditTime', label: '最后修改时间', width: '200'}
      ],
      addForm: {number: '', name: '', category: '', entryIntoForceTime: '', deadline: '', finalEditor: '', finalEditTime: ''}, // 新增数据界面
      editForm: {number: null, name: null, category: null, entryIntoForceTime: null, deadline: null, finalEditor: null, finalEditTime: null}, // 编辑数据界面
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
    clearTable () {
      this.staffID = null
    },
    refreshTable (id) {
      if (id !== null) {
        this.staffID = id
        this.addForm.staffId = id
        this.editForm.staffId = id
        this.$refs.qualificationManagementTable.refreshData(this.refreshUrl, this.refreshObj)
      }
    },
    // 增方法
    addRecord () {
      this.addForm.finalEditor = this.finalEditor
      this.$refs[this.tableName].createData(this.addUrl, this.refreshUrl, this.addForm)
    },
    selectRowClick (row) {
      this.editForm = row
      // this.id = row.id
    },
    editRecord () {
      this.editForm.finalEditor = this.finalEditor
      this.$refs[this.tableName].updateData(this.editUrl, this.refreshUrl, this.editForm)
    },
    deleteRecord () {
      this.$refs[this.tableName].deleteData(this.deleteUrl, this.refreshUrl)
    }
  },
  mounted () {
    this.$refs[this.tableName].refreshData(this.refreshUrl, this.refreshObj)
  }
}
</script>

<style scoped>
</style>
