import {
  App,
  render,
  createVNode,
  Transition,
  ComponentPublicInstance
} from "vue"
import Notice from "./src"
import MainNotice from "./src/notice"
import { createNoticeWrapper } from "./src/_util/index"

function $notice(app: App) {
  app.config.globalProperties.$notice = (opts: any) => {
    const placement = opts.placement ?? "bottom-end"
    const wrapper = createNoticeWrapper(placement)
    const div = document.createElement("div")

    const vm = (
      <MainNotice
        placement={placement}
        manual={opts.manual}
        duration={opts.duration}
        v-slots={{
          default: () => opts.content
        }}
      />
    )
    // 下边的也可以
    // const vm = createVNode(
    //   MainNotice,
    //   {
    //     placement,
    //     manual: opts.manual,
    //     duration: opts.duration
    //   },
    //   {
    //     default: () => opts.content
    //   }
    // )
    // console.log(vm)
    vm.appContext = app._context
    wrapper.appendChild(div)
    render(vm, div)
  }
}
export { $notice }
export { default } from "./src"
import "./src/style/notice.css"
