import { computed, defineComponent, reactive } from "vue"

const Button = defineComponent({
  inheritAttrs: false,
  setup(props, ctx) {
    const tag = props.tag
    const klass = computed(() => {
      return [
        "k-button",
        {
          [`k-button-${props.type}`]: true
        },
        `k-button-${props.size}`
      ]
    })
    const ps = reactive({
      ...ctx.emit,
      ...ctx.attrs,
      tabindex: 0,
      class: klass.value
    })
    return () => <tag {...ps}>{ctx.slots.default?.()}</tag>
  },
  props: {
    tag: {
      type: String,
      default: "button"
    },
    type: {
      type: String,
      default: "default"
    },
    size: {
      type: String,
      default: "medium"
    },
    disabled: Boolean
  },
  emits: {}
})

export default Button
