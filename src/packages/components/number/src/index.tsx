import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref
} from "vue"
import Write from "../../write"
import Icon from "../../icon"
import { filterListeners } from "../../../util"
const OnlyOnce = ["-", "."]
const OtherKeys = ["backspace", "delete", "tab", 'enter']
export default defineComponent({
  name: "Number",
  inheritAttrs: false,
  components: { Write, Icon },
  emits: ["update:modelValue", "change", "input"],
  props: {
    ...Write.props,
    min: { type: Number, default: undefined },
    max: { type: Number, default: undefined },
    lazy: Boolean, //true：change时进行数据双向同步。false时，input时同步
    //当给定了min和max时，autoCorrect有效
    autoCorrect: {
      type: Boolean,default:true
    },
    showButton:Boolean,//是否显示上下箭头
  },
  setup(props, { emit, attrs, slots }) {
    const showTip = ref(false)
    const tip = ref("")
    const writeProps = computed(() => {
      const o: any = {
        style: {...((attrs.style??{}) as any)},
        placement: props.placement,
        toBody: props.toBody,
        //---------
        block: props.block,
        simple: props.simple,
        modelValue: props.modelValue,
        readonly: props.readonly,
        disabled: props.disabled,
        placeholder: props.placeholder,
        maxlength: props.maxlength,
        showTip: showTip.value,
        validate: {
          when: 'input',
          invalidTip: tip.value,
          ...props.validate
        },
        type: "text",
        ...filterListeners(attrs),
        //由于是只能输入数字的输入框，所以在keydown的时候，做初步的筛选，只允许数值相关的字符录入
        onKeydown,
        //在input时，做进一步的筛选
        onInput,
        //change时，做第三次的数值规范
        onChange
      }

      return o
    })

    function toValidateAndEmit(when: string, e: any, v: string) {
      const min = props.min,
        max = props.max
      if (min !== undefined) {
        if (v < min) {
          tip.value = '最小不能小于'+min
          showTip.value=true
          if(props.autoCorrect) {
            v = min
            setTimeout(()=>{showTip.value=false},3000)
          }
          e.target.value = v
          emit("update:modelValue", v)
          return false
        }else{
          showTip.value=false
        }
      }
      if (max !== undefined) {
        if (v > max) {
          // v = max
          tip.value = "最大不能超过" + max
          showTip.value = true
          if(props.autoCorrect) {
            v = max
            setTimeout(()=>{showTip.value=false},3000)
          }
          e.target.value = v
          emit("update:modelValue", v)
          return false
        } else {
          showTip.value = false
        }
      }
      e.target.value = v
      emit("update:modelValue", v)

      
    }
    function onKeydown(e:any) {
      const key = e.key.toLowerCase()
      if (
        !/\d+/.test(key) &&
        OtherKeys.indexOf(key) === -1 &&
        OnlyOnce.indexOf(key) === -1
      ) {
        // console.log('阻止了吗')
        e.preventDefault()
      }
    }
    function onChange(e: any) {
      let v = e.target.value
      let _v = v
      if (_v === "") {
        if (props.lazy) {
          toValidateAndEmit("change", e, v)
        }
        emit("change", e)
        return
      }
      let firstChar = v.charAt(0)
      let twoChar = v.slice(0, 2)

      if (firstChar === ".") {
        _v = "0." + v.slice(1)
      } else if (twoChar === "-.") {
        _v = "-0." + v.slice(2)
      }
      //对填入的数值进行规范之后，再次检查是不是一个数，不是数，就直接清空！
      if(isNaN(+_v)) {
        _v = ''
      }
      if (v !== _v) {
        v = _v
        e.target.value = _v
      }
      if (props.lazy) {
        toValidateAndEmit("change", e, v)
        emit("change", e)
      }
    }

    function onInput(e: any) {
      let v = e.target.value
      let _v = v
      if (_v === "") {
        if (!props.lazy) {
          emit("update:modelValue", _v)
        }
        emit("input", e)
        return
      }
      let firstChar = v.charAt(0)
      let restChars = v.slice(1)
      let _rest = restChars
      //如果首位是点，则后续不能再出现点
      if (firstChar === "." || firstChar === "-") {
        _rest = restChars.replace(new RegExp(firstChar), "")
      }

      if (_rest !== restChars) {
        _v = firstChar + _rest
      }
      if (v !== _v) {
        v = _v
        e.target.value = _v
      }
      if (!props.lazy) {
        // v = Number(v)
        toValidateAndEmit("input", e, v)
        emit("input", e)
      }
    }

    return () => {
      const _slots = props.showButton && {
        append: () => [
          <i class="k-number-minus-icon" />,
          <i class="k-number-plus-icon" />
        ]
      }
      return <Write {...writeProps.value} v-slots={_slots} />
    }
  }
})
