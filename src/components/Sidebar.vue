<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :collapse="collapse" background-color="#324157"
             text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
      <template v-for="item in items">
        <!--        有子目录的-->
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <!--            子目录下拉内容-->
            <template v-for="subItem in item.subs">
              <el-menu-item :index="subItem.index" :key="subItem.index">
                <span>{{subItem.title}}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!--        无子目录的-->
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from './bus'

export default {
  name: 'Sidebar',
  data () {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-wqs-shouye',
          index: 'home',
          title: '首页'
        },
        {
          icon: 'el-icon-wqs-shouye',
          index: 'system',
          title: '基础编码设置',
          subs: [
            {
              index: 'base-data',
              title: '系统编码'
            },
            {
              index: 'order-setting',
              title: '业务编码'
            },
            {
              index: 'service-type',
              title: '服务类别设置'
            }
          ]
        },
        {
          icon: 'el-icon-wqs-shezhi-zhanghaoguanli',
          index: 'customer',
          title: '客户管理',
          subs: [
            {
              index: 'customer-info',
              title: '客户信息管理'
            },
            {
              index: 'customer-contract',
              title: '客户合同管理'
            }
          ]
        },
        {
          icon: 'el-icon-wqs-shezhi-gongzhongpeizhi',
          index: 'project',
          title: '任务管理',
          subs: [
            {
              index: 'order',
              title: '订单信息'
            },
            {
              index: 'task-decomposition',
              title: '任务分解'
            },
            {
              index: 'task-progress',
              title: '订单进展'
            }
          ]
        },
        {
          icon: 'el-icon-wqs-cheliangguanli',
          index: 'car',
          title: '车辆管理',
          subs: [
            {
              index: 'vehicle-registration',
              title: '车辆登记'
            }
          ]
        },
        {
          icon: 'el-icon-wqs-xitongguanli',
          index: 'company',
          title: '企业管理',
          subs: [
            {
              index: 'staff',
              title: '员工管理'
            },
            {
              index: 'isQuit',
              title: '离职管理'
            },
            {
              index: 'structure',
              title: '部门调整'
            }
          ]
        },
        {
          icon: 'el-icon-wqs-shouye',
          index: 'user_system',
          title: '用户设置'
        },
        // {
        //   icon: 'el-icon-wqs-shouye',
        //   index: 'system_system',
        //   title: '系统设置'
        // },
        {
          icon: 'el-icon-wqs-shezhi-gongnengpeizhi',
          index: 'sys_manage',
          title: '权限管理',
          subs: [
            {
              index: 'user_manage',
              title: '用户管理'
            },
            {
              index: 'role_manager',
              title: '用户角色管理'
            },
            {
              index: 'permission_manager',
              title: '角色权限管理'
            }
          ]
        },
        {
          icon: 'el-icon-wqs-zichan-fuwuqi',
          index: 'material',
          title: '物料管理',
          subs: [
            {
              index: 'supplier',
              title: '供应商管理'
            },
            {
              index: 'supply_plan',
              title: '供应计划'
            },
            {
              index: 'material_requisition',
              title: '领料单'
            },
            {
              index: 'requisition_approval',
              title: '领料审批'
            },
            {
              index: 'stock_in',
              title: '入库单据'
            },
            {
              index: 'stock_out',
              title: '出库单据'
            },
            {
              index: 'warehouse',
              title: '仓库信息'
            },
            {
              index: 'inventory',
              title: '库存信息'
            }
          ]
        }
      ]
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  // 通过 Event Bus 进行组件间通信，来折叠侧边栏
  created () {
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
  }
}
</script>

<style scoped lang="less">
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  /*未折叠时侧边栏的宽度*/
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }

  .sidebar > ul {
    height: 100%;
  }
</style>
