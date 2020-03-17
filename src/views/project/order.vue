<template>
  <div>
    <table-template
      ref="orderTable"
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
        <el-form-item label="客户ID" :model="addForm" prop="customerId">
          <el-input v-model="addForm.customerId"></el-input>
        </el-form-item>
        <el-form-item label="服务类型" :model="addForm" prop="service_type">
          <el-input v-model="addForm.service_type"></el-input>
        </el-form-item>
        <el-form-item label="服务名称" :model="addForm" prop="service_name">
          <el-input v-model="addForm.service_name"></el-input>
        </el-form-item>
        <el-form-item label="地址" :model="addForm" prop="address">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
        <el-form-item label="下单时间" :model="addForm" prop="order_time">
          <el-input v-model="addForm.order_time"></el-input>
        </el-form-item>
        <el-form-item label="是否处理" :model="addForm" prop="is_done">
          <el-input v-model="addForm.is_done"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" label-width="100px">
        <el-form-item label="客户ID" :model="editForm" prop="customerId">
          <el-input v-model="editForm.customerId"></el-input>
        </el-form-item>
        <el-form-item label="服务类型" :model="editForm" prop="service_type">
          <el-input v-model="editForm.service_type"></el-input>
        </el-form-item>
        <el-form-item label="服务名称" :model="editForm" prop="service_name">
          <el-input v-model="editForm.service_name"></el-input>
        </el-form-item>
        <el-form-item label="地址" :model="editForm" prop="address">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item label="下单时间" :model="editForm" prop="order_time">
          <el-input v-model="editForm.order_time"></el-input>
        </el-form-item>
        <el-form-item label="是否处理" :model="editForm" prop="is_done">
          <el-input v-model="editForm.is_done"></el-input>
        </el-form-item>
      </el-form>
    </table-template>
  </div>
</template>

<script>
import TableTemplate from '../../components/TableTemplate'
export default {
  name: 'orders',
  data () {
    return {
      refreshUrl: 'orders/findAllOrders',
      addUrl: 'orders/addOrders',
      editUrl: 'orders/editOrders',
      deleteUrl: 'orders/DeleteOrders',
      tableName: 'orderTable',
      tableTitle: '订单管理', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'customerId', label: '客户ID', width: '120'},
        {value: 'service_type', label: '服务类型', width: '220'},
        {value: 'service_name', label: '服务名称', width: '220'},
        {value: 'address', label: '服务地点', width: '220'},
        {value: 'order_time', label: '下单时间', width: '120'},
        {value: 'is_done', label: '是否完成', minWidth: '220'}
      ],
      addForm: {customerId: '', service_type: '', service_name: '', address: '', order_time: '', is_done: ''}, // 新增数据界面
      editForm: {id: null, customer_id: null, service_type: null, service_name: null, address: null, order_time: null, is_done: null}, // 编辑数据界面
      buttonBoolean: {
        addBtn: false,
        editBtn: false,
        deleteBtn: false,
        refreshBtn: true,
        import: false,
        export: true,
        acceptOrder: true
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
    this.$refs[this.tableName].refreshData(this.refreshUrl)
  }
}
</script>

<style scoped>
</style>
