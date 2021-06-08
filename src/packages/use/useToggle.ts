import { Ref, ref, watch, isRef } from "vue"

type ToggleData = Ref<any[]> | any[]
type ToggleValue = Ref<any>
export default function useToggle(refData: ToggleData, refValue: ToggleValue) {
  const base = ref(refData)
  const val = ref(refValue)

  function set(para: any) {
    if ("item" in para) {
      if (base.value.some((_v) => _v === para.item)) {
        val.value = para.item
      } else {
        console.warn(`数据里没有${para.item}`)
      }
    } else if ("index" in para) {
      if (para.index !== undefined) {
        val.value = base.value[para.index]
      }
    }
  }
  function get() {
    const index = base.value.findIndex((v) => v === val.value)
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
    return get()
  }

  return {
    data: base,
    value: val,
    set,
    get,
    toggle
  }
}
