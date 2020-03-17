<template>
  <div>
    <table-template
      ref="toolsTable"
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
        <el-form-item label="工具名称" :model="addForm" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="类型" :model="addForm" prop="type">
          <el-input v-model="addForm.type"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" label-width="100px">
        <el-form-item label="工具名称" :model="editForm" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="类型" :model="editForm" prop="type">
          <el-input v-model="editForm.type"></el-input>
        </el-form-item>
      </el-form>
    </table-template>
  </div>
</template>

<script>
import TableTemplate from '../../components/TableTemplate'
export default {
  name: 'tools',
  data () {
    return {
      refreshUrl: 'tools/findAllTools',
      addUrl: 'tools/addTools',
      editUrl: 'tools/editTools',
      deleteUrl: 'tools/DeleteTools',
      tableName: 'toolsTable',
      tablePK: 'id', // 主键id值
      tableTitle: '工具管理', // 表格标题
      tableHeaderList: [ // 表头字段
        {value: 'name', label: '工具名称', width: '120'},
        {value: 'type', label: '工具名称', width: '220'},
        {value: 'final_editor', label: '最后修改', width: '220'},
        {value: 'final_edit_time', label: '最后修改时间', minWidth: '220'}
      ],
      addForm: {name: '', type: ''},
      editForm: {name: null, type: null},
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
    this.$refs.toolsTable.refreshData(this.refreshUrl)
  }
}
</script>

<style scoped>
</style>
