import {computed, defineComponent, getCurrentInstance, onMounted, ref} from 'vue'
import Overlay from '../../overlay'
import Icon from '../../icon'
import {filterListeners} from '../../../util'
interface ValidateOptions {
    //验证时机，事件类型，如input/change/keydown/keypress/keyup等等
    when:string,
    reg?:RegExp,//验证输入的正则
    invalidTip?:string,//无效时给出的提示
    minlength?:number//字符串最小长度
}
const Emits = ['change','update:modelValue']
export default defineComponent({
    name:'Write',
    inheritAttrs:false,
    components: {Overlay,Icon},
    emits: Emits,
    props: {
        modelValue: [String,Number],
        block: Boolean,
        disabled: Boolean,
        readonly: Boolean,
        simple: Boolean,
        type: {
            type: String,
            default: 'text'
        },
        maxlength: [String,Number],
        validate: {
            type: Object,
            default:()=>({})
        }
    },
    setup(props,{emit,slots,attrs}) {
        const isInvalid = ref(false)
        const tip = ref('该值不合规则，请检查')
        onMounted(()=>{
            const ins = getCurrentInstance()
            console.log(ins)
        })
        const wrapperProps = computed(()=>{
            const o:any = {
                class: [
                    'k-write',
                    {
                        'k-write--block': props.block,
                        'k-write--simple': props.simple,
                        'k-write--disabled': props.disabled,
                        'k-write--invalid': isInvalid.value
                    }
                ]
            }
            return o
        })
        const inputProps = computed(()=>{
            // console.log(Object.keys(props), attrs)
            const listeners = filterListeners(attrs)
            let t = props.type
            const o:any = {
                class: [
                    'k-write-input'
                ],
                type: t,
                readonly: props.readonly,
                disabled: props.disabled,
                maxlength: props.maxlength,
                ...listeners,
                
            }
            if(props.validate.when) {
                const name = props.validate.when.toLowerCase()
                const ev = name.charAt(0).toUpperCase() + name.slice(1)
                Emits.push(name)
                o[`on${ev}`] = (e:any) => {
                    toValidate(e)
                    emit(name,e)
                }
            }
            return o
        })

        

        function toValidate(e:any) {
            let isError = false
                    
            const v = e.target?.value
            const {reg,minlength} = props.validate
            if(v.length<minlength) {
                isError = true
            }
            if(reg) {
                if(!v.test(reg)) {
                    isError = true
                }
            }
            isInvalid.value = isError
        }
        return ()=>{
            let prepend:any = null, append:any= null
            if(slots.prepend) {
                prepend = (
                    <div class="k-write-prepend">{slots.prepend()}</div>
                )
            }
            if(slots.append || slots.default) {
                const d = slots.append || slots.default
                append = (
                    <div class="k-write-append">{d!()}</div>
                )
            }
            const overlaySlots:any = {
                trigger: ()=>(
                    <div {...wrapperProps.value}>
                        {prepend}
                        <input {...inputProps.value} />
                        {append}
                    </div>
                )
            }
            if(isInvalid.value) {
                console.log(1)
                overlaySlots.default = ()=><div>{props.validate.invalidTip??tip.value}</div>
            }
            // return input
            
            return (
                <Overlay placement="right" v-slots={overlaySlots} />
            )
        }
    }
})