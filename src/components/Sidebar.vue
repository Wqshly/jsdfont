<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :collapse="collapse" text-color="#303133" active-text-color="#409EFF" unique-opened router>
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
          index: 'potential-loss-analysis',
          title: '潜在流失客户分析'
        },
        {
          icon: 'el-icon-wqs-shouye',
          index: 'article-manage',
          title: '移动端推送管理',
          subs: [
            {
              index: 'pic-manage',
              title: '图片推送管理'
            },
            {
              index: 'article-manage',
              title: '文章推送管理'
            },
            {
              index: 'type-manage',
              title: '文章类别设置'
            },
            {
              index: 'article-edit',
              title: '管理文章'
            }
          ]
        },
        {
          icon: 'el-icon-wqs-shouye',
          index: 'optimization-algorithm',
          title: '方案优化',
          subs: [
            {
              index: 'dispatching-optimization',
              title: '派工顺序优化'
            },
            {
              index: 'work-path-optimization',
              title: '出工路径优化'
            }
          ]
        },
        {
          icon: 'el-icon-wqs-shouye',
          index: 'system',
          title: '基础编码设置',
          subs: [
            {
              index: 'system-data-coding',
              title: '系统编码'
            },
            {
              index: 'business-data-coding',
              title: '业务编码'
            },
            {
              index: 'service-type',
              title: '服务类别设置'
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
              index: 'qualification-management',
              title: '资质管理'
            },
            {
              index: 'structure',
              title: '部门调整'
            }
          ]
        },
        {
          icon: 'el-icon-wqs-cheliangguanli',
          index: 'car',
          title: '车辆管理',
          subs: [
            {
              index: 'vehicle-info',
              title: '车辆信息'
            },
            {
              index: 'vehicle-user-location',
              title: '驾驶员定位'
            },
            {
              index: 'vehicle-location',
              title: '车辆定位'
            }
          ]
        },
        {
          icon: 'el-icon-wqs-shezhi-zhanghaoguanli',
          index: 'customer',
          title: '客户管理',
          subs: [
            {
              index: 'individual-customer',
              title: '个体客户信息'
            },
            {
              index: 'company-customer',
              title: '企业客户信息'
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

<style>

  .el-menu--popup {
    background: rgba(255, 255, 255, 0.7);
  }

  .el-menu .el-submenu__title:hover {
    font-weight: 700;
    -webkit-transition: all .5s;
  }

  .el-submenu .el-menu {
    /*position: absolute;*/
    top: 0; bottom: 0;
    left: 0; right: 0;
    margin: auto;
    background: rgba(255, 255, 255, .1);
   }

  .el-menu-item:hover {
    font-weight: 700;
    -webkit-transition: all .5s;
  }
</style>

<style scoped lang="less">

  // 磨砂效果
  .el-menu {
    /*position: absolute;*/
    top: 0; bottom: 0;
    left: 0; right: 0;
    line-height: 2;
    margin: auto;
    border-radius: 5px;
    background: rgba(255, 255, 255, .3);
  }

  .is-opened .el-menu {
    background: rgba(255, 255, 255, .3);
  }

  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 80px;
    bottom: 30px;
    overflow-y: scroll;
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  /*未折叠时侧边栏的宽度*/
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }

  .sidebar-el-menu {
    backdrop-filter: blur(10px) brightness(110%);
  }

  .sidebar > ul {
    height: 100%;
  }
</style>
