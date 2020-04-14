<template>
  <div class="fill-contain">
    <el-col :span="detail ? spanNum : 24" style="padding-bottom: 10px">
      <table-template
        ref="staffTable"
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
        v-on:btn-click="btnClick"
        v-on:refresh-btn="refreshBtn">
        <!-- 新增窗口 -->
        <el-button slot="button-Area" @click.native="collapseRight" class="btnCollapse">{{detail ? buttonHiddenText :
          buttonShowText}}
        </el-button>
        <el-form slot="add" :model="addForm" style="overflow: auto" label-width="100px" ref="addForm"
                 :rules="addFormRule">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="addForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="身份证" :model="addForm" prop="identify">
                <el-input v-model="addForm.identify"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="编码">
                <el-radio v-model="addForm.radio" label="1">自动生成</el-radio>
                <el-radio v-model="addForm.radio" label="2">手动编辑</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item v-if="addForm.radio === '2'" prop="number">
                <el-input v-model="addForm.number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="电话号码" :model="addForm" prop="phone">
                <el-input v-model="addForm.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="医保账号" :model="addForm" prop="medical_num">
                <el-input v-model="addForm.medicalNum"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="员工状态" prop="status">
                <el-select v-model="addForm.status" placeholder="请选择"
                           @click.native="getTypeOption('basicCoding/findBasicCodingWithType/staffStatus', 'staffStatusOption')">
                  <el-option
                    v-for="item in staffStatusOption"
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
                           @click.native="getTypeOption('basicCoding/findBasicCodingWithType/genderCoding', 'genderOption')">
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
              <el-form-item label="所在部门" prop="currentPosition">
                <el-select v-model="addForm.currentPosition" placeholder="请选择"
                           @click.native="getTypeOption('basicCoding/findAllPost', 'currentPostOption')">
                  <el-option
                    v-for="item in currentPostOption"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出生年月日" prop="birth">
                <el-input v-model="addForm.birth"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="员工父亲生日" prop="fatherBirth">
                <el-input v-model="addForm.fatherBirth"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="员工母亲生日" prop="motherBirth">
                <el-input v-model="addForm.motherBirth"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="银行账号" :model="addForm" prop="bankCardNum">
            <el-input v-model="addForm.bankCardNum"></el-input>
          </el-form-item>
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
              <el-form-item label="受教育程度" :model="addForm" prop="education">
                <el-select v-model="addForm.education" placeholder="请选择"
                           @click.native="getTypeOption('basicCoding/findBasicCodingWithType/educationCoding', 'educationOption')">
                  <el-option
                    v-for="item in educationOption"
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
              <el-form-item label="毕业院校" prop="graduateSchool">
                <el-input v-model="addForm.graduateSchool"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所学专业" prop="discipline">
                <el-input v-model="addForm.discipline"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 编辑窗口 -->
        <el-form slot="edit" style="overflow: auto" label-width="100px" :model="editForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="员工编号" prop="number">
                <el-input v-model="editForm.number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="editForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="性别" prop="sex">
                <el-select v-model="editForm.sex" placeholder="请选择"
                           @click.native="getTypeOption('basicCoding/findBasicCodingWithType/genderCoding', 'genderOption')">
                  <el-option
                    v-for="item in genderOption"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码" prop="phone">
                <el-input v-model="editForm.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="身份证" prop="identify">
                <el-input v-model="editForm.identify"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在部门" prop="currentPosition">
                <el-select v-model="editForm.currentPosition" placeholder="请选择"
                           @click.native="getTypeOption('basicCoding/findAllPost', 'currentPostOption')">
                  <el-option
                    v-for="item in currentPostOption"
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
              <el-form-item label="员工状态" prop="status">
                <el-select v-model="editForm.status" placeholder="请选择"
                           @click.native="getTypeOption('basicCoding/findBasicCodingWithType/staffStatus', 'staffStatusOption')">
                  <el-option
                    v-for="item in staffStatusOption"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮件" prop="email">
                <el-input v-model="editForm.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="员工父亲生日" prop="fatherBirth">
                <el-input v-model="editForm.fatherBirth"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="员工母亲生日" prop="motherBirth">
                <el-input v-model="editForm.motherBirth"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="出生年月日" prop="birth">
                <el-input v-model="editForm.birth"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="受教育程度" :model="editForm" prop="education">
                <el-input v-model="editForm.education"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="毕业院校" prop="graduateSchool">
                <el-input v-model="editForm.graduateSchool"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所学专业" prop="discipline">
                <el-input v-model="editForm.discipline"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="医保账号" prop="medical_num">
                <el-input v-model="editForm.medicalNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="银行账号" prop="bankCardNum">
                <el-input v-model="editForm.bankCardNum"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="住址" prop="address">
                <el-input v-model="editForm.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 详情窗口 -->
        <el-form slot="detail" style="overflow: auto;" label-width="100px" :model="editForm">
          <el-row>
            <el-col :span="12">
              <el-form-item class="half-label" label="编码: " prop="number">
                {{editForm.number !== null ? editForm.number : "未填写"}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="half-label" label="姓名: " prop="name">
                {{editForm.name !== null ? editForm.name : "未填写"}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item class="half-label" label="性别: " prop="sex">
                {{editForm.sex !== null ? editForm.sex : "未填写"}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="half-label" label="电话: " prop="phone">
                {{editForm.phone !== null ? editForm.phone : "未填写"}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item class="half-label" label="身份证: " prop="identify">
                {{editForm.identify !== null ? editForm.identify : "未填写"}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="half-label" label="所在部门: " prop="currentPosition">
                {{editForm.currentPosition !== null ? editForm.currentPosition : "未填写"}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item class="half-label" label="地址: " prop="address">
            {{editForm.address !== null ? editForm.address : "未填写"}}
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item class="half-label" label="邮件: " prop="email">
                {{editForm.email !== null ? editForm.email : "未填写"}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="half-label" label="出生年月日: " prop="birth">
                {{editForm.birth !== null ? editForm.birth : editForm.birth = "未填写" }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item class="half-label" label="父亲生日: " prop="fatherBirth">
                {{editForm.fatherBirth !== null ? editForm.fatherBirth : editForm.fatherBirth = "未填写"}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="half-label" label="母亲生日: " prop="motherBirth">
                {{editForm.motherBirth !== null ? editForm.motherBirth : editForm.motherBirth = "未填写"}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item class="half-label" label="受教育程度: " prop="education">
                {{editForm.education !== null ? editForm.education : "未填写"}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="half-label" label="毕业院校: " prop="graduateSchool">
                {{editForm.graduateSchool !== null ? editForm.graduateSchool : "未填写"}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item class="half-label" label="专业: " prop="discipline">
                {{editForm.discipline !== null ? editForm.discipline : "未填写"}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="half-label" label="医保账号: " prop="medicalNum">
                {{editForm.medicalNum !== null ? editForm.medicalNum : "未填写"}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item class="half-label" label="银行账号: " prop="bankCardNum">
                {{editForm.bankCardNum !== null ? editForm.bankCardNum : "未填写"}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="half-label" label="状态: " prop="status">
                {{editForm.status !== null ? editForm.status : "未填写"}}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </table-template>
    </el-col>
    <el-col :span="detail ? 15 : 0">
      <el-tabs tab-position="left" style="background: #FFFFFF;margin-left: 5px;border-radius: 5px"
               @tab-click="tabClick">
        <el-tab-pane label="入离职管理">
          <is-quit ref="isQuit"></is-quit>
        </el-tab-pane>
        <el-tab-pane label="当前职务">
          <current-job ref="currentJob"></current-job>
        </el-tab-pane>
        <el-tab-pane label="岗位变动">
          <post-change ref="postChange"></post-change>
        </el-tab-pane>
        <el-tab-pane label="职务调整">
          <job-change ref="jobChange"></job-change>
        </el-tab-pane>
        <el-tab-pane label="奖惩记录">
          <rewards-punishment-record ref="rewardsPunishmentRecord"></rewards-punishment-record>
        </el-tab-pane>
        <el-tab-pane label="考勤记录">
          <attendance-record ref="attendanceRecord"></attendance-record>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </div>
</template>

<script>
import TableTemplate from '@/components/TableTemplate'
import MultilevelLinkage from '@/components/MultilevelLinkage'

import currentJob from '@/views/company/staffManage/currentJob'
import postChange from '@/views/company/staffManage/postChange'
import jobChange from '@/views/company/staffManage/jobChange'
import rewardsPunishmentRecord from '@/views/company/staffManage/rewardsPunishmentRecord'
import attendanceRecord from '@/views/company/staffManage/attendanceRecord'
import isQuit from '@/views/company/staffManage/isQuit'

export default {
  name: 'staff',
  data () {
    const idCardValidity = (rule, code, callback) => {
      const city = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江 ',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北 ',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏 ',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外 '
      }
      let tip = ''
      let pass = true

      if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        tip = '身份证号格式错误'
        pass = false
      } else if (!city[code.substr(0, 2)]) {
        tip = '地址编码错误'
        pass = false
      }
      if (!pass) {
        callback(new Error(tip))
      } else {
        callback()
      }
    }
    return {
      buttonHiddenText: '折叠管理栏',
      buttonShowText: '展开管理栏',
      detail: false,
      spanNum: 9,
      refreshUrl: 'staff/findAllStaff',
      addUrl: 'staff/addStaff',
      editUrl: 'staff/editStaff',
      deleteUrl: 'staff/deleteStaff',
      refreshObj: {},
      staffTypeUrl: 'basicCoding/getStaffType',
      tableName: 'staffTable',
      tableTitle: '员工管理', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'number', label: '员工编号', width: '120'},
        {value: 'name', label: '员工姓名', width: '120'},
        {value: 'phone', label: '电话', width: '120'},
        {value: 'currentPosition', label: '所在部门', width: '160'},
        {value: 'status', label: '状态', width: '120'},
        {value: 'fatherBirth', label: '父亲生日', width: '180'},
        {value: 'motherBirth', label: '母亲生日', width: '180'},
        {value: 'finalEditor', label: '最后修改人', width: '120'},
        {value: 'finalEditTime', label: '最后修改时间', minWidth: '220'}
      ],
      staffTypeOption: [], // 员工类型选择框
      genderOption: [], // 性别选项
      currentPostOption: [], // 岗位选项
      staffStatusOption: [], // 员工状态选项
      educationOption: [],
      address1: '',
      address2: '',
      addForm: {
        radio: '',
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
        fatherBirth: '',
        motherBirth: '',
        address: '',
        currentPosition: ''
      }, // 新增数据界面
      addFormRule: {
        name: [
          {required: true, message: '请输入员工姓名', trigger: 'blur'},
          {min: 2, max: 11, message: '请输入正确的姓名', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入电话号码', trigger: 'blur'},
          {min: 11, max: 11, message: '输入正确的电话号码', trigger: 'blur'},
          {pattern: /^1[34578]\d{9}$/, message: '输入正确的电话号码', trigger: 'blur'}
        ],
        identify: [
          {required: true, message: '请输入身份证号', trigger: 'blur'},
          {
            pattern: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
            message: '请输入正确的证件号'
          },
          {validator: idCardValidity, trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请勾选正确的选项', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请勾选正确的选项', trigger: 'blur'}
        ],
        currentPosition: [
          {required: true, message: '请勾选正确的选项', trigger: 'blur'}
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
        fatherBirth: '',
        motherBirth: '',
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
      },
      initTab: '入离职管理',
      staffSelectId: null,
      firstClickIsQuit: false,
      firstClickCurrentJob: false
    }
  },
  components: {
    TableTemplate,
    MultilevelLinkage,
    isQuit,
    currentJob,
    postChange,
    jobChange,
    rewardsPunishmentRecord,
    attendanceRecord
  },
  methods: {
    refreshBtn () {
      this.staffSelectId = null
      this.$refs['isQuit'].clearTable()
    },
    tabClick (data) {
      if (data.label === '入离职管理' && this.firstClickIsQuit) {
        this.firstClickIsQuit = false
        this.$refs['isQuit'].refreshData(this.staffSelectId)
      }
      this.initTab = data.label
    },
    selectRowClick (row) {
      this.editForm = row
      if (this.spanNum === 9) {
        this.staffSelectId = row.id
        console.log(this.staffSelectId)
        this.firstClickIsQuit = true
        if (this.initTab === '入离职管理') {
          this.$refs['isQuit'].refreshData(this.staffSelectId)
          this.firstClickIsQuit = false
        }
      }
    },
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
    collapseRight () {
      this.detail = !this.detail
    },
    editRecord () {
      this.editForm.finalEditor = this.finalEditor
      this.$refs[this.tableName].updateData(this.editUrl, this.refreshUrl, this.editForm)
    },
    deleteRecord () {
      this.$refs[this.tableName].deleteData(this.deleteUrl, this.refreshUrl)
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
    btnClick () {
      this.$refs[this.tableName].detailVisible = true
      this.$refs[this.tableName].editDialogVisible = true
    },
    areaLinkageChange (val) {
      this.address1 = val
    }
  },
  mounted () {
    this.$refs[this.tableName].refreshData(this.refreshUrl, this.refreshObj)
  }
}
</script>

<style lang="less">
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

  .btnCollapse {
    float: right;
    margin-top: 5px;
  }

  .el-tabs--border-card > .el-tabs__content {
    padding: 0;
  }
</style>
