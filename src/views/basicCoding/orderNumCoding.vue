<template>
  <div>
    <table-template
      ref="orderNumCoding"
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
        <el-form-item label="名称: " :model="addForm" prop="name">
          <el-input v-model="addForm.name" placeholder="如:&nbsp;保洁服务订单编码等"></el-input>
        </el-form-item>
        <el-form-item label="编码格式: " :model="addForm" prop="codingStyle">
          <el-input v-model="addForm.codingStyle" placeholder="请使用星号(*)代替编码中的数字"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" label-width="100px">
        <el-form-item label="名称" :model="editForm" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="编码格式" :model="editForm" prop="codingStyle">
          <el-input v-model="editForm.codingStyle"></el-input>
        </el-form-item>
      </el-form>
    </table-template>
  </div>
</template>

<script>
import TableTemplate from '../../components/TableTemplate'
export default {
  name: 'orderNumCoding',
  data () {
    return {
      refreshObj: {},
      refreshUrl: 'basicCoding/findBasicCodingWithType/orderNumCoding',
      addUrl: 'basicCoding/addBasicCoding',
      editUrl: 'basicCoding/editBasicCoding',
      deleteUrl: 'basicCoding/deletePost',
      tableName: 'orderNumCoding',
      tableTitle: '订单号编码', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'name', label: '名称', width: '220'},
        {value: 'abbreviation', label: '名称缩写', width: '180'},
        {value: 'codingStyle', label: '编码格式', width: '200'},
        {value: 'finalEditor', label: '编辑人', width: '120'},
        {value: 'finalEditTime', label: '最后编辑时间', minWidth: '220'}
      ],
      addForm: {name: '', codingStyle: ''}, // 新增数据界面
      editForm: {id: null, name: null, codingStyle: null}, // 编辑数据界面
      finalEditor: sessionStorage.getItem('save_username'),
      typeName: 'orderNumCoding',
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
      this.addForm.type = this.typeName
      this.addForm.finalEditor = this.finalEditor
      this.$refs[this.tableName].createData(this.addUrl, this.refreshUrl, this.addForm)
    },
    selectRowClick (row) {
      this.editForm = row
      // this.id = row.id
    },
    editRecord () {
      this.editForm.type = this.typeName
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
