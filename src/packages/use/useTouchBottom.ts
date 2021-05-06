import { onMounted, ref, Ref } from "vue"
import { getElement } from "../util"
import useEvent from "./useEvent"
export default function useTouchBottom(
  elem: Ref<HTMLElement | unknown>,
  onTouchBottom: Function,
  offset?: number
) {
  const scrollHeight = ref(0)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const el = ref<unknown>(null)
  function touchBtm() {
    if (el.value === null) {
      el.value = getElement(elem)
    }
    const _el = el.value as HTMLElement
    scrollHeight.value = _el.scrollHeight
    clientHeight.value = _el.clientHeight
    scrollTop.value = _el.scrollTop

    if (
      scrollHeight.value > 0 &&
      clientHeight.value > 0 &&
      scrollTop.value + clientHeight.value + (offset || 0) >= scrollHeight.value
    ) {
      onTouchBottom()
    }
  }
  onMounted(touchBtm)
  useEvent(elem, "scroll", touchBtm)
}
