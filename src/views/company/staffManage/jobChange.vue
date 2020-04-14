<template>
  <div>
    <table-template
      ref="jobChangeTable"
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
        <el-form-item label="职务名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="任命时间" prop="startTime">
          <el-date-picker
            v-model="addForm.startTime"
            :picker-options="pickerOptionStart"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="职务职责" prop="duty">
          <el-input v-model="addForm.duty" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" label-width="100px" :model="editForm">
        <el-form-item label="职务名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="任命时间" prop="startTime">
          <el-date-picker
            v-model="editForm.startTime"
            :picker-options="pickerOptionStart"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="职务职责" prop="duty">
          <el-input v-model="editForm.duty" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
    </table-template>
  </div>
</template>

<script>
import TableTemplate from '@/components/TableTemplate'
export default {
  name: 'jobChange',
  data () {
    return {
      pickerOptionStart: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      staffID: null,
      refreshObj: {},
      refreshUrl: 'jobChange/findAllJobChange',
      addUrl: 'jobChange/addJobChange',
      editUrl: 'jobChange/editJobChange',
      deleteUrl: 'jobChange/deleteJobChange',
      tableName: 'jobChangeTable',
      tableTitle: '职务调整', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'name', label: '职务名称', width: '120'},
        {value: 'startTime', label: '任命时间', width: '160'},
        {value: 'duty', label: '职务职责', width: '180'},
        {value: 'finalEditor', label: '任命人', width: '120'},
        {value: 'finalEditTime', label: '职务调整时间', minWidth: '200'}
      ],
      addForm: {staffId: '', name: '', startTime: '', duty: ''}, // 新增数据界面
      editForm: {id: null, staffId: null, name: null, startTime: null, duty: null}, // 编辑数据界面
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
