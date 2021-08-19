import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store"



Vue.use(VueRouter);   //使用vue插件
import routes from "./routes";

const router = new VueRouter({
  routes,
  mode: "history"
})

router.beforeEach((to, from, next) => {
  //每当导航切换时（包含刷新页面的第一次），会运行该函数
  if(to.meta.auth) {
    //需要鉴权
    const status = store.getters["loginUser/status"];
    if(status === "loading") {
      //加载中，无法判定是否登录
      //进入鉴权登录页
        next({
          path: "/loading",
          query: {
            returnurl: to.fullPath
          }
        });
    }else if(status === "login") {
      //已登录
      next();
    }else {
      //未登录
      next("/login");  
    }
  } else {
    next();
  }
})

router.afterEach((to, from) => {
  if(to.meta.title) {
    document.title = to.meta.title + "-矿床学实习教学平台";
  }
})

export default router;


