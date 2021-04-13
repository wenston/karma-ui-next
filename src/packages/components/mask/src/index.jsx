import {defineComponent, computed, Teleport, Transition} from 'vue'

export default defineComponent({
    props: {
        to: {//遮罩插入的位置
            type: Element,
            default: document.body
        },
        modelValue: {//控制遮罩的显隐
            type: Boolean,
            default: false
        },
        canCloseByClickSelf: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue'],
    setup(props, {slots, emit}) {
        
        function onClickMask() {
            emit('update:modelValue', false)
        }
        
        return () => {
            const p = {
                class: 'k-mask-body',
            }
            if(props.canCloseByClickSelf) {
                p.onClick = onClickMask
            }
            return (
                <Teleport to={props.to}>
                    <Transition>
                        <div v-show={props.modelValue}
                            {...p}>
                                {slots.default?.()}
                        </div>
                    </Transition>
                </Teleport>
            )
        }
    }
})