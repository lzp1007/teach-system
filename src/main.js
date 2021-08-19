//导入Mock.js
// import "./mock"
import Vue from 'vue'
import App from './App.vue'
import "./eventBus"

//导入全局样式
import "./styles/global.less"
import showMessage from "@/utils/showMessage"
Vue.prototype.$showMessage = showMessage;

//注册全局自定义指令
import vLoading from "@/directives/loading"
import vLazy from "@/directives/lazy"
Vue.directive("loading", vLoading);
Vue.directive("lazy", vLazy)

//导入路由
import router from "@/router"

//导入仓库
import store from "@/store"

//导入axios
import axios from "axios"
Vue.prototype.$axios = axios;

// vue-iclient3d-webgl组件库
import '@supermap/vue-iclient3d-webgl/dist/styles/vue-iclient3d-webgl.min.css'
import VueiClient from '@supermap/vue-iclient3d-webgl'
Vue.use(VueiClient)

//恢复登录状态
store.dispatch("loginUser/whoAmI");

const vue = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

export default vue;