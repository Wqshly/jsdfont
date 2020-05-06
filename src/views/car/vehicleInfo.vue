<template>
  <div>
    <el-col :span="detail ? spanNum : 24" style="padding-bottom: 10px">
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
        v-on:select-row="selectRowClick"
        v-on:refresh-btn="refreshBtn">
        <el-button slot="button-Area" @click.native="collapseRight" class="btnCollapse">
          {{detail ? buttonHiddenText : buttonShowText}}
        </el-button>
        <!-- 新增窗口 -->
        <el-form slot="add" style="overflow: auto" label-width="100px" :model="addForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="车辆类型" prop="type">
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
              <el-form-item label="车辆状态" prop="numberPlate">
                <el-select v-model="addForm.status" placeholder="请选择"
                           @click.native="getTypeOption('basicCoding/findBasicCodingWithType/carStatus', 'carStatus')">
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
          <el-form-item label="车主" prop="holder">
            <el-input v-model="addForm.holder"></el-input>
          </el-form-item>
          <el-form-item label="车牌号" prop="carNumber">
            <el-input v-model="addForm.carNumber"></el-input>
          </el-form-item>
          <el-form-item label="车辆编号" prop="numberPlate">
            <el-input v-model="addForm.numberPlate"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input v-model="addForm.remarks"></el-input>
          </el-form-item>
        </el-form>
        <!-- 编辑窗口 -->
        <el-form slot="edit" style="overflow: auto" label-width="100px" :model="editForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="车辆类型" prop="type">
                <el-select v-model="editForm.type" placeholder="请选择"
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
              <el-form-item label="车辆状态" prop="numberPlate">
                <el-select v-model="editForm.status" placeholder="请选择"
                           @click.native="getTypeOption('basicCoding/findBasicCodingWithType/carStatus', 'carStatus')">
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
          <el-form-item label="车主" prop="holder">
            <el-input v-model="editForm.holder"></el-input>
          </el-form-item>
          <el-form-item label="车牌号" prop="carNumber">
            <el-input v-model="editForm.carNumber"></el-input>
          </el-form-item>
          <el-form-item label="车辆编号" prop="numberPlate">
            <el-input v-model="editForm.numberPlate"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input v-model="editForm.remarks"></el-input>
          </el-form-item>
        </el-form>
      </table-template>
    </el-col>
    <el-col  :span="detail ? 24-spanNum : 0">
      <el-tabs tab-position="left" style="background: #FFFFFF;margin-left: 5px;border-radius: 5px"
               @tab-click="tabClick">
        <el-tab-pane label="行驶记录">
          <driving-record ref="drivingRecord"></driving-record>
        </el-tab-pane>
        <el-tab-pane label="违章记录">
          <violation-record ref="violationRecord"></violation-record>
        </el-tab-pane>
        <el-tab-pane label="保养记录">
          <vehicle-maintenance ref="vehicleMaintenance"></vehicle-maintenance>
        </el-tab-pane>
        <el-tab-pane label="维修记录">
          <vehicle-repair ref="vehicleRepair"></vehicle-repair>
        </el-tab-pane>
        <el-tab-pane label="加油记录">
          <oil-addition-record ref="oilAdditionRecord"></oil-addition-record>
        </el-tab-pane>
        <el-tab-pane label="高速记录">
          <high-speed-driving-record ref="highSpeedDrivingRecord"></high-speed-driving-record>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </div>
</template>

<script>
import TableTemplate from '@/components/TableTemplate'
import drivingRecord from '@/views/car/carManage/drivingRecord'
import violationRecord from '@/views/car/carManage/violationRecord'
import vehicleMaintenance from '@/views/car/carManage/vehicleMaintenance'
import vehicleRepair from '@/views/car/carManage/vehicleRepair'
import oilAdditionRecord from '@/views/car/carManage/oilAdditionRecord'
import highSpeedDrivingRecord from '@/views/car/carManage/highSpeedDrivingRecord'

export default {
  components: {
    TableTemplate,
    drivingRecord,
    violationRecord,
    vehicleMaintenance,
    vehicleRepair,
    oilAdditionRecord,
    highSpeedDrivingRecord
  },
  name: 'vehicleRegistration',
  data () {
    return {
      buttonHiddenText: '折叠管理栏',
      buttonShowText: '展开管理栏',
      spanNum: 9,
      detail: false,
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
        {value: 'holder', label: '车主', width: '180'},
        {value: 'carNumber', label: '车牌号', width: '120'},
        {value: 'status', label: '状态', width: '120'},
        {value: 'remarks', label: '备注', width: '160'},
        {value: 'finalEditor', label: '修改人', width: '120'},
        {value: 'finalEditTime', label: '修改时间', minWidth: '220'}
      ],
      addForm: {type: '', carNumber: '', holder: '', numberPlate: '', status: '', remarks: ''}, // 新增数据界面
      editForm: {
        id: null,
        holder: null,
        type: null,
        carNumber: null,
        numberPlate: null,
        finalEditor: null,
        finalEditTime: null,
        registerTime: null,
        status: null,
        remarks: null
      }, // 编辑数据界面
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
      },
      initTab: '行驶记录',
      vehicleSelectId: null,
      firstClickDrivingRecord: false
    }
  },
  methods: {
    refreshBtn () {
      this.vehicleSelectId = null
      this.$refs['drivingRecord'].clearTable()
    },
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
      this.detail = !this.detail
    },
    // 增方法
    addRecord () {
      this.addForm.finalEditor = this.finalEditor
      this.$refs[this.tableName].createData(this.addUrl, this.refreshUrl, this.addForm)
    },
    tabClick (data) {
      if (data.label === '行驶记录' && this.firstClickDrivingRecord) {
        this.firstClickDrivingRecord = false
        this.$refs['drivingRecord'].refreshTable(this.vehicleSelectId)
      }
      this.initTab = data.label
    },
    selectRowClick (row) {
      this.editForm = row
      if (this.spanNum === 9) {
        this.vehicleSelectId = row.id
        console.log(this.vehicleSelectId)
        this.firstClickDrivingRecord = true
        if (this.initTab === '行驶记录') {
          this.$refs['drivingRecord'].refreshTable(this.vehicleSelectId)
          this.firstClickDrivingRecord = false
        }
      }
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
