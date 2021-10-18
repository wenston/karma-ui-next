import { computed, defineComponent, h, SetupContext } from "vue"
import Overlay from "../../overlay"
export default defineComponent({
  inheritAttrs: false,
  components: { Overlay },
  props: {
    ...Overlay.props,
    trigger: { type: String, default: "hover" },
    title: {
      type: [String, Number, Object],
      default: ""
    }
  },
  emit: Overlay.emits,
  setup(props, { slots, emit, attrs }: SetupContext) {
    const overlayProps = computed(() => {
      const { title, ...ops } = props
      const klass = [attrs.class]
      const _sty: any = attrs.style ?? {}
      return {
        ...ops,
        class: klass,
        transitionName: "k-tooltip",
        style: {
          "background-color": "rgba(0,0,0,.85)",
          color: "rgba(255,255,255,.8)",
          "border-color": "rgba(0,0,0,.25)",
          padding: "6px 8px",
          ..._sty
        },
        "onUpdate:show": (v: any) => {
          emit("update:show", v)
        }
      }
    })
    const _slots = computed(() => ({
      default: () => props.title,
      trigger: () => slots.default?.()
    }))
    return () => {
      return <Overlay {...overlayProps.value} v-slots={_slots.value} />
    }
  }
})
