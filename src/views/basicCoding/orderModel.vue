<template>
  <div>
    <table-template
      ref="orderModelTable"
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
        <el-form-item label="订单类型" :model="addForm" prop="order_type">
          <el-input v-model="addForm.order_type"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" label-width="100px">
        <el-form-item label="订单类型" :model="editForm" prop="order_type">
          <el-input v-model="editForm.order_type"></el-input>
        </el-form-item>
      </el-form>
    </table-template>
  </div>
</template>

<script>
import TableTemplate from '../../components/TableTemplate'
export default {
  name: 'orderModel',
  data () {
    return {
      refreshObj: {},
      refreshUrl: 'basicCoding/findAllOrderModel',
      addUrl: 'basicCoding/addOrderModel',
      editUrl: 'basicCoding/editOrderModel',
      deleteUrl: 'basicCoding/deleteOrderModel',
      tableName: 'orderModelTable',
      tableTitle: '订单类别', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'order_type', label: '订单类型', width: '120'},
        {value: 'final_editor', label: '最后修改', width: '120'},
        {value: 'final_edit_time', label: '最后修改时间', minWidth: '120'}
      ],
      addForm: {order_type: ''}, // 新增数据界面
      editForm: {id: null, order_type: null}, // 编辑数据界面
      finalEditor: sessionStorage.getItem('save_username'),
      buttonBoolean: {
        addBtn: true,
        editBtn: true,
        deleteBtn: true,
        refreshBtn: true,
        import: true,
        export: true,
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
      this.addForm.finalEditor = this.finalEditor
      this.$refs[this.tableName].createData(this.addUrl, this.refreshUrl, this.addForm)
    },
    selectRowClick (row) {
      this.editForm = row
      // this.id = row.id
    },
    editRecord () {
      this.editForm.finalEditor = this.finalEditor
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
