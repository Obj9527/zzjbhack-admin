import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '博客管理系统', icon: 'dashboard' }
    }]
  },

  {
    path: '/test',
    component: Layout,
    redirect: '/test/form',
    meta: { title: 'test', icon: 'el-icon-present' },
    children: [
      {
        path: 'form',
        name: 'Form',
        component: () => import('@/views/test/index'),
        meta: {
          title: '表单',
          icon: 'el-icon-platform-eleme'
        }
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/test/table'),
        meta: {
          title: '表格',
          icon: 'el-icon-table-lamp'
        }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    meta: { title: '用户', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/user/index'),
        meta: { title: '所有用户', icon: 'el-icon-user' }
      }
    ]
  },

  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    name: 'article',
    meta: { title: '文章', icon: 'el-icon-s-management' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/article/index'),
        meta: { title: '所有文章', icon: 'el-icon-notebook-2' }
      },
      {
        path: 'edit',
        name: 'Edit',
        component: () => import('@/views/article/create'),
        meta: { title: '写文章', icon: 'el-icon-edit-outline' }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/article/category'),
        meta: { title: '分类', icon: 'tree' }
      },
      {
        path: 'tag',
        name: 'Tag',
        component: () => import('@/views/article/tag'),
        meta: { title: '标签', icon: 'el-icon-collection-tag' }
      }
    ]
  },

  {
    path: '/comment',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/table/index'),
        meta: { title: '评论', icon: 'el-icon-s-comment' }
      }
    ]
  },

  {
    path: '/media',
    component: Layout,
    redirect: '/media/add',
    name: 'Media',
    meta: { title: '媒体', icon: 'el-icon-picture' },
    children: [
      {
        path: 'add',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Add',
        meta: { title: '添加资源', icon: 'el-icon-upload' }
      },
      {
        path: 'list',
        component: () => import('@/views/nested/menu2/index'),
        name: 'List',
        meta: { title: '媒体库', icon: 'el-icon-box' }
      }
    ]
  },

  {
    path: '/data',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '数据', icon: 'el-icon-s-data' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

/*
 * bug: 2021-04-10在登录状态将token清理掉，会无限循环访问/login，猜测是$store问题
 * resolve: 2021-04-12：登录状态管理已由vuex管理，可使用getToken()获取存在cookie中的token
 * 路由导航守卫重构到permission.js
 */
// 挂载路由导航守卫
/* router.beforeEach((to, from, next) => {
  /!*
  * to 将要访问的路径
  * from 从哪个路径来
  * next 函数 next() 放行 next('/login') 强制跳转
  * *!/
  if (to.path === '/login') {
    console.log(`to.path: ${to.path}`)
    next()
    return
  }
  const token = getToken()
  if (!token){
    console.log(`token: ${token}, force to /login`)
    next('/login')
  }else {
    next()
  }
})*/

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
