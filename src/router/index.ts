import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Home from "../views/Home.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      title: "首页"
    }
  },
  {
    path: "/bouton",
    name: "bouton",
    component: () => import("../views/Bouton.vue"),
    meta: {
      title: "按钮 Bouton"
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
    path: "/switch",
    name: "switch",
    component: () => import("../views/Switch.vue"),
    meta: {
      title: "开关 Switch"
    }
  },
  {
    path: "/choose",
    name: "choose",
    component: () => import("../views/Choose.vue"),
    meta: {
      title: "选择 Choose"
    }
  },
  {
    path: "/write",
    name: "write",
    component: () => import("../views/Write.vue"),
    meta: {
      title: "输入框 Write"
    }
  },
  {
    path: "/number",
    name: "number",
    component: () => import("../views/Number.vue"),
    meta: {
      title: "数值输入框 Number"
    }
  },
  {
    path: "/popup",
    name: "popup",
    component: () => import("../views/Popup.vue"),
    meta: {
      title: "弹框 Popup"
    }
  },
  {
    path: "/drawer",
    name: "drawer",
    component: () => import("../views/Drawer.vue"),
    meta: {
      title: "抽屉 Drawer"
    }
  },
  {
    path: "/tooltip",
    name: "tooltip",
    component: () => import("../views/Tooltip.vue"),
    meta: {
      title: "小提示 Tooltip"
    }
  },
  {
    path: "/overlay",
    name: "overlay",
    component: () => import("../views/Overlay.vue"),
    meta: {
      title: "覆盖层 Overlay"
    }
  },
  {
    path: "/notice",
    name: "notice",
    component: () => import("../views/Notice.vue"),
    meta: {
      title: "通知 Notice"
    }
  },
  {
    path: "/pagination",
    name: "pagination",
    component: () => import("../views/Pagination.vue"),
    meta: { title: "分页 Pagination" }
  },
  {
    path: "/sheet",
    name: "sheet",
    component: () => import("../views/Sheet.vue"),
    meta: { title: "表格 Sheet" }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
export { routes }
