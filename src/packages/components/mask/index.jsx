import {defineComponent, ref, Teleport, Transition} from 'vue'

export default defineComponent({
    props: {
        to: {//遮罩插入的位置
            type: Element,
            default: document.body
        },
        modelValue: {//控制遮罩的显隐
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue'],
    setup(props, {slots, emit}) {
        // const show = ref(false)
        function onClickMask() {
            emit('update:modelValue', !props.modelValue)
        }
        return () => (
            <Teleport to={props.to}>
                <Transition>
                    {/* {
                        props.modelValue && (
                            <div class="k-mask-body"
                                onClick={onClickMask}>
                                {slots.default?.()}
                            </div>
                        )
                    } */}
                    <div v-show={props.modelValue}
                        class="k-mask-body"
                        onClick={onClickMask}>
                            {slots.default?.()}
                    </div>
                    
                </Transition>
            </Teleport>
        )
    }
})