<template>
  <div>
    <el-col :span="detail ? 9 : 24">
      <table-template
        ref="customerContractTable"
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
        <el-button slot="button-Area" @click.native="showDetail" class="btnCollapse">{{detail ? buttonHiddenText :
          buttonShowText}}
        </el-button>
        <!-- 新增窗口 -->
        <el-form slot="add" style="overflow: auto" label-width="100px" :model="addForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="合同编码">
                <el-radio v-model="addForm.radio" :label="false">自动生成</el-radio>
                <el-radio v-model="addForm.radio" :label="true">手动编辑</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="addForm.radio" label="合同编号" prop="contractNumber">
                <el-input v-model="addForm.contractNumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目名称" prop="projectName">
                <el-input v-model="addForm.projectName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同状态" prop="contractStatus">
                <el-select v-model="addForm.contractStatus" placeholder="请选择"
                           @click.native="getTypeOption('basicCoding/findBasicCodingWithType/contractStatus', 'contractStatus')">
                  <el-option
                    v-for="item in contractStatus"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="甲方" prop="partyA">
                <el-input v-model="addForm.partyA"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签约人(甲方)" prop="signatoryPartyA">
                <el-select v-model="addForm.signatoryPartyA" placeholder="请选择"
                           @click.native="getTypeOption('customer/findAllCustomer', 'partyA')">
                  <el-option
                    v-for="item in partyA"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="乙方" prop="partyB">
                <el-input v-model="addForm.partyB"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签约人(乙方)" prop="signatoryPartyB">
                <el-select v-model="addForm.signatoryPartyB" placeholder="请选择"
                           @click.native="getTypeOption('staff/findAllStaff', 'partyB')">
                  <el-option
                    v-for="item in partyB"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="签约时间" prop="signingTime">
                <el-date-picker v-model="addForm.signingTime" type="date" placeholder="请选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合于生效时间" prop="entryIntoForceTime">
                <el-date-picker v-model="addForm.entryIntoForceTime" type="date" placeholder="请选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 编辑窗口 -->
        <el-form slot="edit" style="overflow: auto" label-width="100px" :model="editForm">
          <el-form-item v-if="editForm.radio" label="合同编号" prop="contractNumber">
            <el-input v-model="editForm.contractNumber"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目名称" prop="projectName">
                <el-input v-model="editForm.projectName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同状态" prop="contractStatus">
                <el-select v-model="editForm.contractStatus" placeholder="请选择"
                           @click.native="getTypeOption('basicCoding/findBasicCodingWithType/contractStatus', 'contractStatus')">
                  <el-option
                    v-for="item in contractStatus"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="甲方" prop="partyA">
                <el-input v-model="editForm.partyA"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签约人(甲方)" prop="signatoryPartyA">
                <el-select v-model="editForm.signatoryPartyA" placeholder="请选择"
                           @click.native="getTypeOption('customer/findAllCustomer', 'partyA')">
                  <el-option
                    v-for="item in partyA"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="乙方" prop="partyB">
                <el-input v-model="editForm.partyB"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签约人(乙方)" prop="signatoryPartyB">
                <el-select v-model="editForm.signatoryPartyB" placeholder="请选择"
                           @click.native="getTypeOption('staff/findAllStaff', 'partyB')">
                  <el-option
                    v-for="item in partyB"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="签约时间" prop="signingTime">
                <el-date-picker v-model="editForm.signingTime" type="date" placeholder="请选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合于生效时间" prop="entryIntoForceTime">
                <el-date-picker v-model="editForm.entryIntoForceTime" type="date" placeholder="请选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </table-template>
    </el-col>
    <el-col :span="detail ? 15 : 0">
      <el-button slot="button-Area" @click.native="showDetail" class="btnCollapse">显示详情</el-button>
      <el-tabs tab-position="left" style="background: #FFFFFF;margin-left: 5px;border-radius: 5px"
               @tab-click="tabClick">
        <el-tab-pane label="合同详情">
          <contract-detail ref="contractDetail">
          </contract-detail>
        </el-tab-pane>
        <el-tab-pane label="合同文件">
          <contract-folder ref="contractDetail">
          </contract-folder>
        </el-tab-pane>
        <el-tab-pane label="合同详情">
          <contract-detail ref="contractDetail">
          </contract-detail>
        </el-tab-pane>
        <el-tab-pane label="合同详情">
          <contract-detail ref="contractDetail">
          </contract-detail>
        </el-tab-pane>
        <el-tab-pane label="合同详情">
          <contract-detail ref="contractDetail">
          </contract-detail>
        </el-tab-pane>
        <el-tab-pane label="合同详情">
          <contract-detail ref="contractDetail">
          </contract-detail>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </div>
