<template>
  <div>
    <table-template
      ref="supplierTable"
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
        <el-form-item label="编码" :model="addForm" prop="number">
          <el-input v-model="addForm.number"></el-input>
        </el-form-item>
        <el-form-item label="供货商名称" :model="addForm" prop="supplier_name">
          <el-input v-model="addForm.supplier_name"></el-input>
        </el-form-item>
        <el-form-item label="地址" :model="addForm" prop="Address">
          <el-input v-model="addForm.Address"></el-input>
        </el-form-item>
        <el-form-item label="电话" :model="addForm" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="法人代表" :model="addForm" prop="repression">
          <el-input v-model="addForm.repression"></el-input>
        </el-form-item>

      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" label-width="100px">
        <el-form-item label="编码" :model="editForm" prop="number">
          <el-input v-model="editForm.number"></el-input>
        </el-form-item>
        <el-form-item label="供货商名称" :model="editForm" prop="supplier_name">
          <el-input v-model="editForm.supplier_name"></el-input>
        </el-form-item>
        <el-form-item label="地址" :model="editForm" prop="Address">
          <el-input v-model="editForm.Address"></el-input>
        </el-form-item>
        <el-form-item label="电话" :model="editForm" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="法人代表" :model="editForm" prop="repression">
          <el-input v-model="editForm.repression"></el-input>
        </el-form-item>

      </el-form>
    </table-template>
  </div>
</template>

<script>
import TableTemplate from '../../components/TableTemplate'
export default {
  name: 'supplier',
  data () {
    return {
      refreshUrl: 'supplier/findAllSupplier',
      addUrl: 'supplier/addSupplier',
      editUrl: 'supplier/editSupplier',
      deleteUrl: 'supplier/DeleteSupplier',
      tableName: 'supplierTable',
      tablePK: 'id', // 主键id值
      tableTitle: '供应商管理', // 表格标题
      tableHeaderList: [ // 表头字段
        {value: 'number', label: '编码', width: '120'},
        {value: 'supplier_name', label: '供应商名称', width: '220'},
        {value: 'Address', label: '地址', width: '120'},
        {value: 'phone', label: '电话', width: '220'},
        {value: 'repression', label: '法人代表', minWidth: '120'}
      ],
      addForm: {number: '', supplier_name: '', Address: '', phone: '', repression: ''},
      editForm: {number: null, supplier_name: null, Address: null, phone: null, repression: null},
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
    this.$refs.supplierTable.refreshData(this.refreshUrl)
  }
}
</script>

<style scoped>
</style>
