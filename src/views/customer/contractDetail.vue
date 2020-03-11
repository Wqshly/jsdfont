<template>
  <div>
    <table-template
      ref="contractDetailTable"
      :refresh-url="refreshUrl"
      :add-url="addUrl"
      :edit-url="editUrl"
      :delete-url="deleteUrl"
      :table-title="tableTitle"
      :table-header-list="tableHeaderList"
      :table-p-k="tablePK"
      :func-btn="funcBtn"
      :button-boolean="buttonBoolean"
      v-on:addRecord="addRecord"
      v-on:editRecord="editRecord"
      v-on:select-row="selectRowClick"
      v-on:right-btn="rightBtn">
      <!-- 新增窗口 -->
      <el-form slot="add" style="overflow: auto" label-width="100px" :model="addForm">
        <el-form-item label="客户姓名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="客户昵称" prop="nickName">
          <el-input v-model="addForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password" show-password clearable></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="addForm.sex"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" label-width="100px" :model="editForm">
        <el-form-item label="客户姓名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="客户昵称" prop="nickName">
          <el-input v-model="editForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="editForm.sex"></el-input>
        </el-form-item>
      </el-form>
    </table-template>
  </div>
</template>

<script>
import TableTemplate from '../../components/TableTemplate'

export default {
  name: 'customerInfo',
  data () {
    return {
      refreshObj: {},
      refreshUrl: 'customer/findAllCustomer',
      addUrl: 'customer/addCustomer',
      editUrl: 'customer/editCustomer',
      deleteUrl: 'customer/deleteCustomer',
      tableName: 'contractDetailTable',
      tablePK: 'id', // 主键id值
      tableTitle: '合同详情表', // 表格标题
      tableHeaderList: [ // 表头字段
        {value: 'name', label: '合同阶段', width: '160'},
        {value: 'name', label: '费用', width: '160'},
        {value: 'name', label: '付费状况', width: '160'},
        {value: 'name', label: '承接人', width: '160'},
        {value: 'name', label: '承接时间', width: '160'},
        {value: 'name', label: '完成时间', width: '160'},
        {value: 'name', label: '记录人', width: '160'},
        {value: 'name', label: '记录时间', width: '220'}
      ],
      addForm: {name: '', nickName: '', password: '', phone: '', sex: ''},
      editForm: {id: null, name: null, nickName: null, password: null, phone: null, sex: null},
      buttonBoolean: {
        addBtn: true,
        editBtn: true,
        viewDetail: true,
        deleteBtn: true,
        refreshBtn: true,
        import: false,
        export: false,
        acceptOrder: false
      },
      funcBtn: {
        isShow: true,
        fixed: 'right',
        width: 150,
        buttons: [
          {
            name: '详细信息',
            value: 'dispatchingCar'
          }
        ]
      }
    }
  },
  components: {
    TableTemplate
  },
  methods: {
    addRecord () {
      this.addForm.password = this.$commonsMethod.encryptedData(this.addForm.password)
      this.$refs[this.tableName].createData(this.addUrl, this.refreshUrl, this.addForm)
    },
    selectRowClick (row) {
      this.editForm = row
      // this.id = row.id
    },
    editRecord () {
      this.editForm.password = this.$commonsMethod.encryptedData(this.editForm.password)
      this.$refs[this.tableName].updateData(this.editUrl, this.refreshUrl, this.editForm)
    },
    rightBtn (data) {
      this.$refs[this.tableName].editDialogVisible = true
    }
  }
}
</script>

<style scoped>
</style>
