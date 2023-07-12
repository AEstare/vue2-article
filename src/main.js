import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入并安装vant插件
import Vant from 'vant'
// import 'vant/lib/index.css'
// 如果要覆盖默认less变量，必须改成导入index.less
import 'vant/lib/index.less'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
