import { defineComponent, ref,watch, computed, watchEffect } from 'vue'
import useToggle from '@/use/useToggle'

const isArray = (arg) => Array.isArray(arg)

function one(props, {attrs, emit, slots}) {
    const {value:v, set, toggle} = useToggle(props)
    watch(()=>props.value,newValue=>{
        set({item:newValue})
    })
    function onToggle(e) {
        toggle()
        emit('update:value',v.value)
        emit('change',v.value)
    }
    return () => (
        <label onClick={onToggle}>
            <i class={
                ["iconfont",v.value?'k-icon-checkbox-fill':'k-icon-checkbox']
            }></i>
            {slots.default?.()}
        </label>
    )
}
function more(props, {attrs, emit, slots}) {

    const symbol = ref(Symbol(props.data))
    let {value: v,set,toggle} = useToggle({
        data: [props.data,symbol.value],
        value: props.value.some(_v=>_v===props.data)?props.data:symbol.value
    })
    const has = computed(()=>props.value.some(v=>v===props.data))

    // const 

    watchEffect(()=>{
        const u = useToggle({
            data: [props.data,symbol.value],
            value: props.value.some(_v=>_v===props.data)?props.data:symbol.value
        })
        v = u.value
        set=u.set
        toggle=u.toggle
    })
    function onToggle() {
        toggle()
        const _v = v.value;
        const isAdd = _v === props.data
        if(isAdd) {
            if(!has.value) {
                emit('update:value',[...props.value, props.data])
            }
        } else {
            if(has.value) {
                emit('update:value', props.value.filter(v=>v!==props.data))
            }
        }
    }
    return ()=> (
        <label onClick={onToggle}>
            <i class={
                ["iconfont",v.value===symbol.value?'k-icon-checkbox':'k-icon-checkbox-fill']
            }></i>
            {slots.default?.()}
        </label>
    )
}

export default defineComponent({
    props: {
        data: {
            type: [Array,Number,String],
            default: ()=> [0,1]
        },
        value: {
            type: [Number, Boolean, Array],
            default: 0
        }
    },
    emits: ['change','update:value'],
    setup(props, ctx) {
        console.log(isArray(props.value))
        return isArray(props.value)?more(props,ctx):one(props,ctx)
    }
})
