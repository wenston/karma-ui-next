import { computed, defineComponent, onUpdated,onRenderTracked,onRenderTriggered } from "vue"
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
        const {class:_class,..._attrs} = ctx.attrs
        o = {...o, ..._attrs}
      }
      // console.log(ctx.attrs)
      return o
    })
    onUpdated(()=>{
      // console.log('update 了')
    })
    onRenderTriggered((e)=>{
      // console.log(e)
    })
    onRenderTracked(e=>{
      // console.log('组件tracked：',e)
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
    disabled: Boolean,
  },
  emits: {}
})

export default Button
