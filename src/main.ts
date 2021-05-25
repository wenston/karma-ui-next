import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

//https://blog.csdn.net/qq_20473985/article/details/79132787
// const themeCss = require("./theme/index.css")

//https://jkchao.github.io/typescript-book-chinese/typings/migrating.html#第三方的-npm-模块
import "./packages/theme/index.css"
import "./packages/theme/font/iconfont.css"

// Notice可以从这里全局引入，也可以局部引入
import Notice from "./packages/components/notice"
// 同Notice
import Confirm from "./packages/components/confirm"

createApp(App)
  .use(router)
  .use(Notice)
  .use(Confirm)
  .mount(document.body)
