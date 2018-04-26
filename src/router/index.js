import Vue from 'vue'
import Router from 'vue-router'

const Layout = resolve => require(['@/components/Layout'],resolve)
const Login = resolve => require(['@/components/Login'],resolve)
const Component404 = resolve => require(['@/components/common/Component404'],resolve)
const NetworkAnomaly = resolve => require(['@/components/common/NetworkAnomaly'],resolve)

//站位站位组件（面包屑）
const SeatNavMenu = resolve => require(['@/components/navMenu/SeatNavMenu'],resolve)

// ============================main 组件============================
// ---test---
const Test = resolve => require(['@/components/Main/NavMenu1/Test'],resolve)
// ---菜单2---
const NavMenu2 = resolve => require(['@/components/Main/NavMenu2'],resolve)
// ---菜单3---
const NavMenu3 = resolve => require(['@/components/Main/NavMenu3'],resolve)
// ---预览pdf---
const TestPdf = resolve => require(['@/components/Main/TestPdf'],resolve)



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
        component:SeatNavMenu,
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
        path:'navmenu2',
        component:NavMenu2,
        name:'菜单2',
      },
      {
        path:'navmenu3',
        component:NavMenu3,
        name:'菜单3',
      },
      {
        path:'testpdf',
        component:TestPdf,
        name:'预览pdf',
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
