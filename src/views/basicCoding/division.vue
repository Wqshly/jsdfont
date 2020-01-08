<template>
  <div>
    <table-template
      ref="division"
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
        <el-form-item label="行政区分" :model="addForm" prop="upper_number">
          <el-input v-model="addForm.upper_number"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" label-width="100px">
        <el-form-item label="编码" :model="editForm" prop="number">
          <el-input v-model="editForm.number"></el-input>
        </el-form-item>
        <el-form-item label="行政区分" :model="editForm" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
      </el-form>
    </table-template>
  </div>
</template>

<script>
import TableTemplate from '../../components/TableTemplate'
export default {
  name: 'division',
  data () {
    return {
      refreshUrl: 'basicCoding/findAllPost',
      addUrl: 'basicCoding/addPost',
      editUrl: 'basicCoding/editPost',
      deleteUrl: 'basicCoding/deletePost',
      tableName: 'division',
      tableTitle: '行政划分编码', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'number', label: '编码', width: '120'},
        {value: 'upper_number', label: '行政区分', width: '220'},
        {value: 'final_editor', label: '最后修改', width: '120'},
        {value: 'final_edit_time', label: '最后修改时间', width: '120'}
      ],
      addForm: {number: '', upper_number: '', name: '', responsibilities: '', remarks: ''}, // 新增数据界面
      editForm: {id: null, number: null, upper_number: null, name: null, responsibilities: null, remarks: null}, // 编辑数据界面
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
    this.$refs[this.tableName].refreshData(this.refreshUrl)
  }
}
</script>

<style scoped>
</style>
