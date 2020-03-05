<template>
  <div>
    <table-template
      ref="carStatus"
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
      <el-form slot="add" style="overflow: auto" :model="addForm" label-width="100px" ref="addForm" :rules="addFormRule">
        <el-form-item label="名称: " prop="name">
          <el-input v-model="addForm.name" placeholder="员工的状态，如: 在职、离职、休假等"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" :model="editForm" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
      </el-form>
    </table-template>
  </div>
</template>

<script>
import TableTemplate from '@/components/TableTemplate'
export default {
  name: 'carStatus',
  data () {
    return {
      refreshObj: {},
      refreshUrl: 'basicCoding/findBasicCodingWithType/carStatus',
      addUrl: 'basicCoding/addBasicCoding',
      editUrl: 'basicCoding/editBasicCoding',
      deleteUrl: 'basicCoding/deleteBasicCoding',
      tableName: 'carStatus',
      tableTitle: '车辆状态编码', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'name', label: '状态名称', width: '120'},
        {value: 'finalEditor', label: '编辑人', width: '120'},
        {value: 'finalEditTime', label: '最后编辑时间', width: '260'}
      ],
      addForm: {name: '', codingStyle: ''}, // 新增数据界面
      addFormRule: {
        name: [
          {required: true, message: '请输入状态名', trigger: 'blur'},
          {min: 2, max: 8, message: '输入长度请在2-8位', trigger: 'blur'}
        ]
      },
      editForm: {id: null, name: null, codingStyle: null}, // 编辑数据界面
      finalEditor: sessionStorage.getItem('save_username'),
      typeName: 'carStatus',
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
      this.$refs.addForm.validate((valid) => {
        this.addForm.type = this.typeName
        this.addForm.finalEditor = this.finalEditor
        if (valid) {
          this.$refs[this.tableName].createData(this.addUrl, this.refreshUrl, this.addForm)
        }
      })
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
