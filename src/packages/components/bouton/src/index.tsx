import { computed, defineComponent } from "vue"

export default defineComponent({
  name: "Bouton",
  inheritAttrs: false,
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
  setup(props, ctx) {
    const tag = props.tag
    const klass = computed(() => {
      return [
        "k-bouton",
        {
          [`k-bouton-${props.type}`]: true,
          "k-bouton--disabled": props.disabled
        },
        `k-bouton-${props.size}`,
        ctx.attrs.class
      ]
    })
    const ps = computed(() => {
      let o = {
        tabindex: 0,
        class: klass.value
      }
      if (!props.disabled) {
        const { ..._attrs } = ctx.attrs
        o = { ...o, ..._attrs }
      }
      return o
    })

    return () => {
      const s = ctx.slots.default?.()
      return <tag {...ps.value}>{s}</tag>
    }
  }
})
