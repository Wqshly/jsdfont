<template>
  <div id="app" style="height: inherit">
    <el-row :gutter="2" style="height: inherit;margin: 0">
      <el-col :span="4" class="tree-frame" style="border-radius: 5px">
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
import carCategory from '@/views/basicCoding/businessCoding/carCategory'
import carStatus from '@/views/basicCoding/businessCoding/carStatus'
import contractStatus from '@/views/basicCoding/businessCoding/contractStatus'
import post from '@/views/basicCoding/systemCoding/post'
import division from '@/views/basicCoding/systemCoding/division'
import gender from '@/views/basicCoding/gender'
import staffNumCoding from '@/views/basicCoding/staffNumCoding'
import orderNumCoding from '@/views/basicCoding/orderNumCoding'
import orderModel from '@/views/basicCoding/orderModel'
import member from '@/views/basicCoding/member'
import contractTemplate from '@/views/basicCoding/businessCoding/contractTemplate'

export default {
  name: 'basePage',
  watch: {
    filterText (val) {
      this.$refs.baseTree.filter(val)
    }
  },
  data () {
    return {
      tableData: [], // 返回数据
      treeTitle: '业务编码',
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
          id: 100,
          label: '车辆编码',
          children: [
            {
              id: 1001,
              parent: 100,
              label: '车辆类别编码'
            },
            {
              id: 1002,
              parent: 100,
              label: '车辆状态编码'
            }
          ]
        },
        {
          id: 200,
          label: '内部编码',
          children: [
            {
              id: 2001,
              parent: 200,
              label: '合同状态'
            },
            {
              id: 2002,
              parent: 200,
              label: '订单类别设定'
            },
            {
              id: 2003,
              parent: 200,
              label: '订单号编码'
            },
            {
              id: 2004,
              parent: 200,
              label: '订单类别'
            }
          ]
        },
        {
          id: 300,
          label: '会员设置',
          children: [
            {
              id: 3001,
              parent: 300,
              label: '会员级别设置'
            }
          ]
        },
        {
          id: 400,
          label: '合同模板'
        }
      ]
    }
  },
  components: {
    carCategory,
    carStatus,
    post,
    contractStatus,
    gender,
    division,
    staffNumCoding,
    orderNumCoding,
    orderModel,
    member,
    contractTemplate
  },
  methods: {
    // 官网 节点过滤
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    tableDataChange (id) {
      this.selectTreeId = id
      if (id === 1001) {
        this.show = 'carCategory'
      }
      if (id === 1002) {
        this.show = 'carStatus'
      }
      if (id === 2001) {
        this.show = 'contractStatus'
      }
      if (id === 2002) {
        this.show = 'staffNumCoding'
      }
      if (id === 2003) {
        this.show = 'orderNumCoding'
      }
      if (id === 2004) {
        this.show = 'orderModel'
      }
      if (id === 400) {
        this.show = 'contractTemplate'
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
    const defaultId = 1001
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
  .tree-frame {
    height: inherit;
    border: 1px solid #bbb;
    overflow: auto;
    background: #fff;
  }

  /*树的标题css*/
  .tree-title {
    background-color: #55aaff;
    height: 37px;
    color: #FFF;
    line-height: 37px;
    text-align: center;
    position: relative;
    font-size: 20px;
  }

  /*设置高度（用于高度自适应）*/
  .module-height {
    height: inherit;
  }
</style>
