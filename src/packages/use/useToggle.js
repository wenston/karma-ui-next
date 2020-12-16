import { ref, watch } from "vue"

export default function useToggle(refData,refValue) {
  const base = ref(refData)
  const val = ref(refValue)

  // watch(refData,d=>{
  //   console.log(d)
  //   base.value = d
  // })
  // watch(refValue,v=>{
  //   val.value=v
  // })

  function set(para) {
    if ("item" in para) {
      if (base.value.some((_v) => _v === para.item)) {
        val.value = para.item
      } else {
        console.warn(`数据里没有${para.item}`)
      }
    } else if ("index" in para) {
      if(para.index!==undefined) {
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
  }

  return {
    data: base,
    value: val,
    set,
    get,
    toggle
  }
}
