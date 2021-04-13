import { defineComponent, ref, reactive } from "vue"
import useToggle from "../../../use/useToggle"
const Comp = defineComponent({
  setup(props, ctx) {
    const { data, value, set, get, toggle } = useToggle({
      data: props.data,
      value: props.value
    })
    return () => ctx.slots.default?.({ data, value, set, get, toggle })
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    value: {
      type: [Boolean, Number, String, Object]
    }
  }
})
export default Comp
// export {ToggleType} from '@/packages/use/useToggle'
