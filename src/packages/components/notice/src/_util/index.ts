import useGlobalZIndex from "../../../../use/useGlobalZIndex"
interface WrapperType {
  [k: string]: HTMLElement
}
let WRAPPERS: WrapperType = {}
function createNoticeWrapper(placement: string) {
  const { zIndex, add } = useGlobalZIndex()
  if (placement in WRAPPERS) {
    const el = WRAPPERS[placement]
    el.style.zIndex = add() + ""
    return el
  }
  const el = document.createElement("div")
  const id = `notice_container_${(new Date() as any) - 0}`
  const klass = "k-notice k-notice--" + placement
  el.id = id
  el.className = klass
  el.style.zIndex = zIndex.value + ""
  WRAPPERS[placement] = el
  document.body.appendChild(el)
  return el
}

function removeNoticeWrapper() {
  // if (WRAPPER !== null) {
  //   document.body.removeChild(WRAPPER)
  //   WRAPPER = null
  // }
}

export { createNoticeWrapper, removeNoticeWrapper }
