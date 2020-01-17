<template>
  <div class="fill-contain">
    <el-col :span="tableWidth" style="padding-bottom: 10px">
      <table-template
        ref="staffTable"
        :refresh-url="refreshUrl"
        :add-url="addUrl"
        :edit-url="editUrl"
        :delete-url="deleteUrl"
        :table-title="tableTitle"
        :table-height="tableHeight"
        :table-header-list="tableHeaderList"
        :table-p-k="tablePK"
        :func-btn="funcBtn"
        :button-boolean="buttonBoolean"
        v-on:addRecord="addRecord"
        v-on:editRecord="editRecord"
        v-on:select-row="selectRowClick"
        v-on:btn-click="btnClick">
        <!-- 新增窗口 -->
        <el-form slot="add" :model="addForm" style="overflow: auto" label-width="100px" ref="addForm" :rules="addFormRule">
          <el-row>
            <el-col :span="10">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="addForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="编码" prop="number">
                <el-input v-model="addForm.number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="身份证" :model="addForm" prop="identify">
            <el-input v-model="addForm.identify"></el-input>
          </el-form-item>
          <el-form-item label="医保账号" :model="addForm" prop="medical_num">
            <el-input v-model="addForm.medicalNum"></el-input>
          </el-form-item>
          <el-form-item label="银行账号" :model="addForm" prop="bankCardNum">
            <el-input v-model="addForm.bankCardNum"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="员工类别" prop="staffType">
                <el-select v-model="addForm.staffType" placeholder="请选择"
                           @click.native="getTypeOption('basicCoding/findBasicCodingWithType?type=staffNumCoding', 'staffTypeOption')">
                  <el-option
                    v-for="item in staffTypeOption"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" prop="sex">
                <el-select v-model="addForm.sex" placeholder="请选择"
                           @click.native="getTypeOption('basicCoding/findBasicCodingWithType?type=genderCoding', 'genderOption')">
                  <el-option
                    v-for="item in genderOption"
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
              <el-form-item label="状态" :model="addForm" prop="status">
                <el-input v-model="addForm.status"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="当前职位" :model="addForm" prop="currentPosition">
                <el-input v-model="addForm.currentPosition"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="地址:" :model="addForm" prop="address">
            <multilevel-linkage @area-linkage="areaLinkageChange"></multilevel-linkage>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="address2"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="邮件" :model="addForm" prop="email">
                <el-input v-model="addForm.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学历" :model="addForm" prop="education">
                <el-input v-model="addForm.education"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="毕业院校" prop="graduateSchool">
                <el-input v-model="addForm.graduateSchool"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学科" prop="discipline">
                <el-input v-model="addForm.discipline"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 编辑窗口 -->
        <el-form slot="edit" style="overflow: auto" label-width="100px">
          <el-form-item label="编码" :model="editForm" prop="number">
            <el-input v-model="editForm.number"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :model="editForm" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="电话" :model="editForm" prop="phone">
            <el-input v-model="editForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="身份证" :model="editForm" prop="identify">
            <el-input v-model="editForm.identify"></el-input>
          </el-form-item>
          <el-form-item label="性别" :model="editForm" prop="sex">
            <el-input v-model="editForm.sex"></el-input>
          </el-form-item>
          <el-form-item label="邮件" :model="editForm" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="学历" :model="editForm" prop="education">
            <el-input v-model="editForm.education"></el-input>
          </el-form-item>
          <el-form-item label="医保账号" :model="editForm" prop="medicalNum">
            <el-input v-model="editForm.medicalNum"></el-input>
          </el-form-item>
          <el-form-item label="银行账号" :model="editForm" prop="bankCardNum">
            <el-input v-model="editForm.bankCardNum"></el-input>
          </el-form-item>
          <el-form-item label="状态" :model="editForm" prop="status">
            <el-input v-model="editForm.status"></el-input>
          </el-form-item>
          <el-form-item label="当前职位" :model="addForm" prop="currentPosition">
            <el-input v-model="editForm.currentPosition"></el-input>
          </el-form-item>
          <el-form-item label="地址" :model="addForm" prop="address">
            <el-input v-model="editForm.address"></el-input>
          </el-form-item>
          <el-form-item label="学科" :model="addForm" prop="discipline">
            <el-input v-model="editForm.discipline"></el-input>
          </el-form-item>
          <el-form-item label="毕业院校" :model="addForm" prop="graduateSchool">
            <el-input v-model="editForm.graduateSchool">
            </el-input>
          </el-form-item>
        </el-form>
        <!-- 详情窗口 -->
        <el-form slot="detail" style="overflow: auto;" label-width="100px">
          <el-form-item class="half-label" label="编码" :model="editForm" prop="number">
            {{editForm.number !== null ? editForm.number : "未填写"}}
          </el-form-item>
          <el-form-item class="half-label" label="姓名" :model="editForm" prop="name">
            {{editForm.name !== null ? editForm.name : "未填写"}}
          </el-form-item>
          <el-form-item class="half-label" label="电话" :model="editForm" prop="phone">
            {{editForm.phone !== null ? editForm.phone : "未填写"}}
          </el-form-item>
          <el-form-item class="half-label" label="身份证" :model="editForm" prop="identify">
            {{editForm.identify !== null ? editForm.identify : "未填写"}}
          </el-form-item>
          <el-form-item class="half-label" label="性别" :model="editForm" prop="sex">
            {{editForm.sex !== null ? editForm.sex : "未填写"}}
          </el-form-item>
          <el-form-item class="half-label" label="邮件" :model="editForm" prop="email">
            {{editForm.email !== null ? editForm.email : "未填写"}}
          </el-form-item>
          <el-form-item class="half-label" label="学历" :model="editForm" prop="education">
            {{editForm.education !== null ? editForm.education : "未填写"}}
          </el-form-item>
          <el-form-item class="half-label" label="医保账号" :model="editForm" prop="medicalNum">
            {{editForm.medicalNum !== null ? editForm.medicalNum : "未填写"}}
          </el-form-item>
          <el-form-item class="half-label" label="银行账号" :model="editForm" prop="bankCardNum">
            {{editForm.bankCardNum !== null ? editForm.bankCardNum : "未填写"}}
          </el-form-item>
          <el-form-item class="half-label" label="状态" :model="editForm" prop="status">
            {{editForm.status !== null ? editForm.status : "未填写"}}
          </el-form-item>
          <el-form-item class="half-label" label="当前职位" :model="addForm" prop="currentPosition">
            {{editForm.currentPosition !== null ? editForm.currentPosition : "未填写"}}
          </el-form-item>
          <el-form-item class="half-label" label="地址" :model="addForm" prop="address">
            {{editForm.address !== null ? editForm.address : "未填写"}}
          </el-form-item>
          <el-form-item class="half-label" label="学科" :model="addForm" prop="discipline">
            {{editForm.discipline !== null ? editForm.discipline : "未填写"}}
          </el-form-item>
          <el-form-item class="half-label" label="毕业院校" :model="addForm" prop="graduateSchool">
            {{editForm.graduateSchool !== null ? editForm.graduateSchool : "未填写"}}
          </el-form-item>
        </el-form>
      </table-template>
    </el-col>
    <el-col :span="tableWidth">
      <el-tabs type="border-card">
        <el-tab-pane label="绩效考核">
          <!--          <is-quit></is-quit>-->
        </el-tab-pane>
        <el-tab-pane label="职务变动">
          <!--          <is-quit></is-quit>-->
        </el-tab-pane>
        <el-tab-pane label="请销假">
