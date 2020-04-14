<template>
  <div>
    <table-template
      ref="postChangeTable"
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
        <el-form-item label="变更前岗位" prop="startTime">
          <el-input v-model="addForm.before"></el-input>
        </el-form-item>
        <el-form-item label="变更后岗位" prop="startTime">
          <el-input v-model="addForm.after"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="addForm.startTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
          v-model="addForm.endTime"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="addForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" label-width="100px" :model="editForm">
        <el-form-item label="变更前岗位" prop="startTime">
          <el-input v-model="editForm.before"></el-input>
        </el-form-item>
        <el-form-item label="变更后岗位" prop="startTime">
          <el-input v-model="editForm.after"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
          v-model="editForm.startTime"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="editForm.endTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="editForm.remark"></el-input>
        </el-form-item>
      </el-form>
    </table-template>
  </div>
</template>

<script>
import TableTemplate from '@/components/TableTemplate'
export default {
  name: 'postChange',
  data () {
    return {
      staffID: null,
      refreshObj: {},
      refreshUrl: 'postChange/findAllPostChange',
      addUrl: 'postChange/addPostChange',
      editUrl: 'postChange/editPostChange',
      deleteUrl: 'postChange/deletePostChange',
      tableName: 'postChangeTable',
      tableTitle: '岗位变动', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'before', label: '变更前岗位', width: '200'},
        {value: 'after', label: '变更后岗位', width: '120'},
        {value: 'startTime', label: '开始时间', width: '160'},
        {value: 'endTime', label: '结束时间', width: '220'},
        {value: 'remark', label: '备注', width: '220'},
        {value: 'finalEditor', label: '编辑人', width: '120'},
        {value: 'finalEditTime', label: '编辑时间', minWidth: '200'}
      ],
      addForm: {staffId: '', before: '', after: '', startTime: '', endTime: '', remark: ''}, // 新增数据界面
      editForm: {id: null, staffId: null, before: null, after: null, startTime: null, endTime: null, remark: null}, // 编辑数据界面
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
        this.$refs[this.tableName].refreshData(this.refreshUrl + '/' + this.staffID, this.refreshObj)
      } else {
        console.log(this.staffID)
      }
    },
    // 增方法
    addRecord () {
      if (this.staffID === null) {
        console.log('未选择人员')
        this.$message({
          message: '请选择人员',
          type: 'warning'
        })
      } else {
        this.addForm.staffId = this.staffID
        this.addForm.finalEditor = this.finalEditor
        this.$refs[this.tableName].createData(this.addUrl, this.refreshUrl + '/' + this.staffID, this.addForm)
        console.log(this.staffID)
      }
      // this.addForm.finalEditor = this.finalEditor
      // this.$refs[this.tableName].createData(this.addUrl, this.refreshUrl, this.addForm)
    },
    editRecord () {
      if (this.staffID === null) {
        console.log('未选择人员')
        this.$message({
          message: '请选择人员',
          type: 'warning'
        })
      } else {
        this.editForm.staffId = this.staffID
        this.editForm.finalEditor = this.finalEditor
        this.$refs[this.tableName].updateData(this.editUrl, this.refreshUrl + '/' + this.staffID, this.editForm)
      }
    },
    selectRowClick (row) {
      this.editForm = row
      // this.id = row.id
    },
    deleteRecord () {
      this.$refs[this.tableName].deleteData(this.deleteUrl, this.refreshUrl)
    }
  }
}
</script>

<style scoped>
</style>
