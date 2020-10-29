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
      <el-form slot="add" style="overflow: auto" :model="addForm" label-width="100px">
        <el-form-item label="客户ID" prop="customerId">
          <el-input v-model="addForm.customerId"></el-input>
        </el-form-item>
        <el-form-item label="服务类型" prop="goodsType">
          <el-input v-model="addForm.goodsType"></el-input>
        </el-form-item>
        <el-form-item label="服务名称" prop="goodsName">
          <el-input v-model="addForm.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="addressDerail">
          <el-input v-model="addForm.addressDetail"></el-input>
        </el-form-item>
        <el-form-item label="下单时间" prop="order_time">
          <el-input v-model="addForm.order_time"></el-input>
        </el-form-item>
        <el-form-item label="是否处理" prop="is_done">
          <el-input v-model="addForm.is_done"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" :model="editForm" label-width="100px">
        <el-form-item label="客户ID" prop="customerId">
          <el-input v-model="editForm.customerId"></el-input>
        </el-form-item>
        <el-form-item label="服务类型" prop="goodsType">
          <el-input v-model="editForm.goodsType"></el-input>
        </el-form-item>
        <el-form-item label="服务名称" prop="goodsName">
          <el-input v-model="editForm.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="addressDerail">
          <el-input v-model="editForm.addressDetail"></el-input>
        </el-form-item>
        <el-form-item label="下单时间" prop="order_time">
          <el-input v-model="editForm.order_time"></el-input>
        </el-form-item>
        <el-form-item label="是否处理" prop="is_done">
          <el-input v-model="editForm.is_done"></el-input>
        </el-form-item>
      </el-form>
    </table-template>
  </div>
</template>

<script>
import TableTemplate from '../../components/TableTemplate'
export default {

  data () {
    return {
      refreshUrl: 'orders/findAllOrders',
      refreshObj: {},
      addUrl: 'orders/addOrders',
      editUrl: 'orders/editOrders',
      deleteUrl: 'orders/DeleteOrders',
      tableName: 'orderTable',
      tableTitle: '订单管理', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'customerId', label: '客户ID', width: '120'},
        {value: 'goodsType', label: '服务类型', width: '220'},
        {value: 'goodsName', label: '服务名称', width: '220'},
        {value: 'address', label: '服务地址', width: '220'},
        {value: 'addressDetail', label: '详细地址', width: '220'},
        {value: 'isaAccept', label: '是否接单', width: '220'},
        {value: 'isDispatch', label: '是否派工', width: '220'},
        {value: 'isDone', label: '是否完成', width: '220'},
        {value: 'expectedTime', label: '订单约定日期', width: '120'},
        {value: 'orderTime', label: '下单时间', minWidth: '220'},
        {value: 'actualPrice', label: '价格', minWidth: '220'},
        {value: 'acceptTime', label: '接单时间', minWidth: '220'}
      ],
      addForm: {customerId: '', goodsType: '', goodsName: '', address: '', order_time: '', is_done: ''}, // 新增数据界面
      editForm: {id: null, customer_id: null, goodsType: null, goodsName: null, address: null, order_time: null, is_done: null}, // 编辑数据界面
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
    this.$refs[this.tableName].refreshData(this.refreshUrl, this.refreshObj)
  }
}
</script>

<style scoped>
</style>
