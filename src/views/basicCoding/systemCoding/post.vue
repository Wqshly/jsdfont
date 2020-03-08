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
      v-on:select-row="selectRowClick"
      v-on:btn-click="btnClick">
      <!-- 新增窗口 -->
      <el-form slot="add" style="overflow: auto" :model="addForm" label-width="120px" ref="addForm" :rules="addFormRules">
        <el-form-item label="编码">
          <el-radio v-model="addForm.radio" :label="false">自动生成</el-radio>
          <el-radio v-model="addForm.radio" :label="true">手动编辑</el-radio>
        </el-form-item>
        <el-form-item v-if="addForm.radio" prop="number">
          <el-input v-model="addForm.number"></el-input>
        </el-form-item>
        <el-form-item label="上级岗位名/编号" prop="upperNumber">
          <el-select v-model="addForm.upperNumber" placeholder="请选择" @click.native="getOrderModelTable()">
            <el-option
              v-for="item in orderTypeTable"
              :key="item.id"
              :label="item.name + '(' + item.number + ')'"
              :value="item.name + '(' + item.number + ')'">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="addForm.name" placeholder="例: 总经办、技术部等"></el-input>
        </el-form-item>
        <el-form-item label="职责" prop="responsibilities">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" maxlength="240" show-word-limit v-model="addForm.responsibilities"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" maxlength="220" show-word-limit v-model="addForm.remarks"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" label-width="120px" :model="editForm">
        <el-form-item label="编码" prop="number">
          <el-input v-model="editForm.number"></el-input>
        </el-form-item>
        <el-form-item label="上级岗位名/编号" prop="upperNumber">
          <el-select v-model="editForm.upperNumber" placeholder="请选择" @click.native="getOrderModelTable()">
            <el-option
              v-for="item in orderTypeTable"
              :key="item.id"
              :label="item.name + '(' + item.number + ')'"
              :value="item.name + '(' + item.number + ')'">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="职责" prop="responsibilities">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="editForm.responsibilities"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="editForm.remarks"></el-input>
        </el-form-item>
      </el-form>
      <!-- 详情页面 -->
      <el-form slot="detail" style="overflow: auto;float: left;" label-width="120px" :model="editForm">
        <el-form-item class="half-label" label="岗位编码:" prop="number">
          {{editForm.number !== null ? editForm.number : "未填写"}}
        </el-form-item>
        <el-form-item class="half-label" label="岗位名称:" prop="name">
          {{editForm.name !== null ? editForm.name : "未填写"}}
        </el-form-item>
        <el-form-item class="half-label" label="上级岗位编码:" prop="name">
          {{editForm.upperNumber !== null ? editForm.upperNumber : "未填写"}}
        </el-form-item>
        <el-form-item class="half-label" style="width: 600px" label="职责:" prop="phone">
          {{editForm.responsibilities !== null ? editForm.responsibilities : "未填写"}}
        </el-form-item>
        <el-form-item class="half-label" style="width: 600px" label="备注:" prop="discipline">
          {{editForm.remarks !== null ? editForm.remarks : "未填写"}}
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
      refreshObj: {},
      refreshUrl: 'basicCoding/findAllPost',
      addUrl: 'basicCoding/addPost',
      editUrl: 'basicCoding/editPost',
      deleteUrl: 'basicCoding/deletePost',
      tableName: 'postTable',
      tableTitle: '岗位设置', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'name', label: '岗位名', width: '120'},
        {value: 'upperNumber', label: '上级岗位名', width: '120'},
        {value: 'finalEditor', label: '修改人', width: '120'},
        {value: 'finalEditTime', label: '修改时间', width: '200'}
      ],
      addForm: {number: '', upperNumber: '', radio: false, name: '', responsibilities: '', remarks: ''}, // 新增数据界面
      addFormRules: {
        name: [
          {required: true, message: '请输入岗位名称', trigger: 'blur'},
          {min: 2, max: 11, message: '请输入正确的岗位名', trigger: 'blur'}
        ]
      },
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
      finalEditor: sessionStorage.getItem('save_username'),
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
      },
      orderTypeTable: []
    }
  },
  components: {
    TableTemplate
  },
  watch: {
    orderTypeTable (val) {
      console.log(this.orderTypeTable)
      this.orderTypeTable = val
    }
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
    },
    btnClick () {
      this.$refs[this.tableName].detailVisible = true
      this.$refs[this.tableName].editDialogVisible = true
    },
    getOrderModelTable () {
      this.$api.requestApi.get(this.refreshUrl)
        .then(res => {
          console.log(res.data)
          this.orderTypeTable = res.data.data
          console.log(this.orderTypeTable)
          this.orderTypeTable.unshift({name: '根目录', number: 'Null'})
          console.log(this.orderTypeTable)
        })
        .catch(err => {
          this.$message({
            message: '网络请求失败',
            type: 'error'
          })
          console.log(err.data)
        })
    },
    changeFixed () {
    }
  },
  mounted () {
    this.$refs[this.tableName].refreshData(this.refreshUrl, this.refreshObj)
  }
}
</script>

<style lang="less" scoped>
  .dialog-style {
    position: fixed;
  }

  .half-label {
    float: left;
    width: 300px;
  }

  .detail-column {
    height: 20px;
  }
</style>
