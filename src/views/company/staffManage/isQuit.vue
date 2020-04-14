<template>
  <div>
    <table-template
      ref="isQuitTable"
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
        <el-form-item label="入职时间" prop="startTime">
          <el-date-picker
            v-model="addForm.startTime"
            :picker-options="pickerOptionStart"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否离职" prop="isQuit">
          <el-select v-model="addForm.isQuit" placeholder="请选择">
            <el-option
              v-for="item in isQuitOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <div v-if="addForm.isQuit === '是'">
          <el-form-item label="离职时间" prop="endTime">
            <el-date-picker
              v-model="addForm.endTime"
              :picker-options="pickerOptionEnd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="离职原因" prop="reasons">
            <el-input v-model="addForm.reasons"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="addForm.remarks"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" label-width="100px" :model="editForm">
        <el-form-item label="入职时间" prop="startTime">
          <el-date-picker
          v-model="editForm.startTime"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否离职" prop="isQuit">
          <el-select v-model="editForm.isQuit" placeholder="请选择">
            <el-option
              v-for="item in isQuitOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <div v-if="editForm.isQuit === '是'">
          <el-form-item label="离职时间" prop="endTime">
            <el-date-picker
              v-model="editForm.endTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="离职原因" prop="reasons">
            <el-input v-model="editForm.reasons"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="editForm.remarks"></el-input>
        </el-form-item>
      </el-form>
    </table-template>
  </div>
</template>

<script>
import TableTemplate from '@/components/TableTemplate'

export default {
  name: 'isQuit',
  data () {
    return {
      pickerOptionStart: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      pickerOptionEnd: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      staffID: null,
      refreshObj: {},
      refreshUrl: 'isQuit/findAllIsQuit',
      addUrl: 'isQuit/addIsQuit',
      editUrl: 'isQuit/editIsQuit',
      deleteUrl: 'isQuit/deleteIsQuit',
      tableName: 'isQuitTable',
      tableTitle: '入离职管理', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'startTime', label: '入职时间', width: '160'},
        {value: 'isQuit', label: '是否离职', width: '100'},
        {value: 'endTime', label: '离职时间', width: '160'},
        {value: 'reasons', label: '离职原因', width: '160'},
        {value: 'remarks', label: '备注', width: '220'},
        {value: 'finalEditor', label: '编辑人', width: '100'},
        {value: 'finalEditTime', label: '编辑时间', minWidth: '200'}
      ],
      isQuitOption: [{
        value: '是',
        label: '是'
      }, {
        value: '否',
        label: '否'
      }],
      addForm: {staffId: '', isQuit: '', startTime: '', endTime: '', reasons: '', remarks: ''}, // 新增数据界面
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
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>
