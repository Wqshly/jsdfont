<template>
  <div>
    <table-template
      ref="workRecord"
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
      <el-form slot="add" style="overflow: auto" label-width="100px">
        <el-form-item label="员工ID" :model="addForm" prop="staffId">
          <el-input v-model="addForm.staffId"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" :model="addForm" prop="startTime">
          <el-input v-model="addForm.startTime"></el-input>
        </el-form-item>
        <el-form-item label="离职时间" :model="addForm" prop="endTime">
          <el-input v-model="addForm.endTime"></el-input>
        </el-form-item>
        <el-form-item label="离职原因" :model="addForm" prop="reasons">
          <el-input v-model="addForm.reasons"></el-input>
        </el-form-item>
        <el-form-item label="备注" :model="addForm" prop="remarks">
          <el-input v-model="addForm.remarks"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" label-width="100px">
        <el-form-item label="员工ID" :model="editForm" prop="staffId">
          <el-input v-model="editForm.staffId"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" :model="editForm" prop="startTime">
          <el-input v-model="editForm.startTime"></el-input>
        </el-form-item>
        <el-form-item label="离职时间" :model="editForm" prop="endTime">
          <el-input v-model="editForm.endTime"></el-input>
        </el-form-item>
        <el-form-item label="离职原因" :model="editForm" prop="reasons">
          <el-input v-model="editForm.reasons"></el-input>
        </el-form-item>
        <el-form-item label="备注" :model="editForm" prop="remarks">
          <el-input v-model="editForm.remarks"></el-input>
        </el-form-item>
      </el-form>
    </table-template>
  </div>
</template>

<script>
import TableTemplate from '@/components/TableTemplate'
export default {
  name: 'workRecord',
  data () {
    return {
      staffID: null,
      refreshObj: {},
      refreshUrl: 'isQuit/findAllIsQuit',
      addUrl: 'isQuit/addIsQuit',
      editUrl: 'isQuit/editIsQuit',
      deleteUrl: 'isQuit/deleteIsQuit',
      tableName: 'workRecord',
      tableTitle: '工作记录', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'number', label: '订单编号', width: '160'},
        {value: 'price', label: '订单金额', width: '140'},
        {value: 'nop', label: '参与人数', width: '120'},
        {value: 'exeDate', label: '执行日期', width: '220'},
        {value: 'day', label: '花费时间', width: '120'},
        {value: 'finalEditor', label: '记录人', width: '120'},
        {value: 'finalEditTime', label: '记录时间', minWidth: '200'}
      ],
      addForm: {staffId: '', startTime: '', endTime: '', reasons: '', remarks: ''}, // 新增数据界面
      editForm: {id: null, staffId: null, startTime: null, endTime: null, reasons: null, remarks: null}, // 编辑数据界面
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
