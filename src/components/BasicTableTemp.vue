<template>
  <div>
    <!-- 表头标题 -->
    <template v-if="titleShow === true">
      <div v-bind:style="titleStyle" ref="tableTitle">
        {{tableTitle}}
      </div>
    </template>
    <!-- 表前工具栏 -->
    <template v-if="tableTools ===true">
      <div class="table-tools-area">
        <el-button-group>
          <el-popover placement="top-start" content="新增" trigger="hover">
            <el-button slot="reference" @click.native="openAddDialog"
            v-if="addButton">
              <i class="el-icon-wqs-Add"></i>
            </el-button>
          </el-popover>
          <el-popover placement="top-start" content="编辑" trigger="hover">
            <el-button slot="reference" @click.native="openEditDialog"
            v-if="editButton">
              <i class="el-icon-wqs-tianxie"></i>
            </el-button>
          </el-popover>
          <el-popover placement="top-start" content="删除" trigger="hover">
            <el-button slot="reference" @click.native="deleteRecord"
            v-if="deleteButton" :disabled="this.selectRecord.length === 0">
              <i class="el-icon-wqs-zichan-huishouzhan"></i>
            </el-button>
          </el-popover>
          <el-popover placement="top-start" content="刷新" trigger="hover">
            <el-button slot="reference" @click.native="refreshRecord"
            v-if="refreshButton">
              <i class="el-icon-wqs-shuaxin"></i>
            </el-button>
          </el-popover>
        </el-button-group>
      </div>
    </template>
    <!-- 表格内容 -->
    <el-col></el-col>
    <!-- 表后页码等 -->
    <el-col></el-col>
    <el-dialog></el-dialog>
    <el-dialog></el-dialog>
  </div>
</template>

<script>
export default {
  name: 'BasicTableTemp',
  props: {
    titleShow: {type: Boolean, default: true},
    tableTools: {type: Boolean, default: true},
    addButton: {type: Boolean, default: true},
    editButton: {type: Boolean, default: true},
    deleteButton: {type: Boolean, default: true},
    refreshButton: {type: Boolean, default: true},
    tableTitle: {type: String, default: '初始表头名'},
    titleColPosition: {type: String, default: 'relative'},
    titleColBackground: {type: String, default: '#FFFFFF'},
    titleColHeight: {type: String, default: '80px'},
    titleLineHeight: {type: String, default: '80px'},
    titleAlign: {type: String, default: 'center'},
    titleColor: {type: String, default: '#000000'},
    titleFontSize: {type: String, default: '28px'}
  },
  data () {
    return {
      titleStyle: {
        position: this.titleColPosition,
        background: this.titleColBackground,
        height: this.titleColHeight,
        'line-height': this.titleLineHeight,
        'text-align': this.titleAlign,
        color: this.titleColor,
        'font-size': this.titleFontSize
      },
      selectRecord: []
    }
  },
  methods: {
    openAddDialog () {},
    openEditDialog () {},
    addRecord () {},
    editRecord () {},
    deleteRecord () {},
    refreshRecord () {}
  }
}
</script>

<style lang="less" scoped>

  .table-tools-area {
    width: 100%;
    background-color: rgb(200, 221, 255)
  }
</style>
