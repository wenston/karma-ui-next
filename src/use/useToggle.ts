import { reactive, ref, Ref } from "vue"

interface ToggleType<T> {
  data: Array<T>
  currentVal: T
}

interface ToggleMethodsType {
  set?: () => void
  get?: () => void
  toggle?: () => void
}

export default function useToggle(para: any) {
  const base = ref(para.data)
  const val = ref(para.currentVal)
  function set(para: any) {
    if ("item" in para) {
      if (base.value.some((_v: any) => _v === para.item)) {
        val.value = para.item
      } else {
        console.warn(`数据里没有${para.item}`)
      }
    } else if ("index" in para) {
      val.value = base.value[para.index]
    }
  }
  function get() {
    const index = base.value.findIndex((v: any) => v === val.value)
    return {
      item: val.value,
      index
    }
  }
  function toggle() {
    const len = base.value.length
    const { index: currentIndex } = get()
    const nextIndex = (currentIndex + 1) % len
    set({ index: nextIndex })
  }

  return {
    data: base,
    value: val,
    set,
    get,
    toggle
  }
}
