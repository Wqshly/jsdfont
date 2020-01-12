<template>
  <div id="app" style="height: inherit">
    <el-row :gutter="2" style="height: inherit;margin: 0px">
      <el-col :span="4" class="tree-frame">
        <div class="grid-content">
          <div class="tree-title"><!--表头-->
            {{treeTitle}}
          </div>
          <el-input
            size="small"
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
          <!-- accordion,手风琴节点 -->
          <el-tree
            class="filter-tree"
            :filter-node-method="filterNode"
            ref="baseTree"
            highlight-current
            :data="baseData"
            :props="defaultProps"
            node-key="id"
            accordion
            :default-expand-all="false"
            :current-node-key="currentNodeKey"
            :default-expanded-keys="defaultExpandedKeys"
            :expand-on-click-node="true"
            @check-change="handleCheckChange"
            @node-click="handleNodeClick">
          </el-tree>
        </div>
      </el-col>
      <el-col :span="20" style="height: inherit">
        <div class="grid-content bg-purple-light" style="height: inherit">
          <componet v-bind:is="show" style="height: inherit">
          </componet>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>

import post from '@/views/basicCoding/businessCoding/post'
import eduction from '@/views/basicCoding/eduction'
import gender from '@/views/basicCoding/gender'
import discipline from '@/views/basicCoding/discipline'
import graduateSchool from '@/views/basicCoding/graduateSchool'
import division from '@/views/basicCoding/division'
import staffStatus from '@/views/basicCoding/businessCoding/staffStatus'
import staffNumCoding from '@/views/basicCoding/staffNumCoding'
import orderNumCoding from '@/views/basicCoding/orderNumCoding'
import orderModel from '@/views/basicCoding/orderModel'
import member from '@/views/basicCoding/member'
export default {
  name: 'baseData',
  watch: {
    filterText (val) {
      this.$refs.baseTree.filter(val)
    }
  },
  data () {
    return {
      tableData: [], // 返回数据
      treeTitle: '系统基础数据码',
      currentNodeKey: null,
      defaultExpandedKeys: [1], // 默认展开节点的id
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      selectTreeId: -1, // 定义一个全局变量，初始值为-1，获取点击树节点ID
      filterText: '',
      show: '',
      baseData: [
        {
          id: 1,
          label: '标准编码数据',
          children: [{
            id: 101,
            parent: 1,
            label: '岗位管理'
          },
          {
            id: 102,
            parent: 1,
            label: '学历编码'
          },
          {
            id: 103,
            parent: 1,
            label: '行政区划'
          },
          {
            id: 104,
            parent: 1,
            label: '性别编码'
          },
          {
            id: 105,
            parent: 1,
            label: '院校编码'
          },
          {
            id: 106,
            parent: 1,
            label: '专业编码'
          }
          ]
        },
        {
          id: 2,
          label: '内部编码',
          children: [
            {
              id: 201,
              parent: 2,
              label: '工号格式编码'
            },
            {
              id: 202,
              parent: 2,
              label: '员工状态'
            },
            {
              id: 203,
              parent: 2,
              label: '订单号编码'
            },
            {
              id: 204,
              parent: 2,
              label: '订单类别'
            }
          ]
        },
        {
          id: 3,
          label: '会员设置',
          children: [
            {
              id: 301,
              parent: 3,
              label: '会员级别设置'
            }
          ]
        }
      ]
    }
  },
  components: {
    post,
    eduction,
    gender,
    discipline,
    graduateSchool,
    division,
    staffStatus,
    staffNumCoding,
    orderNumCoding,
    orderModel,
    member
  },
  methods: {
    // 官网 节点过滤
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    tableDataChange (id) {
      this.selectTreeId = id
      if (id === 101) {
        this.show = 'post'
      }
      if (id === 102) {
        this.show = 'eduction'
      }
      if (id === 103) {
        this.show = 'division'
      }
      if (id === 104) {
        this.show = 'gender'
      }
      if (id === 105) {
        this.show = 'graduateSchool'
      }
      if (id === 106) {
        this.show = 'discipline'
      }
      if (id === 201) {
        this.show = 'staffNumCoding'
      }
      if (id === 202) {
        this.show = 'staffStatus'
      }
      if (id === 203) {
        this.show = 'orderNumCoding'
      }
      if (id === 204) {
        this.show = 'orderModel'
      }
      if (id === 301) {
        this.show = 'member'
      }
    },
    handleCheckChange (data) {
      alert(JSON.stringify(data))
    },
    handleNodeClick (data, node, store) {
      this.tableDataChange(data.id)
    }
  },
  created () {
    const defaultId = 101
    this.currentNodeKey = defaultId
    this.tableDataChange(defaultId)
  }
}
</script>

<style scoped lang="less">

  body {
    font-family: Helvetica, sans-serif;
  }

  /*设置区域的大小*/
  .tree-frame{
    height:inherit;
    border: 1px solid #bbb;
    overflow: auto;
    background: #fff;
  }

  /*树的标题css*/
  .tree-title{
    background-color:#409EFF;
    height:37px;
    color: #FFF;
    line-height: 37px;
    text-align: center;
    position: relative;
    font-size: 20px;
  }

  /*设置高度（用于高度自适应）*/
  .module-height{
    height: inherit;
  }
</style>
