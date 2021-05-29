import { defineComponent,watch, computed, watchEffect,reactive,toRefs, SetupContext } from 'vue'
import {isArray} from '@vue/shared'
import useToggle from '../../../use/useToggle'
import Icon from '../../icon'

function one(props:any, {emit, slots}:SetupContext) {
    const {value:v, set, toggle} = useToggle(props.value, props.modelValue)
    watch(()=>props.modelValue,newValue=>{
        set({item:newValue})
    }, {immediate: true})
    
    function onToggle() {
        toggle()
        emit('update:modelValue',v.value)
        emit('change',v.value)
    }
    const wrapperProps = computed(()=>{
        let o = {}
        if(!props.disabled) {
            o = {
                tabindex: 0,
                onClick: onToggle,
                onKeyup: (e:any)=> {
                    if(e.key.toLowerCase()==='enter') {
                        onToggle()
                    }
                }
            }
        }
        return o
    })

    return ()=>  (
            <span {...wrapperProps.value}
            class={ ['k-checkbox',{
                'k-checkbox--checked':v.value,
                'k-checkbox--disabled':props.disabled
            }]}>
                <Icon class="k-checkbox-icon" name={v.value
                    ?'k-icon-checkbox-fill'
                    :'k-icon-checkbox'} />
                {slots.default&&<span class="k-checkbox-text">{slots.default?.()}</span>}
            </span>
        )
    
}
function more(props:any, {emit, slots}:SetupContext) {

    const symbol = computed(()=>Symbol(props.value))
    const has = computed(()=>props.modelValue.some((v:any)=>v===props.value))
    let {value: v,set,toggle} = useToggle(
        [props.value,symbol.value],
        has.value?props.value:symbol.value
    )

    //需要再次useToggle一下，如何精简掉？
    watchEffect(()=>{
        ({value:v,set,toggle} = useToggle(
            [props.value,symbol.value],
            has.value?props.value:symbol.value
        ))
    })

    function onToggle() {
        toggle()
        const _v = v.value
        const isAdd = _v === props.value
        if(isAdd) {
            if(!has.value) {
                emit('update:modelValue',[...props.modelValue, props.value])
                emit('change', true)
            }
        } else {
            if(has.value) {
                emit('update:modelValue', props.modelValue.filter((v:any)=>v!==props.value))
                emit('change',false)
            }
        }
    }
    const wrapperProps = computed(()=>{
        let o = {}
        if(!props.disabled) {
            o = {
                tabindex: 0,
                onClick: onToggle,
                onKeyup: (e:any)=> {
                    if(e.key.toLowerCase()==='enter') {
                        onToggle()
                    }
                }
            }
        }
        return o
    })
    return ()=> (
            <span {...wrapperProps.value} 
            class={[
                'k-checkbox',{
                    'k-checkbox--checked':has.value,
                    'k-checkbox--disabled':props.disabled
                }
            ]}>
                <Icon class="k-checkbox-icon" name={v.value===symbol.value
                    ?'k-icon-checkbox'
                    :'k-icon-checkbox-fill'} />
                {slots.default&&<span class="k-checkbox-text">{slots.default?.()}</span>}
            </span>
        
    )
}

export default defineComponent({
    components: {Icon},
    props: {
        value: {//多选时，value不是数组
            type: [Array,Number,String],
            default: ()=> [0,1]
        },
        modelValue: {//多选时，modelValue是数组！
            type: [Number, Boolean, Array],
            default: 0
        },
        disabled: Boolean
    },
    emits: ['change','update:modelValue'],
    setup(props, ctx:SetupContext) {
        return isArray(props.modelValue)?more(props,ctx):one(props,ctx)
    }
})
