import { defineComponent } from "vue"
import Mask from '@/packages/mask'
export default defineComponent({
    components: {
        Mask
    },
    props: {
        ...Mask.props
    },
    emits: ['update:modelValue'],
    setup(props, {slots,emit}) {
        function onClickMask(e) {
            emit('update:modelValue', !props.modelValue)
        }
        return () => (
            <Mask modelValue={props.modelValue} 
                onUpdate:modelValue={
                ()=>{
                    emit('update:modelValue', !props.modelValue)
                }
            }
                >
                <div>popup里的东西</div>
            </Mask>
        )
    }
})