<template>
  <div>
    <table-template
      ref="businessCategory"
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
      <div slot="button-area">
          <el-button @click.native="categoryManage" style="color:#13ce66;margin-top: 5px">
            <i class="el-icon-setting"></i>
            类别设置
          </el-button>
      </div>
      <!-- 新增窗口 -->
      <el-form slot="add" style="overflow: auto" label-width="100px" :model="addForm">
        <el-form-item label="名称: " prop="name">
          <el-input v-model="addForm.name" placeholder="填写具体业务，如:&nbsp;扫地除尘、油烟清洗等"></el-input>
        </el-form-item>
        <el-form-item label="所属类别:" prop="classification">
          <el-select placeholder="请选择" @click.native="getArticleType()" v-model="addForm.classification">
            <el-option
              v-for="item in businessCategory"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务效果图">
          <div class="avatar-uploader">
            <img-upload v-on:upload-pic="uploadPic" :options="options" img-height="120px" img-width="120px"></img-upload>
          </div>
        </el-form-item>
        <el-form-item label="简介" prop="introduction">
          <el-input v-model="addForm.introduction" placeholder="请在此栏写明定价、服务形式等内容!" type="textarea" :autosize="{ minRows: 5, maxRows: 15}"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form slot="edit" style="overflow: auto" label-width="100px" :model="editForm">
        <el-form-item label="名称: " prop="name">
          <el-input v-model="editForm.name" placeholder="填写具体业务，如:&nbsp;扫地除尘、油烟清洗等"></el-input>
        </el-form-item>
        <el-form-item label="所属类别:" prop="classification">
          <el-select placeholder="请选择" @click.native="getArticleType()" v-model="editForm.classification">
            <el-option
              v-for="item in businessCategory"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务效果图">
          <div class="avatar-uploader">
            <img-upload v-on:upload-pic="uploadPic" :options="options" img-height="120px" img-width="120px"></img-upload>
          </div>
        </el-form-item>
        <el-form-item label="简介" prop="introduction">
          <el-input v-model="editForm.introduction" placeholder="请在此栏写明定价、服务形式等内容!" type="textarea" :autosize="{ minRows: 5, maxRows: 15}"></el-input>
        </el-form-item>
      </el-form>
    </table-template>
    <el-dialog title="类别设置" :visible.sync="categoryManageVisible">
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="categoryForm.name"
        ref="saveTagInput"
        size="small"
        @blur="addArticleType"
        @keyup.enter.native="$event.target.blur"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加分类</el-button>
    </el-dialog>
  </div>
</template>

<script>
import TableTemplate from '@/components/TableTemplate'
import ImgUpload from '@/components/ImgUpload'

export default {
  name: 'menuManage',
  data () {
    return {
      imageFile: {
        name: '',
        type: '',
        file: ''
      },
      options: {
        fixedNumber: [1, 1]
      },
      inputVisible: false,
      categoryForm: {name: ''},
      dynamicTags: [],
      categoryManageVisible: false,
      refreshObj: {},
      refreshUrl: 'businessCategory/findAllBusinessCategory',
      addUrl: 'businessCategory/addBusinessCategory',
      editUrl: 'businessCategory/editBusinessCategory',
      deleteUrl: 'businessCategory/deleteBusinessCategory',
      tableName: 'businessCategory',
      tableTitle: '业务管理', // 表格标题
      tablePK: 'id', // 主键id值
      tableHeaderList: [ // 表头字段
        {value: 'name', label: '业务名称', width: '220'},
        {value: 'classification', label: '所属大类', width: '220'},
        {value: 'picPath', label: '业务效果图', width: '200'},
        {value: 'introduction', label: '业务简介', minWidth: '220'}
      ],
      addForm: {name: '', classification: '', picPath: '', introduction: ''}, // 新增数据界面
      editForm: {id: null, name: null, classification: null, picPath: null, introduction: null}, // 编辑数据界面
      finalEditor: sessionStorage.getItem('save_username'),
      typeName: 'staffNumCoding',
      buttonBoolean: {
        addBtn: true,
        editBtn: true,
        deleteBtn: true,
        refreshBtn: true,
        import: false,
        export: false,
        acceptOrder: false
      },
      businessCategory: []
    }
  },
  components: {
    TableTemplate,
    ImgUpload
  },
  methods: {
    async uploadPic (data) {
      this.imageFile = data
    },
    getArticleType () {
      this.$api.requestApi.get('/basicCoding/findBasicCodingWithType/businessCategory')
        .then(res => {
          console.log(res.data)
          this.businessCategory = res.data
          console.log(this.businessCategory)
          if (res.data.length === 0) {
            this.businessCategory.unshift({name: '无分类，请先添加分类！', number: 'Null'})
            console.log(this.businessCategory)
          }
        })
        .catch(err => {
          this.$message({
            message: '网络请求失败',
            type: 'error'
          })
          console.log(err.data)
        })
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      this.$api.requestApi.get('basicCoding/deleteBasicCoding/businessCategory/' + tag)
      console.log(tag)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    addArticleType () {
      if (this.categoryForm.name !== null && this.categoryForm.name !== '') {
        this.categoryForm.type = 'businessCategory'
        this.categoryForm.finalEditor = this.finalEditor
        this.$api.requestApi.post('basicCoding/addBasicCoding', this.categoryForm)
          .then(res => {
            this.dynamicTags.push(this.categoryForm.name)
            console.log(this.dynamicTags)
            this.categoryForm.name = ''
          })
          .catch(err => {
            console.log(err.data)
          })
      }
      this.inputVisible = false
    },
    categoryManage () {
      this.getType('/basicCoding/findBasicCodingWithType/businessCategory')
      this.categoryManageVisible = true
    },
    getType (url) {
      this.$api.requestApi.get(url)
        .then(res => {
          this.dynamicTags = []
          for (let i = 0; i < res.data.length; i++) {
            // console.log(res.data.data[i].name)
            this.dynamicTags.push(res.data[i].name)
          }
        })
        .catch()
    },
    // 增方法
    async addRecord () {
      this.$api.requestApi.postJson('/businessCategory/uploadPicture', this.imageFile)
        .then(res => {
          this.addForm.picPath = res.data
          this.$refs[this.tableName].createData(this.addUrl, this.refreshUrl, this.addForm)
        })
        .catch()
    },
    selectRowClick (row) {
      this.editForm = row
      // this.id = row.id
    },
    editRecord () {
      this.$api.requestApi.postJson('/businessCategory/uploadPicture', this.imageFile)
        .then(res => {
          this.editForm.picPath = res.data
          this.$refs[this.tableName].updateData(this.editUrl, this.refreshUrl, this.editForm)
        })
        .catch()
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
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

<style lang="less">

  .avatar-uploader {
    float: left;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    background: rgba(255, 255, 255, 0.5);
    border: 2px dashed #8c939d;
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

</style>
