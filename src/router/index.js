import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = () => Promise.resolve(require('@/views/login'))
const initRegister = () => Promise.resolve(require('@/views/initRegister'))
const register = () => Promise.resolve(require('@/views/register'))
const notFound = () => Promise.resolve(require('@/views/404'))

const main = () => Promise.resolve(require('@/components/Main'))
const home = () => Promise.resolve(require('@/views/home'))

const menuManage = () => Promise.resolve(require('@/views/app/business/menu'))
const articleManage = () => Promise.resolve(require('@/views/app/article/articleManage'))
const textArticle = () => Promise.resolve(require('@/views/app/article/textArticle'))
const picArticle = () => Promise.resolve(require('@/views/app/article/picArticle'))
const mediaArticle = () => Promise.resolve(require('@/views/app/article/mediaArticle'))
const picManage = () => Promise.resolve(require('@/views/app/picture/picManage'))

const vehicleInfo = () => Promise.resolve(require('@/views/car/vehicleInfo'))
const vehicleLocation = () => Promise.resolve(require('@/views/car/vehicleLocation'))
const vehicleUserLocation = () => Promise.resolve(require('@/views/car/vehicleUserLocation'))

const staff = () => Promise.resolve(require('@/views/company/staff'))
const qualificationManagement = () => Promise.resolve(require('@/views/company/qualificationManagement'))
const isQuit = () => Promise.resolve(require('@/views/company/staffManage/isQuit'))

const systemDataCoding = () => Promise.resolve(require('@/views/basicCoding/systemCoding/basePage'))
const businessDataCoding = () => Promise.resolve(require('@/views/basicCoding/businessCoding/basePage'))
const serviceType = () => Promise.resolve(require('@/views/basicCoding/serviceType'))

const individualCustomer = () => Promise.resolve(require('@/views/customer/individualCustomer'))
const companyCustomer = () => Promise.resolve(require('@/views/customer/companyCustomer'))
const customerContract = () => Promise.resolve(require('@/views/customer/customerContract'))

const tools = () => Promise.resolve(require('@/views/materiel/tools'))
const supplier = () => Promise.resolve(require('@/views/materiel/supplier'))

const order = () => Promise.resolve(require('@/views/project/order'))
const taskDecomposition = () => Promise.resolve(require('@/views/project/taskDecomposition'))
const taskProgress = () => Promise.resolve(require('@/views/project/taskProgress'))

// 多次点击同一路由时，执行catch，避免报错。
const routerPush = Router.prototype.push

Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/initRegister',
      name: 'initRegister',
      component: initRegister
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/text-article',
      name: 'textArticle',
      component: textArticle,
      meta: {title: '文字消息'}
    },
    {
      path: '/pic-article',
      name: 'picArticle',
      component: picArticle,
      meta: {title: '图文消息'}
    },
    {
      path: '/media-article',
      name: 'mediaArticle',
      component: mediaArticle,
      meta: {title: '视频消息'}
    },
    {
      path: '/',
      name: '',
      component: main,
      meta: {title: '基础页面'},
      children: [
        {
          path: '/home',
          name: 'home',
          component: home,
          meta: {title: '系统首页'}
        },
        {
          path: '/menu-manage',
          name: 'menuManage',
          component: menuManage,
          meta: {title: '业务菜单管理'}
        },
        {
          path: '/article-manage',
          name: 'articleManage',
          component: articleManage,
          meta: {title: '文章推送管理'}
        },
        {
          path: '/pic-manage',
          name: 'picManage',
          component: picManage,
          meta: {title: '图片推送管理'}
        },
        {
          path: '/vehicle-info',
          name: 'vehicleInfo',
          component: vehicleInfo,
          meta: {title: '车辆登记'}
        },
        {
          path: '/vehicle-location',
          name: 'vehicleLocation',
          component: vehicleLocation,
          meta: {title: '车辆定位'}
        },
        {
          path: '/vehicle-user-location',
          name: 'vehicleUserLocation',
          component: vehicleUserLocation,
          meta: {title: '驾驶员定位'}
        },
        {
          path: '/system-data-coding',
          name: 'systemDataCoding',
          component: systemDataCoding,
          meta: {title: '系统编码'}
        },
        {
          path: '/business-data-coding',
          name: 'businessDataCoding',
          component: businessDataCoding,
          meta: {title: '业务编码'}
        },
        {
          path: '/service-type',
          name: 'serviceType',
          component: serviceType,
          meta: {title: '服务类别设置'}
        },
        {
          path: '/individual-customer',
          name: 'individualCustomer',
          component: individualCustomer,
          meta: {title: '个体客户信息'}
        },
        {
          path: '/company-customer',
          name: 'companyCustomer',
          component: companyCustomer,
          meta: {title: '企业客户信息'}
        },
        {
          path: '/customer-contract',
          name: 'customerContract',
          component: customerContract,
          meta: {title: '客户注册信息'}
        },
        {
          path: '/staff',
          name: 'staff',
          component: staff,
          meta: {title: '员工管理'}
        },
        {
          path: '/qualification-management',
          name: 'qualificationManagement',
          component: qualificationManagement,
          meta: {title: '资质管理'}
        },
        {
          path: '/tools',
          name: 'tools',
          component: tools,
          meta: {title: '工具清单'}
        },
        {
          path: '/supplier',
          name: 'supplier',
          component: supplier,
          meta: {title: '供应商管理'}
        },
        {
          path: '/order',
          name: 'order',
          component: order,
          meta: {title: '订单管理'}
        },
        {
          path: '/task-decomposition',
          name: 'taskDecomposition',
          component: taskDecomposition,
          meta: {title: '任务分解'}
        },
        {
          path: '/task-progress',
          name: 'taskProgress',
          component: taskProgress,
          meta: {title: '订单进展'}
        },
        {
          path: '/isQuit',
          name: 'isQuit',
          component: isQuit,
          meta: {title: '离职管理'}
        }
      ]
    },
    {
      path: '*',
      name: '404 not found',
      component: notFound
    }
  ]
})
