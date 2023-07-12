import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入view组件
import Home from '@/views/MyHome.vue'
import User from '@/views/MyUser.vue'

// 把vuerouter安装为vue的插件
Vue.use(VueRouter)

// 路由规则的数组
const routes = [
  // 定义首页的路由规则
  { path: '/', component: Home, meta: { isRecord: true, top: 0 } },
  // 定义我的路由规则
  { path: '/user', component: User }
]

// 创建路由对象
const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: to.meta.top || 0 }
    }
  }
})

export default router
