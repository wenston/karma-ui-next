import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  Teleport,
  Transition,
  watch
} from "vue"
import Icon from "../../icon"
import { getBoundingClientRect } from "../../../util"
import useGlobalZIndex from "../../../use/useGlobalZIndex"
import { createNoticeWrapper, removeNoticeWrapper } from "./_util"
import Close from "../../close"
export default defineComponent({
  inheritAttrs: false,
  name: "Notice",
  components: { Icon, Close },
  props: {
    show: { type: Boolean, default: false },
    placement: { type: String, default: "bottom-end" },
    duration: { type: Number, default: 4500 }, //单位毫秒,多少秒后自动关闭
    manual: { type: Boolean, default: false }, //是否手动控制关闭，也就是一直显示
    container: { type: HTMLElement }
  },
  emits: ["update:show"],
  setup(props, { emit, slots }) {
    const { zIndex: order, add } = useGlobalZIndex()
    const noticeHeight = ref("")
    const wrapper = createNoticeWrapper(props.placement)
    const visible = ref(props.show)
    watch(
      () => props.show,
      (s) => {
        visible.value = s
      }
    )
    watch(visible, (v) => {
      emit("update:show", v)
      if (v) {
        add()
        if (!props.manual) {
          setTimeout(() => {
            emit("update:show", false)
          }, props.duration)
        }
      }
    })

    onUnmounted(removeNoticeWrapper)

    return () => {
      const styles = {
        order: order.value,
        "--__notice-item-height": noticeHeight.value
          ? noticeHeight.value + "px"
          : ""
      }
      const klass = ["k-notice-item", `k-notice-item--${props.placement}`]
      return (
        <Teleport to={props.container ?? wrapper}>
          <Transition
            name="k-notice-transition"
            onAfter-enter={(el: HTMLElement) => {
              noticeHeight.value = getBoundingClientRect(el).height
            }}
          >
            {visible.value && (
              <div style={styles} class={klass}>
                {slots.default?.()}
                <Close
                  size="14"
                  name="k-icon-close"
                  class="k-notice-close"
                  onClick={(e: any) => {
                    visible.value = false
                  }}
                />
              </div>
            )}
          </Transition>
        </Teleport>
      )
    }
  },
  methods: {
    display() {
      this.$emit("update:show", true)
    }
  }
})
