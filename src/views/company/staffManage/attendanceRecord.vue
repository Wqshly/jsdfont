<template>
  <div>
    <table-template
      ref="attendanceRecordTable"
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
        <el-form-item label="请假时间" prop="startTime">
          <el-date-picker
            v-model="addForm.startTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否销假" prop="isEnd">
          <el-select v-model="addForm.isEnd" placeholder="请选择">
            <el-option
              v-for="item in isEndOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="addForm.isEnd === '是'" label="销假时间" prop="endTime">
          <el-date-picker
            v-model="addForm.endTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="批准人" prop="exePerson">
          <el-input v-model="addForm.exePerson"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="addForm.remarks"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" label-width="100px" :model="editForm">
        <el-form-item label="请假时间" prop="startTime">
          <el-date-picker
            v-model="editForm.startTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否销假" prop="isEnd">
          <el-select v-model="editForm.isEnd" placeholder="请选择">
            <el-option
              v-for="item in isEndOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="editForm.isEnd === '是'" label="销假时间" prop="endTime">
          <el-date-picker
            v-model="editForm.endTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="批准人" prop="exePerson">
          <el-input v-model="editForm.exePerson"></el-input>
        </el-form-item>
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
  name: 'attendanceRecord',
  data () {
    return {
      staffID: null,
      refreshObj: {},
      refreshUrl: 'leavingReporting/findAllLeavingReporting',
      addUrl: 'leavingReporting/addLeavingReporting',
      editUrl: 'leavingReporting/editLeavingReporting',
      deleteUrl: 'leavingReporting/deleteLeavingReporting',
      tableName: 'attendanceRecordTable',
      tableTitle: '请/销假记录', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'startTime', label: '请假时间', width: '140'},
        {value: 'isEnd', label: '是否销假', width: '100'},
        {value: 'endTime', label: '销假时间', width: '140'},
        {value: 'exePerson', label: '批准人', width: '120'},
        {value: 'remarks', label: '备注', width: '200'},
        {value: 'finalEditor', label: '录入人', width: '120'},
        {value: 'finalEditTime', label: '录入时间', minWidth: '200'}
      ],
      addForm: {staffId: '', startTime: '', isEnd: '', endTime: '', exePerson: '', reasons: '', remarks: ''}, // 新增数据界面
      editForm: {id: null, staffId: null, startTime: null, isEnd: null, endTime: null, exePerson: null, reasons: null, remarks: null}, // 编辑数据界面
      finalEditor: sessionStorage.getItem('save_username'),
      buttonBoolean: {
        addBtn: true,
        editBtn: true,
        deleteBtn: true,
        refreshBtn: true,
        import: false,
        export: false,
        acceptOrder: false
      },
      isEndOption: [{
        value: '是',
        label: '是'
      }, {
        value: '否',
        label: '否'
      }]
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
      }
    },
    // 增方法
    addRecord () {
      this.addForm.finalEditor = this.finalEditor
      this.$refs[this.tableName].createData(this.addUrl, this.refreshUrl + '/' + this.staffID, this.addForm)
    },
    selectRowClick (row) {
      this.editForm = row
      // this.id = row.id
    },
    editRecord () {
      this.editForm.finalEditor = this.finalEditor
      this.$refs[this.tableName].updateData(this.editUrl, this.refreshUrl + '/' + this.staffID, this.editForm)
    },
    deleteRecord () {
      this.$refs[this.tableName].deleteData(this.deleteUrl, this.refreshUrl)
    }
  }
}
</script>

<style scoped>
</style>
