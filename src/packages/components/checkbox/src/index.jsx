import { defineComponent,watch, computed, watchEffect,reactive,toRefs } from 'vue'
import {isArray} from '@vue/shared'
import useToggle from '../../../use/useToggle'
import Icon from '../../icon'

function one(props, {emit, slots}) {
    const {value:v, set, toggle} = useToggle(props.value, props.modelValue)
    watch(()=>props.modelValue,newValue=>{
        set({item:newValue})
    }, {immediate: true})
    
    function onToggle(e) {
        toggle()
        // console.log(v.value)
        emit('update:modelValue',v.value)
        emit('change',v.value)
    }
    const wrapperProps = {
        tabindex: 0,
        onClick: onToggle,
        onKeyup: e=> {
            if(e.key.toLowerCase()==='enter') {
                onToggle()
            }
        }
    }

    return ()=>  (
            <span {...wrapperProps}
            class={ ['k-checkbox',{
                'k-checkbox--checked':v.value
            }]}>
                <Icon class="k-checkbox-icon" name={v.value
                    ?'k-icon-checkbox-fill'
                    :'k-icon-checkbox'} />
                {slots.default?.()}
            </span>
        )
    
}
function more(props, {emit, slots}) {

    const symbol = computed(()=>Symbol(props.value))
    const has = computed(()=>props.modelValue.some(v=>v===props.value))
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
                emit('update:modelValue', props.modelValue.filter(v=>v!==props.value))
                emit('change',false)
            }
        }
    }
    const wrapperProps = {
        tabindex: 0,
        onClick: onToggle,
        onKeyup: e=> {
            if(e.key.toLowerCase()==='enter') {
                onToggle()
            }
        }
    }
    return ()=> (
            <span {...wrapperProps} 
            class={[
                'k-checkbox',{
                    'k-checkbox--checked':has.value
                }
            ]}>
                <Icon class="k-checkbox-icon" name={v.value===symbol.value
                    ?'k-icon-checkbox'
                    :'k-icon-checkbox-fill'} />
                {slots.default?.()}
            </span>
        
    )
}

export default defineComponent({
    components: {Icon},
    props: {
        value: {
            type: [Array,Number,String],
            default: ()=> [0,1]
        },
        modelValue: {//多选时，modelValue是数组！
            type: [Number, Boolean, Array],
            default: 0
        }
    },
    emits: ['change','update:modelValue'],
    setup(props, ctx) {
        return isArray(props.modelValue)?more(props,ctx):one(props,ctx)
    }
})
