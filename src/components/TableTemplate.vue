<template>
  <div class="fill-contain" style="border-radius: 5px">
    <!--工具栏-->
    <el-col>
      <div>
        <!-- 表头 -->
        <div v-if="tableType === true" ref="tableTitle" class="table-title">
          {{tableTitle}}
        </div>
        <!-- 表按钮区 -->
        <div class="table-button-area">
          <el-button-group style="display: block">
            <el-popover placement="top-start" trigger="hover">
              <div class="button-tips">新增</div>
              <el-button slot="reference" @click.native="handleAdd" class="button" style="color:#13ce66"
                         v-if="this.buttonBoolean.addBtn">
                <span class="el-icon-wqs-Add table_icon"></span>
              </el-button>
            </el-popover>
            <el-popover placement="top-start" trigger="hover">
              <div class="button-tips">删除</div>
              <el-button slot="reference" :disabled="this.selects.length === 0" @click="deleteData" class="button"
                         v-if="this.buttonBoolean.deleteBtn" style="color: #f7c900;">
                <span class="el-icon-wqs-zichan-huishouzhan table_icon"></span>
              </el-button>
            </el-popover>
            <el-popover placement="top-start" trigger="hover">
              <div class="button-tips">编辑</div>
              <el-button slot="reference" @click="handleEdit" class="button" style="color: #f7c900;"
                         v-if="this.buttonBoolean.editBtn">
                <span class="el-icon-wqs-tianxie table_icon"></span>
              </el-button>
            </el-popover>
            <el-popover placement="top" trigger="hover">
              <div class="button-tips">刷新表单数据</div>
              <el-button ref="refreshButton" slot="reference" content="刷新" @click="dataRefresh"
                         v-if="this.buttonBoolean.refreshBtn" class="button" style="color:#13ce66">
                <span class="el-icon-wqs-shuaxin table_icon"></span>
              </el-button>
            </el-popover>
            <el-popover placement="top" trigger="hover">
              <div class="button-tips">下载数据</div>
              <el-button slot="reference" content="下载数据" @click="dataRefresh"
                         v-if="this.buttonBoolean.export" class="button" style="color:#13ce66">
                <span class="el-icon-wqs-xiazai table_icon"></span>
              </el-button>
            </el-popover>
            <el-popover placement="top" trigger="hover">
              <div class="button-tips">上传数据</div>
              <el-button slot="reference" content="上传数据" @click="dataRefresh"
                         v-if="this.buttonBoolean.import" class="button" style="color:#13ce66">
                <span class="el-icon-wqs-shangchuan table_icon"></span>
              </el-button>
            </el-popover>
            <el-popover placement="top" trigger="hover">
              <div class="button-tips">接受订单</div>
              <el-button slot="reference" content="接受订单" @click="dataRefresh"
                         v-if="this.buttonBoolean.acceptOrder" class="button" style="color:#13ce66">
                <span class="el-icon-wqs-OA-yiwancheng table_icon"></span>
              </el-button>
            </el-popover>
            <!-- 扩展区域1(左侧) -->
            <span style="float: left;padding-left: 5px;padding-right: 5px;height: inherit;">
              <slot name="btn-area"></slot>
            </span>
            <!-- 扩展区域2(右侧) -->
            <span style="float: right;padding-right: 5px;height: inherit;">
              <slot name="button-area"></slot>
            </span>
          </el-button-group>
        </div>
        <!-- 表格主体 -->
        <el-table :data="tableData"
                  highlight-current-row @row-click="rowClick" v-loading="tableLoading"
                  @selection-change="selectChange" ref="TableTemplate" :height="tableHeight" stripe>
          <!-- 选择框 -->
          <el-table-column type="selection" width="55"></el-table-column>
          <!-- 序号 -->
          <el-table-column type="index" width="60"></el-table-column>
          <!-- 正式内容 -->
          <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据。 -->
          <!-- 使用sortable="custom" 即可通过后端排序 -->
          <el-table-column v-for="tableHeader in tableHeaderList" :key="tableHeader.value" :prop="tableHeader.value"
                           header-align="center" align="center"
                           :label="tableHeader.label" :min-width="tableHeader.minWidth" :width="tableHeader.width"
                           sortable="custom">
            <template slot-scope="scope">
              <!-- 通过tableHeader.value获取表数据 -->
              <el-popover trigger="hover" placement="top">
                <template v-if="tableHeader.value === 'finalEditTime'">
                  <p>{{ scope.row[tableHeader.value] | formatDate }}</p>
                  <div slot="reference" class="name-wrapper">
                    {{ scope.row[tableHeader.value] | formatDate }}
                  </div>
                </template>
                <template
                  v-if="tableHeader.value === 'signingTime' || tableHeader.value === 'entryIntoForceTime' || tableHeader.value === 'deadline' || tableHeader.value === 'startTime' || tableHeader.value === 'endTime'">
                  <p>{{ scope.row[tableHeader.value] | formatDate2 }}</p>
                  <div slot="reference" class="name-wrapper">
                    {{ scope.row[tableHeader.value] | formatDate2}}
                  </div>
                </template>
                <template
                  v-if="tableHeader.value !== 'finalEditTime' && tableHeader.value !== 'signingTime' && tableHeader.value !== 'entryIntoForceTime' && tableHeader.value !== 'deadline' && tableHeader.value !== 'startTime' && tableHeader.value !== 'endTime'">
                  <p>{{ scope.row[tableHeader.value]}}</p>
                  <div slot="reference" class="name-wrapper">
                    {{ scope.row[tableHeader.value] }}
                  </div>
                </template>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作" :width="funcBtn.width" v-if="funcBtn.isShow" :fixed="funcBtn.fixed">
            <template slot-scope="scope">
              <!-- 通过tableHeader.value获取按钮名 -->
              <el-button type="text" v-for="(item, index) in funcBtn.buttons" :key="index"
                         @click="btnClick(item.value)">
                {{item.name}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--表格底部状态栏-->
      <div class="table-footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPageNumber"
          :page-sizes="[5, 10, 15, 20, 50]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next, jumper"
          :total="recordTotal"
          class="pagination-style"></el-pagination>
      </div>
      <!-- 新增窗口 -->
      <el-dialog ref="addFormWindows" title="新增" :visible.sync="addDialogVisible" :close-on-click-modal="false"
                 class="dialog-style">
        <slot name="add"></slot>
        <div slot="footer">
          <!-- 作为模板时，不加.native将不会生效 -->
          <el-button type="primary" @click.native="addSave">保存</el-button>
          <el-button type="primary" @click.native="addSaveClose">保存并关闭</el-button>
          <el-button @click.native="addDialogVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <!-- 编辑窗口 -->
      <el-dialog ref="editFormWindows" title="编辑" :visible.sync="editDialogVisible" :close-on-click-modal="false"
                 class="dialog-style">
        <slot v-if="detailVisible === false" name="edit"></slot>
        <slot v-else name="detail"></slot>
        <div slot="footer">
          <div style="float:left;">
            <el-button type="primary" @click="lastRecord">上一条</el-button>
            <el-button type="primary" @click="nextRecord">下一条</el-button>
          </div>
          <!-- 作为模板时，不加.native将不会生效 -->
          <div v-if="detailVisible === false">
            <el-button type="primary" @click.native="editSave">保存</el-button>
            <el-button type="primary" @click.native="editSaveClose">保存并关闭</el-button>
            <el-button @click.native="editDialogVisible = false">取消</el-button>
          </div>
          <div v-else>
            <el-button type="primary" @click.native="letsEdit">编辑</el-button>
            <el-button @click.native="closeDetailForm">关闭</el-button>
          </div>
        </div>
      </el-dialog>
    </el-col>
  </div>
</template>

<script>
import {formatDate} from '@/commons/date'

export default {
  filters: {
    formatDate (time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy年MM月dd日 hh时mm分')
    },
    formatDate2 (time) {
      if (time !== null) {
        const date = new Date(time)
        return formatDate(date, 'yyyy年MM月dd日')
      }
    }
  },
  name: 'TableTemplate',
  props: {
    refreshUrl: {required: true},
    addUrl: {required: true},
    editUrl: {required: true},
    deleteUrl: {required: true},
    tableName: String,
    tableTitle: String, // 表格标题
    tableHeaderList: {required: true, type: Array}, // 表头数据
    // tableHeight: {type: Number, default: (`${document.documentElement.clientHeight}` - 250)},
    // tableData: {required: true, type: Array} // 表格数据
    tablePK: {default: 'id'},
    buttonBoolean: {
      addBtn: false,
      editBtn: false,
      viewDetail: false,
      deleteBtn: false,
      refreshBtn: false,
      import: false,
      export: false,
      acceptOrder: false
    }, // 按钮功能
    funcBtn: {
      default: function () {
        return {
          isShow: false,
          fixed: 'right',
          width: 200,
          buttons: []
        }
      }
    }
    // pageSize: {type: Number, default: 20} // 每页显示的条数
  },
  data () {
    return {
      refreshObj: {},
      tableData: [],
      currentPageData: [],
      tableLoading: false, // 表格显示loading
      addDialogVisible: false,
      editDialogVisible: false,
      detailVisible: false,
      tableHeight: (`${document.documentElement.clientHeight}` - 289),
      currentPageNumber: 1, // 当前页
      selectRow: null, // 当前选中的行
      selects: [], // 列表中选中的多行数据
      btnDeleteStyle: {
        backgroundColor: '',
        color: ''
      },
      recordTotal: 0, // 数据的总数
      pageSize: 10, // 每页显示的条数
      tableType: true,
      sortMethod: null, // 排序方法（升序降序、不排序）
      sortField: null// 排序的字段
    }
  },
  methods: {
    dataRefresh: function () {
      this.refreshData(null, null)
    },
    handleSizeChange (val) {
      this.pageSize = val
      console.log(`每页 ${val} 条`)
      this.refreshData(null, null)
    },
    handleCurrentChange (val) {
      this.currentPageNumber = val
      console.log(`当前页: ${val}`)
      this.refreshData(null, null)
    },
    // 打开新增界面
    handleAdd: function () {
      this.addDialogVisible = true
    },
    // 保存不关闭
    addSave: function () {
      this.$emit('addRecord')
    },
    // 保存并关闭
    addSaveClose: function () {
      this.$emit('addRecord')
      this.addDialogVisible = false
    },
    // 打开编辑界面
    handleEdit: function () {
      if (this.selectRow !== null) {
        this.editDialogVisible = true
      } else {
        this.$message({
          type: 'warning',
          message: '请选择一条记录',
          duration: '2000'
        })
      }
      this.detailVisible = false
    },
    // 编辑中的选择上一条
    lastRecord () {
      let lastRow = null
      if (this.tableData.indexOf(this.selectRow) - 1 === -1) {
        lastRow = this.tableData.length - 1
      } else {
        lastRow = this.tableData.indexOf(this.selectRow) - 1
      }
      // this.$emit('select-row',Object.assign({}, this.tableData[lastRow]))
      // this.editForm= Object.assign({}, this.tableData[lastRow]);
      this.selectRow = this.tableData[lastRow]
      this.$emit('select-row', Object.assign({}, this.tableData[lastRow]))
    },
    // 编辑中的选择下一条
    nextRecord () {
      let nextRow = null
      if (this.tableData.indexOf(this.selectRow) + 1 === this.tableData.length) {
        nextRow = 0
      } else {
        nextRow = this.tableData.indexOf(this.selectRow) + 1
      }
      this.$emit('select-row', Object.assign({}, this.tableData[nextRow]))
      // this.editForm= Object.assign({}, this.tableData[nextRow]);
      this.selectRow = this.tableData[nextRow]
    },
    // 编辑的保存
    editSave: function () {
      this.$emit('editRecord')
    },
    // 编辑的保存并关闭
    editSaveClose: function () {
      this.$emit('editRecord')
      this.editDialogVisible = false
    },
    // 详情页面时启动编辑
    letsEdit: function () {
      this.detailVisible = false
    },
    // 关闭详情页面
    closeDetailForm: function () {
      this.editDialogVisible = false
    },
    // 点击选中行
    rowClick: function (row, event, column) {
      this.$emit('select-row', Object.assign({}, row))
      this.selectRow = row
    },
    // 多选框
    selectChange: function (selects) {
      this.selects = selects
    },
    // 下拉框数据获取
    getDropDownBoxInfo (url, tableName) {
      this.$api.requestApi.get(url)
        .then(res => {
          this[tableName] = res.data
          console.log(this[tableName])
          if (this[tableName].length === 0) {
            this[tableName] = [{
              name: '根目录',
              number: 'Null'
            }]
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
    // 表增加数据
    createData (url, refreshUrl, param) {
      this.$api.postRequestApi.post(url, param)
        .then(res => {
          this.refreshData(null, null)
        })
        .catch(err => {
          console.log(err.data)
        })
    },
    // 表更新数据
    updateData (url, refreshUrl, param) {
      this.$api.postRequestApi.post(url, param)
        .then(res => {
          this.refreshData(refreshUrl, this.refreshObj)
        })
        .catch(err => {
          console.log(err.data)
        })
    },
    // 表刷新数据
    refreshData (url, obj) {
      this.selectRow = null
      if (url === null && obj === null) {
        url = this.lastUrl
        obj = this.lastObject
      }
      obj.page = {}
      obj.page.num = this.currentPageNumber
      obj.page.size = this.pageSize
      obj.sort = {}
      obj.sort.field = this.sortField
      obj.sort.method = this.sortMethod
      let objJson = JSON.stringify(obj)
      this.tableLoading = true
      this.$api.requestApi.postJson(url, objJson)
        .then(res => {
          this.tableLoading = false
          this.tableData = res.data
          this.recordTotal = res.total // 总条数
          this.$emit('refresh-btn')
          this.lastUrl = url
          this.lastObject = JSON.parse(objJson)
          this.$emit('otherRefresh')
        })
        .catch(err => {
          this.$message({
            message: '网络请求失败',
            type: 'error'
          })
          this.tableLoading = false
          console.log(err.data)
        })
    },
    // 批量删除
    deleteData: function () {
      const selectsMultipleId = this.selects.map(item => item[this.tablePK])
      this.$confirm('确认删除 "选中的 ' + selectsMultipleId.length + ' 条" 记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        // const _this = this
        this.tableLoading = true
        console.log(selectsMultipleId)
        this.$api.postRequestApi.post(this.deleteUrl, selectsMultipleId)
          // _this.$axios.post(_this.url, selectsMultipleId)
          .then(res => {
            this.tableLoading = false
            this.refreshData(null, null)
          })
          .catch(err => {
            console.log(err.data)
            this.$message({
              message: '网络请求失败',
              type: 'error'
            })
          })
      }).catch(() => {
      })
    },
    btnClick: function (value) {
      this.$emit('btn-click', value)
    }
  },
  mounted () {
    window.onresize = () => {
      this.tableHeight = `${document.documentElement.clientHeight}` - 250
    }
  },
  created () {
    // this.currentPageData = this.tableData.slice((this.currentPageNumber - 1) * this.pageSize, this.currentPageNumber * this.pageSize)
  }
}
</script>

<style scoped lang="less">

  .el-table {
    background: rgba(255, 255, 255, 0.6);
  }

  .table-title {
    background: rgba(109, 90, 255, 0.55);
    height: 47px;
    color: #FFF;
    line-height: 37px;
    text-align: center;
    position: relative;
    font-size: 20px;
  }

  .table-button-area {
    width: 100%;
    background-color: rgb(200, 221, 255)
  }

  .dialog-style {
    position: fixed;
  }

  /*指向表格的单元格时提示的文字*/
  .el-popover {
    padding: 0;
    min-width: 0;
    max-width: 400px;
    position: absolute;
    background: #fff;
    border-radius: 2px;
    border: 1px solid #d1dbe5;
    z-index: 2000;
    font-size: 12px;
  }

  .button {
    color: #fff;
    background: inherit;
    border: none inherit;
  }

  .button:hover {
    background-color: #49c7ff;
  }

  .button:active {
    background-color: #49c7ff;
  }

  .button:focus {
    background-color: #49c7ff;
  }

  .button-tips {
    margin: 5px;
  }

  .table-footer {
    background: rgba(255, 255, 255, 0.7);
    height: 40px;
  }

  .table_icon {
    margin: 5px;
  }

  .pagination-style {
    float: right;
  }
</style>
