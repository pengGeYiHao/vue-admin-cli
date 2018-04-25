import Vue from 'vue'
import Router from 'vue-router'

const Layout = resolve => require(['@/components/Layout'],resolve)
const Login = resolve => require(['@/components/Login'],resolve)
const Component404 = resolve => require(['@/components/common/Component404'],resolve)
const NetworkAnomaly = resolve => require(['@/components/common/NetworkAnomaly'],resolve)

//二级菜单组件
// const HomeNavMenu = resolve => require(['@/components/navMenu/HomeNavMenu'],resolve)
// const HomeDefaultNavMenu = resolve => require(['@/components/navMenu/HomeDefaultNavMenu'],resolve)

//菜站位站位组件（面包屑）
const NavMenu = resolve => require(['@/components/Main/NavMenu'],resolve)

//侧着玩的
// const NoData = resolve => require(['@/components/common/NoData'],resolve)

// ============================main 组件============================
// ---test---
const Test = resolve => require(['@/components/Main/NavMenu1/Test'],resolve)



Vue.use(Router)


const routes = [
  {
    path:'/login',
    name:'登陆',
    component:Login
  },
  {
    path: '/',
    // name: '系统首页',
    component: Layout,
    redirect: '/navmenu1',
    children:[
      {
        path:'navmenu1',
        component:NavMenu,
        name:'菜单1',
        redirect: '/navmenu1/test',
        children:[
          {
            path:'test',
            redirect: '/navmenu1/test/1',
          },
          {
            path:'test/:page',
            component:Test,
            name:'测试',
          },
        ],
      },
      {
        path: 'navmenu2',
        redirect: '/navmenu2/1',
      },
      {
        path:'navmenu2/:page',
        component:Test,
        name:'菜单2',
      },
      {
        path: 'navmenu3',
        redirect: '/navmenu3/1',
      },
      {
        path:'navmenu3/:page',
        component:Test,
        name:'菜单3',
      },
    ],
  },
  {
    path:'/newordanomaly',
    component: NetworkAnomaly
  },
  {
    path:'*',
    component: Component404
  },
]

export default new Router({
  mode: 'history',
  routes,
  scrollBehavior (to,from,savedPosition){
    return {x:0,y:0}
  }
})
