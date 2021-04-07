import { defineComponent, computed } from "vue"
import Icon from '@/packages/components/icon'
import useToggle from '@/packages/use/useToggle'
export default defineComponent({
    components: {Icon},
    props: {
        data: [Number, String],//本radio代表的值
        modelValue: [Number, String]//用以双向绑定
    },
    emits: ['update:modelValue','change'],
    setup( props, {slots,emit} ) {
        const symbol = computed(()=>Symbol(props.data))
        const {value, set} = useToggle(
            [props.data, symbol.value], props.modelValue
        )
        function onSet(e) {
            set({item: props.data})
            if(props.data===value.value) {
                emit('update:modelValue', value.value)
                emit('change',value.value)
            }
        }
        return ()=> (
            <span tabindex="0"
            onClick={onSet}
            onKeyup={(e)=>{
                if(e.key.toLowerCase()==='enter') {
                    onSet()
                }
            }}>
                <Icon name={
                    props.modelValue===props.data
                        ?'k-icon-radio-fill'
                        :'k-icon-radio'
                    } />
                {slots.default?.()}
            </span>
        )
    }
})