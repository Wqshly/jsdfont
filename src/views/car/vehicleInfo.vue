<template>
  <div>
    <el-col :span="spanNum" style="padding-bottom: 10px">
      <table-template
      ref="carInfoTable"
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
      <el-button v-if="spanNum === 24" slot="button-Area" @click.native="openRight" class="btnCollapse">展开右侧栏</el-button>
      <el-button v-if="spanNum === 11" slot="button-Area" @click.native="collapseRight" class="btnCollapse">折叠右侧栏</el-button>
      <!-- 新增窗口 -->
      <el-form slot="add" style="overflow: auto" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="车辆类型" :model="addForm" prop="type">
              <el-select v-model="addForm.type" placeholder="请选择"
                         @click.native="getTypeOption('basicCoding/findBasicCodingWithType/carCategory', 'carCategory')">
                <el-option
                  v-for="item in carCategory"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车辆状态" :model="addForm" prop="numberPlate">
              <el-select v-model="addForm.status" placeholder="请选择" @click.native="getTypeOption('basicCoding/findBasicCodingWithType/carStatus', 'carStatus')">
                <el-option
                  v-for="item in carStatus"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="车主" :model="addForm" prop="holder">
          <el-input v-model="addForm.holder"></el-input>
        </el-form-item>
        <el-form-item label="车牌号" :model="addForm" prop="carNumber">
          <el-input v-model="addForm.carNumber"></el-input>
        </el-form-item>
        <el-form-item label="车辆编号" :model="addForm" prop="numberPlate">
          <el-input v-model="addForm.numberPlate"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" label-width="100px">
        <el-form-item label="拥有者" :model="editForm" prop="holder">
          <el-input v-model="editForm.holder"></el-input>
        </el-form-item>
        <el-form-item label="类型" :model="editForm" prop="type">
          <el-input v-model="editForm.type"></el-input>
        </el-form-item>
        <el-form-item label="车牌号" :model="editForm" prop="carNumber">
          <el-input v-model="editForm.carNumber"></el-input>
        </el-form-item>
        <el-form-item label="车辆编号" :model="editForm" prop="numberPlate">
          <el-input v-model="editForm.numberPlate"></el-input>
        </el-form-item>
        <el-form-item label="登记时间" :model="editForm" prop="registerTime">
          <el-input v-model="editForm.registerTime"></el-input>
        </el-form-item>
      </el-form>
    </table-template>
    </el-col>
    <el-col :span="24-spanNum" v-if="spanNum === 11"></el-col>
  </div>
</template>

<script>
import TableTemplate from '@/components/TableTemplate'

export default {
  name: 'vehicleRegistration',
  data () {
    return {
      spanNum: 24,
      refreshObj: {},
      refreshUrl: 'carInfo/findAllCarInfo',
      addUrl: 'carInfo/addCarInfo',
      editUrl: 'carInfo/editCarInfo',
      deleteUrl: 'carInfo/deleteCarInfo',
      tableName: 'carInfoTable',
      tableTitle: '车辆登记信息', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'type', label: '车辆类型', width: '120'},
        {value: 'numberPlate', label: '车辆编号', width: '120'},
        {value: 'holder', label: '车主', width: '120'},
        {value: 'carNumber', label: '车牌号', width: '120'},
        {value: 'status', label: '状态', width: '120'},
        {value: 'registerTime', label: '车辆登记时间', width: '220'},
        {value: 'finalEditor', label: '登记人', width: '120'},
        {value: 'finalEditTime', label: '修改时间', width: '220'}
      ],
      addForm: {type: '', carNumber: '', holder: '', numberPlate: '', status: ''}, // 新增数据界面
      editForm: {id: null, holder: null, type: null, carNumber: null, numberPlate: null, finalEditor: null, finalEditTime: null, registerTime: null, status: null}, // 编辑数据界面
      finalEditor: sessionStorage.getItem('save_username'),
      carCategory: [],
      carStatus: [],
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
    getTypeOption (url, optionName) {
      this.$api.requestApi.get(url)
        .then(res => {
          console.log(res.data)
          this[optionName] = res.data.data
          console.log(this[optionName])
        })
        .catch(err => {
          this.$message({
            message: '网络请求失败',
            type: 'error'
          })
          console.log(err.data)
        })
    },
    collapseRight () {
      this.spanNum = 24
    },
    openRight () {
      this.spanNum = 11
    },
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
    this.$refs.carInfoTable.refreshData(this.refreshUrl, this.refreshObj)
  }
}
</script>

<style scoped>
  .btnCollapse {
    float: right;
    margin-top: 5px;
  }
</style>
