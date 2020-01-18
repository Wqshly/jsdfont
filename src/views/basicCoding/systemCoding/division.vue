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
      :func-btn="funcBtn"
      :button-boolean="buttonBoolean"
      v-on:addRecord="addRecord"
      v-on:editRecord="editRecord"
      v-on:select-row="selectRowClick"
      v-on:btn-click="btnClick">
      <!-- 新增窗口 -->
      <el-form slot="add" style="overflow: auto" label-width="120px" :model="addForm" >
        <el-form-item label="区划名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="编码">
            <el-radio v-model="addForm.radio" label="1">自动生成</el-radio>
            <el-radio v-model="addForm.radio" label="2">手动编辑</el-radio>
        </el-form-item>
        <el-form-item prop="number">
          <el-input v-model="addForm.number" v-if="addForm.radio === '2'"></el-input>
        </el-form-item>
        <el-form-item label="上级区划名/编号" prop="upperNumber">
          <el-select v-model="addForm.upperNumber" placeholder="请选择" @click.native="getOrderModelTable()">
            <el-option
              v-for="item in orderTypeTable"
              :key="item.id"
              :label="item.name + '(' + item.number + ')'"
              :value="item.name + '(' + item.number + ')'">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区划事务" prop="responsibilities">
          <el-input type="textarea" v-model="addForm.responsibilities" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="addForm.remarks" :autosize="{minRows: 2, maxRows: 5}"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" label-width="120px">
        <el-form-item label="编码" :model="editForm" prop="number">
          <el-input v-model="editForm.number"></el-input>
        </el-form-item>
        <el-form-item label="上级区划名/编号" :model="editForm" prop="upperNumber">
          <el-select v-model="editForm.upperNumber" placeholder="请选择" @click.native="getOrderModelTable()">
            <el-option
              v-for="item in orderTypeTable"
              :key="item.id"
              :label="item.name + '(' + item.number + ')'"
              :value="item.name + '(' + item.number + ')'">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区划名称" :model="editForm" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="区划事务" :model="editForm" prop="responsibilities">
          <el-input v-model="editForm.responsibilities"></el-input>
        </el-form-item>
        <el-form-item label="备注" :model="editForm" prop="remarks">
          <el-input v-model="editForm.remarks"></el-input>
        </el-form-item>
      </el-form>
      <!-- 详情页面 -->
      <el-form slot="detail" style="overflow: auto;float: left;" label-width="120px">
        <el-form-item class="half-label" label="区划编码:" :model="editForm" prop="number">
          {{editForm.number !== null ? editForm.number : "未填写"}}
        </el-form-item>
        <el-form-item class="half-label" label="区划名称:" :model="editForm" prop="name">
          {{editForm.name !== null ? editForm.name : "未填写"}}
        </el-form-item>
        <el-form-item class="half-label" label="上级区划编码:" :model="editForm" prop="name">
          {{editForm.upperNumber !== null ? editForm.upperNumber : "未填写"}}
        </el-form-item>
        <el-form-item class="half-label" style="width: 600px" label="区划事务:" :model="editForm" prop="phone">
          {{editForm.responsibilities !== null ? editForm.responsibilities : "未填写"}}
        </el-form-item>
        <el-form-item class="half-label" style="width: 600px" label="备注:" :model="editForm" prop="discipline">
          {{editForm.remarks !== null ? editForm.remarks : "未填写"}}
        </el-form-item>
      </el-form>
    </table-template>
  </div>
</template>

<script>
import TableTemplate from '@/components/TableTemplate'
export default {
  name: 'division',
  data () {
    return {
      refreshUrl: 'basicCoding/findAllDivision',
      addUrl: 'basicCoding/addDivision',
      editUrl: 'basicCoding/editDivision',
      deleteUrl: 'basicCoding/deleteDivision',
      tableName: 'division',
      tableTitle: '行政划分编码', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'name', label: '区划名', width: '120'},
        {value: 'upperNumber', label: '上级区划名(区划编码)', width: '200'},
        {value: 'finalEditor', label: '最后修改人', width: '120'},
        {value: 'finalEditTime', label: '最后修改时间', width: '220'}
      ],
      addForm: {number: '', upperNumber: '', name: '', radio: '1', responsibilities: '', remarks: ''}, // 新增数据界面
      editForm: {id: null, number: null, upperNumber: null, name: null, responsibilities: null, remarks: null}, // 编辑数据界面
      finalEditor: sessionStorage.getItem('save_username'),
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
      },
      orderTypeTable: []
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
    },
    btnClick () {
      this.$refs[this.tableName].detailVisible = true
      this.$refs[this.tableName].editDialogVisible = true
    },
    getOrderModelTable () {
      this.$api.getRequestApi.get(this.refreshUrl)
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
    this.$refs[this.tableName].refreshData(this.refreshUrl)
  }
}
</script>

<style scoped>
</style>