</template>

<script>
import TableTemplate from '@/components/TableTemplate'
import contractDetail from '@/views/customer/contractDetail'
import contractFolder from '@/views/customer/contractFolder'

export default {
  name: 'customerContract',
  data () {
    return {
      buttonHiddenText: '隐藏右侧栏',
      buttonShowText: '显示右侧栏',
      detail: false,
      refreshObj: {},
      refreshUrl: 'customer/findAllContract',
      addUrl: 'customer/addContract',
      editUrl: 'customer/editContract',
      deleteUrl: 'customer/deleteContract',
      tableName: 'customerContractTable',
      tablePK: 'id', // 主键id值
      tableTitle: '客户合同管理', // 表格标题
      tableHeaderList: [ // 表头字段
        {value: 'contractNumber', label: '合同编号', width: '150'},
        {value: 'projectName', label: '项目名称', width: '160'},
        {value: 'contractStatus', label: '合同状态', width: '120'},
        {value: 'partyA', label: '甲方', width: '140'},
        {value: 'partyB', label: '乙方', width: '140'},
        {value: 'signatoryPartyA', label: '签约人(甲方)', width: '130'},
        {value: 'signatoryPartyB', label: '签约人(乙方)', width: '130'},
        {value: 'signingTime', label: '签约时间', width: '180'},
        {value: 'entryIntoForceTime', label: '合约生效日期', width: '180'},
        {value: 'finalEditor', label: '修改人', width: '120'},
        {value: 'finalEditTime', label: '最后修改时间', minWidth: '220'}
      ],
      addForm: {
        radio: false,
        contractNumber: '',
        projectName: '',
        contractStatus: '',
        partyA: '',
        partyB: '',
        signatoryPartyA: '',
        signatoryPartyB: '',
        signingTime: '',
        entryIntoForceTime: '',
        finalEditor: sessionStorage.getItem('save_username')
      },
      editForm: {
        contractNumber: null,
        projectName: null,
        contractStatus: null,
        partyA: null,
        partyB: null,
        signatoryPartyA: null,
        signatoryPartyB: null,
        signingTime: null,
        entryIntoForceTime: null,
        finalEditor: sessionStorage.getItem('save_username')
      },
      buttonBoolean: {
        addBtn: true,
        editBtn: true,
        deleteBtn: true,
        refreshBtn: true,
        import: false,
        export: true,
        acceptOrder: false
      },
      partyA: [],
      partyB: [],
      contractStatus: []
    }
  },
  components: {
    TableTemplate,
    contractDetail,
    contractFolder
  },
  methods: {
    showDetail () {
      this.detail = this.detail !== true
    },
    showCustomerContract () {
      this.detail = true
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
    addRecord () {
      this.$refs[this.tableName].createData(this.addUrl, this.refreshUrl, this.addForm)
    },
    tabClick (data) {
      if (data.label === '入离职管理' && this.firstClickIsQuit) {
        this.firstClickIsQuit = false
        this.$refs['isQuit'].refreshTable(this.staffSelectId)
      }
      this.initTab = data.label
    },
    selectRowClick (row) {
      this.editForm = row
      // this.id = row.id
    },
    editRecord () {
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
  .btnCollapse {
    float: right;
    margin-top: 5px;
  }
</style>
