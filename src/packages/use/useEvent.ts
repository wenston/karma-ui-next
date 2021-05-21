import { onMounted, onUnmounted, onUpdated, Ref, getCurrentInstance } from "vue"
import useElement from "./useElement"
export default function useListener(
  elem: Ref, //elem.value可能是HTMLElement，也可能个组件！
  type: string,
  listener: EventListener | Function
) {
  const ins = getCurrentInstance()
  const { el } = useElement(elem)
  function add() {
    el.value?.addEventListener(type, listener)
    // console.log('add',el.value)
  }
  function remove() {
    el.value?.removeEventListener(type, listener)
    // console.log("remove")
  }
  if (ins) {
    onMounted(() => {
      add()
    })
    onUpdated(() => {
      remove()
      add()
    })

    onUnmounted(remove)
  }
}
