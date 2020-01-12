<template>
  <div>
    <table-template
      ref="postTable"
      :refresh-url="refreshUrl"
      :add-url="addUrl"
      :edit-url="editUrl"
      :delete-url="deleteUrl"
      :table-title="tableTitle"
      :table-header-list="tableHeaderList"
      :table-p-k="tablePK"
      :func-btn="funcBtn"
      :button-boolean="buttonBoolean"
      v-on:addRecord="addRecord"
      v-on:editRecord="editRecord"
      v-on:select-row="selectRowClick">
      <!-- 新增窗口 -->
      <el-form slot="add" style="overflow: auto" label-width="100px">
        <el-form-item label="编码" :model="addForm" prop="number">
          <el-input v-model="addForm.number"></el-input>
        </el-form-item>
        <el-form-item label="上一级岗位编号" :model="addForm" prop="upperNumber">
          <el-input v-model="addForm.upperNumber"></el-input>
        </el-form-item>
        <el-form-item label="名称" :model="addForm" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="职责" :model="addForm" prop="responsibilities">
          <el-input v-model="addForm.responsibilities"></el-input>
        </el-form-item>
        <el-form-item label="备注" :model="addForm" prop="remarks">
          <el-input v-model="addForm.remarks"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" label-width="100px">
        <el-form-item label="编码" :model="editForm" prop="number">
          <el-input v-model="editForm.number"></el-input>
        </el-form-item>
        <el-form-item label="上一级岗位编号" :model="editForm" prop="upperNumber">
          <el-input v-model="editForm.upperNumber"></el-input>
        </el-form-item>
        <el-form-item label="名称" :model="editForm" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="职责" :model="editForm" prop="responsibilities">
          <el-input v-model="editForm.responsibilities"></el-input>
        </el-form-item>
        <el-form-item label="备注" :model="editForm" prop="remarks">
          <el-input v-model="editForm.remarks"></el-input>
        </el-form-item>
      </el-form>
    </table-template>
  </div>
</template>

<script>
import TableTemplate from '@/components/TableTemplate'

export default {
  name: 'post',
  data () {
    return {
      refreshUrl: 'basicCoding/findAllPost',
      addUrl: 'basicCoding/addPost',
      editUrl: 'basicCoding/editPost',
      deleteUrl: 'basicCoding/deletePost',
      tableName: 'postTable',
      tableTitle: '岗位管理', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'name', label: '岗位名', width: '120'},
        {value: '', label: '上级岗位名', width: '120'},
        {value: 'number', label: '岗位编码', width: '120'},
        {value: 'finalEditor', label: '修改人', width: '120'},
        {value: 'finalEditTime', label: '修改时间', width: '200'},
        {value: 'upperNumber', label: '上一级岗位编码', width: '160'},
        {value: 'responsibilities', label: '岗位职责', width: '320'},
        {value: 'remarks', label: '备注', width: '180'},
        {value: 'finalEditor', label: '修改人', width: '120'},
        {value: 'finalEditTime', label: '修改时间', width: '220'}
      ],
      addForm: {number: '', upperNumber: '', name: '', responsibilities: '', remarks: ''}, // 新增数据界面
      editForm: {id: null, number: null, upperNumber: null, name: null, responsibilities: null, remarks: null}, // 编辑数据界面
      buttonBoolean: {
        addBtn: true,
        editBtn: true,
        deleteBtn: true,
        refreshBtn: true,
        import: true,
        export: true,
        acceptOrder: false
      },
      funcBtn: {
        isShow: 'true',
        width: '120',
        fixed: 'right',
        buttons: [
          {
            name: '详细信息',
            value: 'dispatchingCar'
          }
        ]
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
