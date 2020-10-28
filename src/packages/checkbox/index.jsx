import { defineComponent, ref,watch, computed, watchEffect } from 'vue'
import {isArray} from '@vue/shared'
import useToggle from '@/use/useToggle'
import Icon from '@/packages/icon'

function componentWrapper(content, wrapperProps) {
    return (<span {...wrapperProps}>
        {content}
    </span>)
}
function one(props, {emit, slots}) {
    const {value:v, set, toggle} = useToggle(props.data, props.modelValue)
    watch(()=>props.modelValue,newValue=>{
        set({item:newValue})
    }, {immediate: true})
    
    function onToggle(e) {
        toggle()
        emit('update:modelValue',v.value)
        emit('change',v.value)
    }
    const wrapperProps = {
        tabindex: 0,
        onClick: onToggle,
        onKeyUp: e=> {
            if(e.key.toLowerCase()==='enter') {
                onToggle()
            }
        }
    }
    return ()=> componentWrapper(
        (
            <>
                <Icon name={v.value?'k-icon-checkbox-fill':'k-icon-checkbox'} />
                {slots.default?.()}
            </>
        ),
        wrapperProps
    )
}
function more(props, {emit, slots}) {

    const symbol = computed(()=>Symbol(props.data))
    let {value: v,set,toggle} = useToggle(
        [props.data,symbol.modelValue],
        props.modelValue.some(_v=>_v===props.data)?props.data:symbol.value
    )
    const has = computed(()=>props.modelValue.some(v=>v===props.data))

    //需要再次useToggle一下，如何精简掉？
    watchEffect(()=>{
        ({value:v,set,toggle} = useToggle(
            [props.data,symbol.value],
            props.modelValue.some(_v=>_v===props.data)?props.data:symbol.value
        ))
    })
    function onToggle() {
        toggle()
        const _v = v.value
        const isAdd = _v === props.data
        if(isAdd) {
            if(!has.value) {
                emit('update:modelValue',[...props.modelValue, props.data])
                emit('change', true)
            }
        } else {
            if(has.value) {
                emit('update:modelValue', props.modelValue.filter(v=>v!==props.data))
                emit('change',false)
            }
        }
    }
    const wrapperProps = {
        tabindex: 0,
        onClick: onToggle,
        onKeyUp: e=> {
            if(e.key.toLowerCase()==='enter') {
                onToggle()
            }
        }
    }
    return ()=> componentWrapper(
        (
            <>
                <Icon name={v.value===symbol.value?'k-icon-checkbox':'k-icon-checkbox-fill'} />
                {slots.default?.()}
            </>
        ),
        wrapperProps
    )
}

export default defineComponent({
    components: {Icon},
    props: {
        data: {
            type: [Array,Number,String],
            default: ()=> [0,1]
        },
        modelValue: {
            type: [Number, Boolean, Array],
            default: 0
        }
    },
    emits: ['change','update:modelValue'],
    setup(props, ctx) {
        return isArray(props.modelValue)?more(props,ctx):one(props,ctx)
    }
})
