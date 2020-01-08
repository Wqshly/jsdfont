<template>
  <div class="fill-contain">
    <el-row style="padding-bottom: 10px">
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
        :button-boolean="buttonBoolean"
        v-on:addRecord="addRecord"
        v-on:editRecord="editRecord"
        v-on:select-row="selectRowClick">
        <!-- 新增窗口 -->
        <el-form slot="add" style="overflow: auto" label-width="100px">
          <el-form-item label="编码" :model="addForm" prop="number">
            <el-input v-model="addForm.number"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :model="addForm" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="员工类别" prop="staffType">
            <el-select v-model="addForm.staffType" placeholder="请选择">
              <el-option
                v-for="item in staffTypeOption"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话" :model="addForm" prop="phone">
            <el-input v-model="addForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="身份证" :model="addForm" prop="identify">
            <el-input v-model="addForm.identify"></el-input>
          </el-form-item>
          <el-form-item label="性别" :model="addForm" prop="sex">
            <el-select v-model="addForm.sex" placeholder="请选择">
              <el-option
                v-for="item in genderOption"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮件" :model="addForm" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="学历" :model="addForm" prop="education">
            <el-input v-model="addForm.education"></el-input>
          </el-form-item>
          <el-form-item label="医保账号" :model="addForm" prop="medical_num">
            <el-input v-model="addForm.medicalNum"></el-input>
          </el-form-item>
          <el-form-item label="银行账号" :model="addForm" prop="bankCardNum">
            <el-input v-model="addForm.bankCardNum"></el-input>
          </el-form-item>
          <el-form-item label="状态" :model="addForm" prop="status">
            <el-input v-model="addForm.status"></el-input>
          </el-form-item>
          <el-form-item label="当前职位" :model="addForm" prop="currentPosition">
            <el-input v-model="addForm.currentPosition"></el-input>
          </el-form-item>
          <el-form-item label="地址" :model="addForm" prop="address">
            <el-input v-model="addForm.address"></el-input>
          </el-form-item>
          <el-form-item label="学科" :model="addForm" prop="discipline">
            <el-input v-model="addForm.discipline"></el-input>
          </el-form-item>
          <el-form-item label="毕业院校" :model="addForm" prop="graduateSchool">
            <el-input v-model="addForm.graduateSchool"></el-input>
          </el-form-item>
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
            <el-input v-model="editForm.graduateSchool"></el-input>
          </el-form-item>
        </el-form>
      </table-template>
    </el-row>
    <el-row>
      <el-tabs type="border-card">
        <el-tab-pane label="绩效考核">
          <is-quit></is-quit>
        </el-tab-pane>
        <el-tab-pane label="职务变动">
          <is-quit></is-quit>
        </el-tab-pane>
        <el-tab-pane label="请销假">
          <is-quit></is-quit>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import TableTemplate from '@/components/TableTemplate'
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
        {value: 'number', label: '编码', width: '120'},
        {value: 'name', label: '员工姓名', width: '120'},
        {value: 'sex', label: '性别', width: '80'},
        {value: 'phone', label: '电话', width: '120'},
        {value: 'identify', label: '身份证', width: '220'},
        {value: 'currentPosition', label: '当前职务', width: '160'},
        {value: 'address', label: '地址', width: '220'},
        {value: 'email', label: '邮件', width: '220'},
        {value: ' birth', label: '出生日期', width: '220'},
        {value: 'education', label: '学历', width: '120'},
        {value: 'graduateSchool', label: '毕业院校', width: '220'},
        {value: 'discipline', label: '专业', width: '120'},
        {value: 'medicalNum', label: '医保账号', width: '220'},
        {value: 'bankCardNum', label: '银行账号', width: '120'},
        {value: 'finalEditor', label: '修改人', width: '120'},
        {value: 'finalEditTime', label: '最后修改时间', width: '220'},
        {value: 'status', label: '状态', width: '120'}
      ],
      staffTypeOption: [], // 员工类型选择框
      genderOption: [], // 性别选项
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
      typeName: 'staffNumCoding',
      typeName2: 'genderCoding',
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
    TableTemplate,
    isQuit
  },
  methods: {
    // 增方法
    addRecord () {
      this.addForm.finalEditor = this.finalEditor
      this.addForm.typeName = this.typeName
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
    }
    // rightBtn (data) {
    //   if (data === 'viewDetail') {
    //     // this.
    //   }
    // }
  },
  mounted () {
    this.$refs[this.tableName].refreshData(this.refreshUrl, 'tableData')
    this.getTypeOption('basicCoding/findBasicCodingWithType' + '?type=' + this.typeName, 'staffTypeOption')
    this.getTypeOption('basicCoding/findBasicCodingWithType' + '?type=' + this.typeName2, 'genderOption')
  }
}
</script>

<style scoped>
</style>
