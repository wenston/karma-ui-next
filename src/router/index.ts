import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Home from "../views/Home.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "首页"
    }
  },
  {
    path: "/button",
    name: "button",
    component: () => import("../views/Button.vue"),
    meta: {
      title: "按钮 Button"
    }
  },
  {
    path: "/toggle",
    name: "toggle",
    component: () => import("../views/Toggle.vue"),
    meta: {
      title: "切换 Toggle"
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
export { routes }
