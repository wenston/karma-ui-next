import { defineComponent, computed } from "vue"
import Icon from '../../icon'
import useToggle from '../../../use/useToggle'
export default defineComponent({
    components: {Icon},
    props: {
        disabled: Boolean,
        value: [Number, String],//本radio代表的值
        modelValue: [Number, String]//用以双向绑定
    },
    emits: ['update:modelValue','change'],
    setup( props, {slots,emit} ) {
        const symbol = computed(()=>Symbol(props.value))
        const {value:v, set} = useToggle(
            [props.value, symbol.value], props.modelValue
        )
        function onSet(e) {
            set({item: props.value})
            if(props.value===v.value) {
                emit('update:modelValue', v.value)
                emit('change',v.value)
            }
        }
        const on = computed(()=>{
            if(!props.disabled) {
                return {
                    tabindex: 0,
                    onClick: onSet,
                    onKeyup:e=>{
                        if(e.key.toLowerCase()==='enter') {
                            onSet()
                        }
                    }
                }
            }
            return {}
        })
        return ()=> (
            <span 
                class={[
                    'k-radio',
                    {
                        'k-radio--checked': props.modelValue===props.value,
                        "k-radio--disabled": props.disabled
                    }
                ]} 
                {...on.value}>
                <Icon class="k-radio-icon" name={
                    props.modelValue===props.value
                        ?'k-icon-radio-fill'
                        :'k-icon-radio'
                    } />
                {slots.default?.()}
            </span>
        )
    }
})