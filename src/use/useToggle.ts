import { reactive, ref, Ref, isRef } from "vue"

interface ToggleType<T> {
  data: Array<T>
  value: T
  set: () => void
  get: () => {item: T, index: number}
  toggle: () => void
}
export {ToggleType}
export default function useToggle<T>(para: {
  data: Array<T>
  value: T
}) {
  const base = ref(para.data)
  const val = ref<T>(para.value)
  function set(para: {
    index?:number;
    item?:string | number | boolean;
  } ) {
    if ("item" in para) {
      if (base.value.some((_v) => _v === para.item)) {
        (val.value as any) = para.item
      } else {
        console.warn(`数据里没有${para.item}`)
      }
    } else if ("index" in para) {
      if(para.index!==undefined) {
        (val.value as any) = base.value[para.index]
      }
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
