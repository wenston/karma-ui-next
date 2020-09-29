import { defineComponent, ref, reactive } from "vue"
import useToggle from "@/use/useToggle"
interface ToggleType {
  set?: () => void
  get?: () => void
  toggle?: () => void
}
const Comp = defineComponent({
  setup(props, ctx) {
    const { data, value, set, get, toggle } = useToggle({
      data: props.data,
      currentVal: props.currentVal
    })
    return () => ctx.slots.default?.({ data, value, set, get, toggle })
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    currentVal: {
      type: [Boolean, Number, String, Object]
    }
  }
})
export { ToggleType }
export default Comp
