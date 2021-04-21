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
  },
  {
    path: "/checkbox",
    name: "checkbox",
    component: () => import("../views/Checkbox.vue"),
    meta: {
      title: "复选 Checkbox"
    }
  },
  {
    path: "/radio",
    name: "radio",
    component: () => import("../views/Radio.vue"),
    meta: {
      title: "单选 Radio"
    }
  },
  {
    path: '/tooltip',
    name: 'tooltip',
    component: ()=> import('../views/Tooltip.vue'),
    meta: {
      title: '小提示 Tooltip'
    }
  },
  {
    path: '/bubbleCard',
    name: 'bubbleCard',
    component: ()=> import('../views/BubbleCard.vue'),
    meta: {
      title: '气泡卡 BubbleCard'
    }
  },
  {
    path: "/popup",
    name: "popup",
    component: () => import("../views/Popup.vue"),
    meta: {
      title: "弹框 Popup"
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
export { routes }
