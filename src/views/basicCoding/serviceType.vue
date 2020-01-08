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
      v-on:otherRefresh="getOrderModelTable"
      v-on:select-row="selectRowClick">
      <!-- 新增窗口 -->
      <el-form slot="add" style="overflow: auto" label-width="100px">
        <p style="text-align: center;font-size: 20px;margin-bottom:25px;">首次添加时请先增加根目录</p>
        <el-form-item label="业务名称" :model="addForm" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="业务编码" :model="addForm" prop="number">
          <el-input v-model="addForm.number"></el-input>
        </el-form-item>
        <el-form-item label="上级业务名称" :model="addForm" prop="upperNumber">
          <el-select v-model="addForm.upperNumber" placeholder="请选择">
            <el-option
              v-for="item in orderModelTable"
              :key="item.id"
              :label="item.name"
              :value="item.number">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务描述" :model="addForm" prop="description">
          <el-input v-model="addForm.description"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" label-width="100px">
        <el-form-item label="业务名称" :model="editForm" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="业务编码" :model="editForm" prop="number">
          <el-input v-model="editForm.number"></el-input>
        </el-form-item>
        <el-form-item label="上级业务名称" :model="editForm" prop="upperNumber">
          <el-select v-model="editForm.upperNumber" placeholder="请选择">
            <el-option
              v-for="item in orderModelTable"
              :key="item.id"
              :label="item.name"
              :value="item.number">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务描述" :model="editForm" prop="description">
          <el-input v-model="editForm.description"></el-input>
        </el-form-item>
      </el-form>
    </table-template>
  </div>
</template>

<script>
import TableTemplate from '../../components/TableTemplate'

export default {
  name: 'serviceType',
  data () {
    return {
      refreshUrl: 'orderModel/findAllOrderModel',
      addUrl: 'orderModel/addOrderModel',
      editUrl: 'orderModel/editOrderModel',
      deleteUrl: 'orderModel/deleteOrderModel',
      tableName: 'orderTable',
      tableTitle: '服务类别设置', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'name', label: '业务名称', width: '220'},
        {value: 'number', label: '业务编码', width: '120'},
        {value: 'upperNumber', label: '上一级业务编码', width: '220'},
        {value: 'description', label: '业务描述', width: '220'},
        {value: 'finalEditor', label: '编辑人', width: '120'},
        {value: 'finalEditTime', label: '编辑时间', width: '220'}
      ],
      addForm: {name: '', number: '', upperNumber: '', description: ''}, // 新增数据界面
      editForm: {
        name: null,
        number: null,
        upperNumber: null,
        description: null
      }, // 编辑数据界面
      buttonBoolean: {
        addBtn: true,
        editBtn: true,
        deleteBtn: true,
        refreshBtn: true,
        import: true,
        export: true,
        acceptOrder: false
      },
      finalEditor: sessionStorage.getItem('save_username'),
      orderModelTable: []
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
      this.getOrderModelTable(this.refreshUrl, this.orderModelTable)
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
    },
    getOrderModelTable () {
      this.$api.getRequestApi.get(this.refreshUrl)
        .then(res => {
          console.log(res.data)
          this.orderModelTable = res.data.data
          console.log(this.orderModelTable)
          if (this.orderModelTable.length === 0) {
            this.orderModelTable = [{
              name: '根目录',
              number: 'Null'
            }]
            console.log('首次添加')
          } else {
            console.log('非首次添加')
          }
        })
        .catch(err => {
          this.$message({
            message: '网络请求失败',
            type: 'error'
          })
          console.log(err.data)
        })
    }
  },
  mounted () {
    this.$refs[this.tableName].refreshData(this.refreshUrl)
  }
}
</script>

<style scoped>
</style>
