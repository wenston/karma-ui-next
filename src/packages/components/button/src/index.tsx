import { computed, defineComponent, reactive } from "vue"

const Button = defineComponent({
  inheritAttrs: false,
  setup(props, ctx) {
    const tag = props.tag
    const klass = computed(() => {
      return [
        "k-button",
        {
          [`k-button-${props.type}`]: true,
          'k-button--disabled': props.disabled
        },
        `k-button-${props.size}`,
        ctx.attrs.class
      ]
    })
    const ps = computed(()=>{
      let o = {
        tabindex: 0,
        class: klass.value
      }
      if(!props.disabled) {
        o = {...o, ...ctx.attrs}
      }
      return o
    })
    return () => <tag {...ps.value}>{ctx.slots.default?.()}</tag>
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