<!--          <is-quit></is-quit>-->
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </div>
</template>

<script>
import TableTemplate from '@/components/TableTemplate'
import MultilevelLinkage from '@/components/MultilevelLinkage'
import isQuit from '../company/isQuit'

export default {
  name: 'staff',
  data () {
    return {
      refreshUrl: 'staff/findAllStaff',
      addUrl: 'staff/addStaff',
      editUrl: 'staff/editStaff',
      deleteUrl: 'staff/deleteStaff',
      staffTypeUrl: 'basicCoding/getStaffType',
      tableName: 'staffTable',
      tableHeight: (`${document.documentElement.clientHeight}` - 100) / 2 - 140,
      tableTitle: '员工管理', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'number', label: '员工编号', width: '120'},
        {value: 'name', label: '员工姓名', width: '120'},
        {value: 'phone', label: '电话', width: '120'},
        {value: 'currentPosition', label: '当前职务', width: '160'},
        {value: 'status', label: '状态', width: '120'},
        {value: 'finalEditor', label: '最后修改人', width: '120'},
        {value: 'finalEditTime', label: '最后修改时间', width: '220'}
      ],
      tableWidth: 12,
      staffTypeOption: [], // 员工类型选择框
      genderOption: [], // 性别选项
      address1: '',
      address2: '',
      addForm: {
        number: '',
        name: '',
        staffType: '',
        phone: '',
        identify: '',
        sex: '',
        email: '',
        education: '',
        medicalNum: '',
        bankCardNum: '',
        status: '',
        discipline: '',
        graduateSchool: '',
        birth: '',
        address: '',
        currentPosition: ''
      }, // 新增数据界面
      addFormRule: {
        name: [
          {required: true, message: '请输入员工姓名', trigger: 'blur'},
          {min: 2, max: 11, message: '请输入正确的姓名', trigger: 'blur'}
        ]
      },
      editForm: {
        id: null,
        number: null,
        name: null,
        phone: null,
        identify: null,
        sex: null,
        email: null,
        education: null,
        medicalNum: null,
        bankCardNum: null,
        status: null,
        discipline: null,
        graduateSchool: null,
        birth: null,
        address: null,
        currentPosition: null
      }, // 编辑数据界面
      finalEditor: sessionStorage.getItem('save_username'),
      buttonBoolean: {
        addBtn: true,
        editBtn: true,
        deleteBtn: true,
        refreshBtn: true,
        import: false,
        export: false,
        acceptOrder: false
      },
      funcBtn: {
        isShow: true,
        width: 180,
        fixed: 'right',
        buttons: [
          {
            name: '查看详情',
            value: 'staffDetail'
          }
        ]
      }
    }
  },
  components: {
    TableTemplate,
    MultilevelLinkage,
    isQuit
  },
  methods: {
    // 增方法
    addRecord () {
      this.$refs.addForm.validate((valid) => {
        this.addForm.address = this.address1 + this.address2
        this.addForm.finalEditor = this.finalEditor
        this.addForm.typeName = this.typeName
        console.log(this.addForm)
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
      this.editForm.finalEditor = this.finalEditor
      this.$refs[this.tableName].updateData(this.editUrl, this.refreshUrl, this.editForm)
    },
    deleteRecord () {
      this.$refs[this.tableName].deleteData(this.deleteUrl, this.refreshUrl)
    },
    getTypeOption (url, optionName) {
      this.$api.getRequestApi.get(url)
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
    btnClick () {
      this.$refs[this.tableName].detailVisible = true
      this.$refs[this.tableName].editDialogVisible = true
    },
    areaLinkageChange (val) {
      this.address1 = val
    }
  },
  mounted () {
    this.$refs[this.tableName].refreshData(this.refreshUrl, 'tableData')
  }
}
</script>

<style lang="less" scoped>
  .dialog-style {
    position: fixed;
  }

  .half-label {
    /*float: left;*/
    width: 50%;
    min-width: 250px;
  }

  .detail-column {
    height: 20px;
  }
</style>
