<template>
  <div>
    <table-template
      ref="graduateSchool"
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
          <el-input v-model="addForm.name" placeholder="院校名，如: 山东科技大学"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" label-width="100px">
        <el-form-item label="名称" :model="editForm" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
      </el-form>
    </table-template>
  </div>
</template>

<script>
import TableTemplate from '../../components/TableTemplate'
export default {
  name: 'graduateSchool',
  data () {
    return {
      refreshObj: {},
      refreshUrl: 'basicCoding/findBasicCodingWithType/graduateSchool',
      addUrl: 'basicCoding/addBasicCoding',
      editUrl: 'basicCoding/editBasicCoding',
      deleteUrl: 'basicCoding/deleteBasicCoding',
      tableName: 'graduateSchool',
      tableTitle: '院校编码', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'number', label: '编码', width: '120'},
        {value: 'upper_number', label: '毕业院校', width: '220'},
        {value: 'final_editor', label: '编辑人', width: '120'},
        {value: 'final_edit_time', label: '最后修改时间', width: '280'}
      ],
      addForm: {number: '', upper_number: '', name: '', responsibilities: '', remarks: ''}, // 新增数据界面
      editForm: {id: null, number: null, upper_number: null, name: null, responsibilities: null, remarks: null}, // 编辑数据界面
      finalEditor: sessionStorage.getItem('save_username'),
      typeName: 'graduateSchool',
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
