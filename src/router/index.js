import Vue from 'vue'
import Router from 'vue-router'

const Layout = resolve => require(['@/components/Layout'],resolve)
const Login = resolve => require(['@/components/Login'],resolve)
const Component404 = resolve => require(['@/components/common/Component404'],resolve)
const NetworkAnomaly = resolve => require(['@/components/common/NetworkAnomaly'],resolve)

//站位站位组件（面包屑）
const SeatNavMenu = resolve => require(['@/components/navMenu/SeatNavMenu'],resolve)

// ============================main 组件============================
// ---普通页---
const Test = resolve => require(['@/components/Main/NavMenu/Test'],resolve)
// ---线性图---
const LineImg = resolve => require(['@/components/Main/LineImg'],resolve)
// ---slider线性图---
const SliderLineImg = resolve => require(['@/components/Main/SliderLineImg'],resolve)
// ---饼状图---
const CakeImg = resolve => require(['@/components/Main/CakeImg'],resolve)
// ---预览pdf---
const TestPdf = resolve => require(['@/components/Main/TestPdf'],resolve)
// ---编辑单元格---
const EditTable = resolve => require(['@/components/Main/EditTable'],resolve)
// ---富文本编辑器---
const QuillEditor = resolve => require(['@/components/Main/QuillEditor'],resolve)



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
    redirect: '/navmenu',
    children:[
      {
        path:'navmenu',
        component:SeatNavMenu,
        name:'菜单',
        redirect: '/navmenu/test',
        children:[
          {
            path:'test',
            redirect: '/navmenu/test/1',
          },
          {
            path:'test/:page',
            component:Test,
            name:'普通页',
          },
        ],
      },
      {
        path:'lineimg',
        component:LineImg,
        name:'线性图',
      },
      {
        path:'cakeimg',
        component:CakeImg,
        name:'饼状图',
      },
      {
        path:'sliderlineimg',
        component:SliderLineImg,
        name:'slider线性图',
      },
      {
        path:'testpdf',
        component:TestPdf,
        name:'预览pdf',
      },
      {
        path:'edittable',
        component:EditTable,
        name:'编辑单元格',
      },
      {
        path:'quilleditor',
        component:QuillEditor,
        name:'富文本编辑器',
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
