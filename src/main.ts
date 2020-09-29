import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

//https://blog.csdn.net/qq_20473985/article/details/79132787
const themeCss = require("./theme/index.css")

createApp(App)
  .use(router)
  .mount(document.body)
