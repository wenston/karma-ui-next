import {computed, defineComponent,toRef,ref, watch} from 'vue'
import useToggle from '../../../use/useToggle'
function isOn(v:string|boolean|number) {
    return Number(v)>=1 || v===true
}
function isOff(v:string|boolean|number) {
    return Number(v)===0 || v===false || v===undefined || v===null
}
function isInterceptProperty(prop:string):boolean {
    return ['width','height'].indexOf(prop) > -1
}
export default defineComponent({
    name: 'Switch',
    inheritAttrs: false,
    props: {
        data: {
            type: Array,
            default: ()=>[0,1]
        },
        modelValue: {
            type: [String,Number,Boolean],
            default: 0
        },
        disabled: Boolean,
        readonly: Boolean,
    },
    emits: ['update:modelValue','change'],
    setup(props,{emit,attrs,slots}) {
        const {value,toggle} = useToggle(props.data, ref(props.modelValue))
        const _isOn = computed(()=>isOn(value.value))
        function toToggle() {
            toggle()
            const _v = value.value
            emit('update:modelValue',_v)
            emit('change',_v)
        }
        const ps = computed(()=>{
            //拦截style
            let _sty:any = {}
            let {style,klass,...rest} = attrs
            let sty = style as any
            if(sty) {
                for(const pr in sty) {
                    if(isInterceptProperty(pr)) {
                        _sty[`--__switch-${pr}`] = sty[pr]
                    }else{
                        _sty[pr] = sty[pr]
                    }
                }
            }
            const o:any = {
                class: ["k-switch",{
                    'k-switch--on':_isOn.value,
                    'k-switch--disabled': props.disabled
                },klass],
                style: _sty,
                ...rest
            }
            if(!props.disabled && !props.readonly) {
                o.onClick=toToggle
            }
            return o
        })
        watch(()=>props.modelValue,v=>{
            value.value=v
        })
        return ()=>{
            return (
                <i {...ps.value}>{_isOn.value?slots.on?.():slots.off?.()}</i>
            )
        }
    }
})