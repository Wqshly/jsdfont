<template>
  <div>
    <table-template
      ref="rewardsPunishmentRecordTable"
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
        <el-form-item label="奖励/处罚" prop="rOrP">
          <el-select v-model="addForm.rOrP" placeholder="请选择">
            <el-option
              v-for="item in rOrPOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="奖惩方式" prop="type">
          <el-input v-model="addForm.type"></el-input>
        </el-form-item>
        <el-form-item label="奖惩原因" prop="reason">
          <el-input v-model="addForm.reason"></el-input>
        </el-form-item>
        <el-form-item label="执行时间" prop="startTime">
          <el-date-picker
            v-model="addForm.startTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="addForm.remarks"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" label-width="100px">
        <el-form-item label="奖励/处罚" prop="rOrP">
          <el-select v-model="editForm.rOrP" placeholder="请选择">
            <el-option
              v-for="item in rOrPOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="奖惩方式" prop="type">
          <el-input v-model="editForm.type"></el-input>
        </el-form-item>
        <el-form-item label="奖惩原因" prop="reason">
          <el-input v-model="editForm.reason"></el-input>
        </el-form-item>
        <el-form-item label="执行时间" prop="startTime">
          <el-date-picker
            v-model="editForm.startTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
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
  name: 'rewardsPunishmentRecord',
  data () {
    return {
      staffID: null,
      refreshObj: {},
      refreshUrl: 'rewardPunishment/findAllRewardPunishment',
      addUrl: 'rewardPunishment/addRewardPunishment',
      editUrl: 'rewardPunishment/editRewardPunishment',
      deleteUrl: 'rewardPunishment/deleteRewardPunishment',
      tableName: 'rewardsPunishmentRecordTable',
      tableTitle: '奖惩记录', // 表格标题
      tablePK: 'id', // 主键id值
      rOrPOption: [{
        value: '奖励',
        label: '奖励'
      }, {
        value: '处罚',
        label: '处罚'
      }],
      tableHeaderList: [ // 表头字段
        {value: 'rOrP', label: '奖励或处罚', width: '140'},
        {value: 'type', label: '奖惩方式', width: '140'},
        {value: 'reason', label: '奖惩原因', width: '220'},
        {value: 'startTime', label: '执行时间', width: '140'},
        {value: 'remarks', label: '备注', width: '220'},
        {value: 'finalEditor', label: '执行人', width: '120'},
        {value: 'finalEditTime', label: '录入时间', minWidth: '200'}
      ],
      addForm: {staffId: '', rOrP: '', type: '', reason: '', startTime: '', remarks: ''}, // 新增数据界面
      editForm: {id: null, staffId: null, rOrP: null, type: null, reason: null, startTime: null, remarks: null}, // 编辑数据界面
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
