<template>
  <div class="fill-contain" style="border-radius: 5px">
    <!--工具栏-->
    <el-col :span="24">
      <div>
        <!-- 表头 -->
        <div ref="tableTitle" class="table-title">
          {{tableTitle}}
        </div>
        <!-- 表按钮区 -->
        <div class="table-button-area">
          <el-button-group>
            <el-popover placement="top-start" trigger="hover">
              <div class="button-tips">新增</div>
              <el-button slot="reference" @click="handleAdd" class="button" style="color:#13ce66"
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
              <div class="button-tips">刷新</div>
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
            <!-- 扩展区域 -->
            <span style="float: right;padding-right: 30px;height: inherit;">
                     <slot name="button-Area"></slot>
               </span>
          </el-button-group>
        </div>
        <!-- 表格主体 -->
        <el-table :data="currentPageData"
                  highlight-current-row @current-change="rowClick" v-loading="tableLoading"
                  @selection-change="selectChange" ref="TableTemplate" :height="tableHeight" stripe>
          <!-- 选择框 -->
          <el-table-column type="selection" width="55"></el-table-column>
          <!-- 序号 -->
          <el-table-column type="index" width="60"></el-table-column>
          <!-- 正式内容 -->
          <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据。 -->
          <!-- 使用sortable="custom" 即可通过后端排序 -->
          <el-table-column v-for="tableHeader in tableHeaderList" :key="tableHeader.value" :prop="tableHeader.value"
                           :label="tableHeader.label" :width="tableHeader.width" sortable="custom">
            <template slot-scope="scope">
              <!-- 通过tableHeader.value获取表数据 -->
              <el-popover trigger="hover" placement="top">
                <template v-if="tableHeader.value !== 'finalEditTime'">
                  <p>{{ scope.row[tableHeader.value] }}</p>
                  <div slot="reference" class="name-wrapper">
                    {{ scope.row[tableHeader.value] }}
                  </div>
                </template>
                <template v-else>
                  <p>{{ scope.row[tableHeader.value] | formatDate }}</p>
                  <div slot="reference" class="name-wrapper">
                    {{ scope.row[tableHeader.value] | formatDate }}
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
          :page-sizes="[5, 10, 20, 30, 40]"
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
        <div v-if="detailVisible === false" slot="footer">
          <div style="float:left;">
            <el-button type="primary" @click="lastRecord">上一条</el-button>
            <el-button type="primary" @click="nextRecord">下一条</el-button>
          </div>
          <!-- 作为模板时，不加.native将不会生效 -->
          <el-button type="primary" @click.native="editSave">保存</el-button>
          <el-button type="primary" @click.native="editSaveClose">保存并关闭</el-button>
          <el-button @click.native="editDialogVisible = false">取消</el-button>
        </div>
        <div v-else slot="footer">
          <el-button type="primary" @click.native="letsEdit">编辑</el-button>
          <el-button @click.native="closeDetailForm">关闭</el-button>
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
    tableHeight: {type: Number, default: 500},
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
      tableData: [],
      currentPageData: [],
      tableLoading: false, // 表格显示loading
      addDialogVisible: false,
      editDialogVisible: false,
      detailVisible: false,
      currentPageNumber: 1, // 当前页
      selectRow: null, // 当前选中的行
      selects: [], // 列表中选中的多行数据
      btnDeleteStyle: {
        backgroundColor: '',
        color: ''
      },
      recordTotal: 0, // 数据的总数
      pageSize: 5 // 每页显示的条数
    }
  },
  methods: {
    dataRefresh: function () {
      this.refreshData(null)
    },
    handleSizeChange (val) {
      this.pageSize = val
      console.log(`每页 ${val} 条`)
      this.refreshData(null)
    },
    handleCurrentChange (val) {
      this.currentPageNumber = val
      console.log(`当前页: ${val}`)
      this.refreshData(null)
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
    // 表增加数据
    createData (url, refreshUrl, param) {
      this.$api.postRequestApi.post(url, param)
        .then(res => {
          console.log(res.data)
          this.refreshData(null)
        })
        .catch(err => {
          console.log(err.data)
        })
    },
    // 表更新数据
    updateData (url, refreshUrl, param) {
      this.$api.postRequestApi.post(url, param)
        .then(res => {
          console.log(res.data)
          this.refreshData(refreshUrl)
        })
        .catch(err => {
          console.log(err.data)
        })
    },
    // 表刷新数据
    refreshData (url) {
      if (url === null) {
        url = this.lastUrl
      }
      this.tableLoading = true
      this.$api.getRequestApi.get(url)
        .then(res => {
          this.tableLoading = false
          console.log(res.data)
          this.tableData = res.data.data
          this.currentPageData = this.tableData.slice((this.currentPageNumber - 1) * this.pageSize, this.currentPageNumber * this.pageSize)
          this.recordTotal = res.data.data.length
          this.lastUrl = url
          console.log(res.data.recordTotal)
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
      this.selectRow = null
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
            console.log(res.data)
            this.refreshData(null)
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
  created () {
    this.currentPageData = this.tableData.slice((this.currentPageNumber - 1) * this.pageSize, this.currentPageNumber * this.pageSize)
  }
}
</script>

<style scoped lang="less">
  .table-title {
    background-color: #335ae0;
    height: 37px;
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
    background: #fff;
    height: 40px;
  }

  .table_icon {
    margin: 5px;
  }

  .pagination-style {
    float: right;
  }
</style>
