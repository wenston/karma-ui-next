/**
 * 功能：全局自增z-index，用以所有弹窗类型的东西
 */
import { getCurrentInstance, onMounted, ref } from "vue"
let __karma_ui_global_z_index = 100

export default function useGlobalZIndex() {
  const zIndex = ref(__karma_ui_global_z_index)
  function add(delta?: number) {
    __karma_ui_global_z_index += delta ?? 1
    zIndex.value = __karma_ui_global_z_index
    // console.log(__karma_ui_global_z_index)
    return zIndex.value
  }
  if (getCurrentInstance()) {
    onMounted(add)
  } else {
    add()
  }
  return {
    zIndex,
    add,
    get: () => zIndex.value,
    set(i: number) {
      zIndex.value = i
    }
  }
}
