import NotFound from "@/views/NotFound.vue"

export default [
  {path: "/", redirect: "/home"},
  {
    name: "Login", 
    path: "/login", component: () => import("@/views/Login"), 
    meta: {
      title: "登录"
    }
  },
  {
    name: "Loading", 
    path: "/loading", 
    component:()=> import("@/views/Loading"),
  },
  {
    name: "Home", 
    path: "/home", 
    component: () => import("@/views/Home"), 
    meta: {
      auth: true,    //是否需要鉴权
      title: "实习简介"
    }
  },
  {
    name: "Mine", 
    path: "/mine", 
    component: () => import("@/views/Mine"),        
    meta: {
      auth: true,
      title: "三维实景"    
    }
  },
  {
    name: "Route", 
    path: "/route", 
    component: () => import("@/views/Route"), 
    meta: {
      auth: true,
      title: "实习路线" 
    },
  },
  {
    name: "Content", 
    path: "/content", 
    component: () => import("@/views/Content"),
    meta: {
      auth: true,
      title: "学习内容" 
    }
  },
  {
    name: "Exam", 
    path: "/exam", 
    component: () => import("@/views/Exam"),
    meta: {
      auth: true,
      title: "答题自测" 
    }
  },
  {
    name: "Score", 
    path: "/score", 
    component: () => import("@/views/Score"),
    meta: {
      auth: true,
      title: "成绩排行" 
    }
  },
  {
    name: "Character", 
    path: "/character", 
    component: () => import("@/views/Character"),
    meta: {
      auth: true,
      title: "矿床特征" 
    }
  },
  {
    name: "Blog", 
    path: "/article", 
    component: () => import("@/views/Blog"),
    meta: {
      auth: true,
      title: "文章" 
    }
  },
  {
    name: "BlogDetail", 
    path: "/article/:id", 
    component: () => import("@/views/Blog/Detail"),
    meta: {
      auth: true,
      title: "文章详情"
    }
  },
  {
    name: "CharacterDetail", 
    path: "/character/:id", 
    component: () => import("@/views/Character/Detail"),
    meta: {
      auth: true,
      title: "文章详情"
    }
  },
  {
    name: "CategoryBlog", 
    path: "/article/cate/:categoryId", 
    component: () => import("@/views/Blog"),
    meta: {
      auth: true,
      title: "文章" 
    }
  },
  {
    name: "CharacterBlog", 
    path: "/character/cate/:categoryId", 
    component: () => import("@/views/Character"),
    meta: {
      auth: true,
      title: "文章" 
    }
  },
  {
    name: "NotFound",
    path: "*",
    component: NotFound
  }
]