import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref
} from "vue"
import Overlay from "../../overlay"
import Icon from "../../icon"
import { filterListeners } from "../../../util"
interface ValidateOptions {
  //验证时机，事件类型，如input/change/keydown/keypress/keyup等等
  when: string
  reg?: RegExp //验证输入的正则
  invalidTip?: string //无效时给出的提示
  minlength?: number //字符串最小长度
}
const Emits = ["input", "change", "update:modelValue"]
const OverlayProps = {
  placement: { type: String, default: "right" },
  toBody: { type: Boolean, default: false }
}
function TipIcon(_name?: string) {
  return <Icon name={_name || "k-icon-warning"} size="15" />
}
export default defineComponent({
  name: "Write",
  inheritAttrs: false,
  components: { Overlay, Icon },
  emits: Emits,
  props: {
    ...OverlayProps,
    modelValue: [String, Number],
    block: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    simple: Boolean,
    type: {
      type: String,
      default: "text"
    },
    placeholder: String,
    maxlength: [String, Number],
    validate: {
      type: Object,
      default: () => ({})
    },
    //showTip控制提示的展示与否
    showTip: Boolean
  },
  setup(props, { emit, slots, attrs }) {
    const isInvalid = ref(false)
    const ipt_elem = ref(null)
    const tip = ref("该值不合规则，请检查")

    const wrapperProps = computed(() => {
      const o: any = {
        class: [
          "k-write",
          {
            "k-write--block": props.block,
            "k-write--simple": props.simple,
            "k-write--disabled": props.disabled,
            "k-write--invalid": visibleTip.value
          }
        ],
        
        style: {...((attrs.style??{}) as any)},
      }
      return o
    })
    const inputProps = computed(() => {
      let when = props.validate.when || ""
      if (when) {
        when = when.toLowerCase()
      }
      const listeners = filterListeners(attrs)
      const o: any = {
        ref: ipt_elem,
        class: ["k-write-input", attrs.class],
        type: props.type,
        value: props.modelValue,
        readonly: props.readonly,
        disabled: props.disabled,
        placeholder: props.placeholder,
        maxlength: props.maxlength,
        ...listeners,
        onInput: (e: any) => {
          const v = e.target.value
          emit("update:modelValue", v)
          if (when === "input") {
            toValidate(e)
          }
          emit("input", e)
        },
        onChange: (e: any) => {
          if (when === "change") {
            toValidate(e)
          }
          emit("change", e)
        }
      }
      // if(when) {
      //     if(when!=='input' && when!=='change') {
      //         const ev = when.charAt(0).toUpperCase() + when.slice(1)
      //         Emits.push(when)
      //         o[`on${ev}`] = (e:any) => {
      //             toValidate(e)
      //             emit(when,e)
      //         }

      //     }
      // }
      return o
    })
    const visibleTip = computed(()=>isInvalid.value&&props.showTip)

    function toValidate(e: any) {
      let isError = false

      const v = e.target?.value
      const { reg, minlength } = props.validate
      if (v.length < minlength) {
        isError = true
      }
      if (reg) {
        if (!reg.test(v)) {
          isError = true
        }
      }
      isInvalid.value = isError
    }
    return () => {
      let prepend: any = null,
        append: any = null
      if (slots.prepend) {
        prepend = <div class="k-write-prepend">{slots.prepend()}</div>
      }
      if (slots.append || slots.default) {
        const d = slots.append || slots.default
        append = <div class="k-write-append">{d!()}</div>
      }
      const overlaySlots: any = {
        trigger: () => (
          <div {...wrapperProps.value}>
            {prepend}
            <input {...inputProps.value} />
            {append}
          </div>
        )
      }
      if (visibleTip.value) {
        overlaySlots.default = () => (
          <>
            {TipIcon()}&#8194;
            {props.validate.invalidTip ?? tip.value}
          </>
        )
      }

      return (
        <Overlay
          manual
          placement={props.placement}
          toBody={props.toBody}
          show={visibleTip.value}
          style={{
            "background-color": "var(--k-color-danger-01)",
            color: "var(--k-color-danger)",
            "border-color": "var(--k-color-danger-05)",
            padding: "2px 8px"
          }}
          v-slots={overlaySlots}
        />
      )
    }
  }
})
