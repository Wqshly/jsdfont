<template>
    <div>
      <table-template
        ref="customerContractTable"
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
          <el-form-item label="姓名" :model="addForm" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" :model="addForm" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="电话" :model="addForm" prop="phone">
            <el-input v-model="addForm.phone"></el-input>
          </el-form-item>

        </el-form>
        <!-- 编辑窗口 -->
        <el-form slot="edit" style="overflow: auto" label-width="100px">
          <el-form-item label="姓名" :model="editForm" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" :model="editForm" prop="password">
            <el-input v-model="editForm.password"></el-input>
          </el-form-item>
          <el-form-item label="电话" :model="editForm" prop="phone">
            <el-input v-model="editForm.phone"></el-input>
          </el-form-item>
        </el-form>
      </table-template>
    </div>
</template>

<script>
import TableTemplate from '../../components/TableTemplate'
export default {
  name: 'customerContract',
  data () {
    return {
      refreshObj: {},
      refreshUrl: 'customer/findAllContract',
      addUrl: 'customer/addContract',
      editUrl: 'customer/editContract',
      deleteUrl: 'customer/deleteContract',
      tableName: 'customerContractTable',
      tablePK: 'id', // 主键id值
      tableTitle: '客户合同管理', // 表格标题
      tableHeaderList: [ // 表头字段
        {value: 'contractNumber', label: '合同编号', width: '160'},
        {value: 'projectName', label: '项目名称', width: '180'},
        {value: 'customerRepresent', label: '客户代表', width: '120'},
        {value: '', label: '是否签约', width: '100'},
        {value: 'signingTime', label: '签约时间', width: '120'},
        {value: '', label: '是否已收保证金', width: '150'},
        {value: 'pledge', label: '保证金金额', width: '120'},
        {value: '', label: '甲方签约人', width: '200'},
        {value: 'ourRepresent', label: '我方签约人', width: '120'},
        {value: 'customerPhone', label: '甲方电话', width: '120'},
        {value: 'customerAddress', label: '客户地址', width: '220'},
        {value: 'ourSide', label: '公司名称', width: '120'},
        {value: 'ourAddress', label: '我方地址', width: '120'},
        {value: 'ourPhone', label: '我方电话', width: '120'},
        {value: 'otherItem', label: '其他事项', width: '120'},
        {value: 'finalEditorTime', label: '编辑人', width: '120'},
        {value: 'finalEditor', label: '编辑时间', width: '250'}
      ],
      addForm: {name: '', password: '', phone: ''},
      editForm: {id: null, name: null, password: null, phone: null},
      buttonBoolean: {
        addBtn: true,
        editBtn: true,
        deleteBtn: true,
        refreshBtn: true,
        import: false,
        export: true,
        acceptOrder: false
      }
    }
  },
  components: {
    TableTemplate
  },
  methods: {
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
    this.$refs[this.tableName].refreshData(this.refreshUrl, this.refreshObj)
  }
}
</script>

<style scoped>

</style>
