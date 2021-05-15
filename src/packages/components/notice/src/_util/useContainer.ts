import { getCurrentInstance, onUnmounted, ref } from "vue"
let CONTAINER: HTMLElement

export default function useContainer(className: string) {
  const container = ref(CONTAINER)
  if (CONTAINER === null) {
  }

  function create() {
    let c = CONTAINER
    if (!c) {
      const d = (new Date() as any) - 0
      const id = `notice_${d}`
      c = document.createElement("div")
      c.id = id
      c.className = className
      document.body.append(c)
      container.value = CONTAINER = c
    }
    return c
  }

  function destroy() {
    CONTAINER && document.body.removeChild(CONTAINER)
  }

  create()

  if (getCurrentInstance()) {
    onUnmounted(destroy)
  }

  return {
    container,
    create,
    destroy
  }
}
