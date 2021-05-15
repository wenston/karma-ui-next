interface WrapperType {
  [k: string]: HTMLElement
}
let WRAPPERS: WrapperType = {}
function createNoticeWrapper(placement: string) {
  if (placement in WRAPPERS) {
    return WRAPPERS[placement]
  }
  const el = document.createElement("div")
  const id = `notice_container_${(new Date() as any) - 0}`
  const klass = "k-notice k-notice--" + placement
  el.id = id
  el.className = klass
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
