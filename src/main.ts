import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

//https://blog.csdn.net/qq_20473985/article/details/79132787
// const themeCss = require("./theme/index.css")

//https://jkchao.github.io/typescript-book-chinese/typings/migrating.html#第三方的-npm-模块
import "./packages/theme/index.css"
import "./packages/theme/font/iconfont.css"

import { $notice } from "./packages/components/notice"

createApp(App)
  .use(router)
  .use($notice)
  .mount(document.body)
