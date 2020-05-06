<template>
  <div>
    <table-template
      ref="highSpeedDrivingTable"
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
        <el-form-item label="是否离职" prop="highSpeedDrivingRecord">
          <el-select v-model="addForm.highSpeedDrivingRecord" placeholder="请选择">
            <el-option
              v-for="item in isQuitOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <div v-if="addForm.highSpeedDrivingRecord === '是'">
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
        <el-form-item label="是否离职" prop="highSpeedDrivingRecord">
          <el-select v-model="editForm.highSpeedDrivingRecord" placeholder="请选择">
            <el-option
              v-for="item in isQuitOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <div v-if="editForm.highSpeedDrivingRecord === '是'">
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
  name: 'highSpeedDrivingRecord',
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
      vehicleID: null,
      refreshObj: {},
      refreshUrl: 'highSpeedDrivingRecord/findAllHighSpeedDrivingRecord',
      addUrl: 'highSpeedDrivingRecord/addHighSpeedDrivingRecord',
      editUrl: 'highSpeedDrivingRecord/editHighSpeedDrivingRecord',
      deleteUrl: 'highSpeedDrivingRecord/deleteHighSpeedDrivingRecord',
      tableName: 'highSpeedDrivingTable',
      tableTitle: '行驶记录', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'startTime', label: '入职时间', width: '160'},
        {value: 'highSpeedDrivingRecord', label: '是否离职', width: '100'},
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
      addForm: {vehicleId: '', highSpeedDrivingRecord: '', startTime: '', endTime: '', reasons: '', remarks: ''}, // 新增数据界面
      editForm: {id: null, vehicleId: null, startTime: null, endTime: null, reasons: null, remarks: null}, // 编辑数据界面
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
      this.vehicleID = null
    },
    refreshTable (id) {
      if (id !== null) {
        this.vehicleID = id
        this.addForm.vehicleId = id
        this.editForm.vehicleId = id
        this.$refs[this.tableName].refreshData(this.refreshUrl + '/' + this.vehicleID, this.refreshObj)
      } else {
        console.log(this.vehicleID)
      }
    },
    // 增方法
    addRecord () {
      if (this.vehicleID === null) {
        console.log('未选择人员')
        this.$message({
          message: '请选择人员',
          type: 'warning'
        })
      } else {
        this.addForm.vehicleId = this.vehicleID
        this.addForm.finalEditor = this.finalEditor
        this.$refs[this.tableName].createData(this.addUrl, this.refreshUrl + '/' + this.vehicleID, this.addForm)
        console.log(this.vehicleID)
      }
    },
    editRecord () {
      if (this.vehicleID === null) {
        console.log('未选择人员')
        this.$message({
          message: '请选择人员',
          type: 'warning'
        })
      } else {
        this.editForm.vehicleId = this.vehicleID
        this.editForm.finalEditor = this.finalEditor
        this.$refs[this.tableName].updateData(this.editUrl, this.refreshUrl + '/' + this.vehicleID, this.editForm)
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
