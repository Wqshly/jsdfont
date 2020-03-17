<template>
  <div>
    <table-template
      ref="userTable"
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
        <el-form-item label="电话" :model="addForm" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" :model="addForm" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="员工ID" :model="addForm" prop="staffId">
          <el-input v-model="addForm.staffId"></el-input>
        </el-form-item>
        <el-form-item label="最后修改" :model="addForm" prop="finalEditor">
          <el-input v-model="addForm.finalEditor"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" label-width="100px">
        <el-form-item label="电话" :model="editForm" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" :model="editForm" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="员工ID" :model="editForm" prop="staffId">
          <el-input v-model="editForm.staffId"></el-input>
        </el-form-item>
        <el-form-item label="最后修改" :model="editForm" prop="finalEditor">
          <el-input v-model="editForm.finalEditor"></el-input>
        </el-form-item>
      </el-form>
    </table-template>
  </div>
</template>

<script>
import TableTemplate from '../../components/TableTemplate'
export default {
  name: 'staff',
  data () {
    return {
      refreshUrl: 'user/findAllUser',
      addUrl: 'user/addUser',
      editUrl: 'user/editUser',
      deleteUrl: 'user/deleteUser',
      tableName: 'userTable',
      tableTitle: '员工管理', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'phone', label: '电话', width: '120'},
        {value: 'password', label: '密码', width: '120'},
        {value: 'staffId', label: '员工ID', width: '220'},
        {value: 'finalEditor', label: '最后修改', width: '120'},
        {value: 'final_edit_time', label: '最后修改时间', minWidth: '120'}
      ],
      addForm: {phone: '', password: '', staffId: '', finalEditor: ''}, // 新增数据界面
      editForm: {id: null, phone: null, password: null, staffId: null, finalEditor: null}, // 编辑数据界面
      buttonBoolean: {}
    }
  },
  components: {
    TableTemplate
  },
  methods: {
    // 增方法
    addRecord () {
      this.$refs[this.tableName].createData(this.addUrl, this.refreshUrl, this.addForm)
    },
    selectRowClick (row) {
      this.editForm = row
      // this.id = row.id
    },
    editRecord () {
      this.$refs[this.tableName].updateData(this.editUrl, this.refreshUrl, this.editForm)
    },
    deleteRecord () {
      this.$refs[this.tableName].deleteData(this.deleteUrl, this.refreshUrl)
    }
  },
  mounted () {
    this.$refs.userTable.refreshData(this.refreshUrl)
  }
}
</script>

<style scoped>
</style>
