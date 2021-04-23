import {defineComponent, computed, Teleport, Transition} from 'vue'
import useGlobalZIndex from '../../../use/useGlobalZIndex'
export default defineComponent({
    props: {
        bind: {
            type: String,
            default: 'v-if'
        },
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
        },
        zIndex: [Number,String]
    },
    emits: ['update:modelValue'],
    setup(props, {slots, emit}) {

        const {zIndex} = useGlobalZIndex()
        
        function onClickMask() {
            emit('update:modelValue', false)
        }

        const maskProps = computed(()=>{
            const o = {
                class: 'k-mask',
                style: {
                    "--__mask-z-index": props.zIndex??zIndex.value
                }
            }
            if(props.canCloseByClickSelf) {
                o.onClick = onClickMask
            }
            if(props.bind==='v-show') {
                o['v-show'] = props.modelValue
            }
            return o
        })

        return () => {
            const body = (
                <div {...maskProps.value}>
                    {slots.default?.()}
                </div>
            )
            return (
                <Teleport to={props.to}>
                    <Transition>
                        {
                            props.bind==='v-if'?(props.modelValue&&body):body
                        }
                    </Transition>
                </Teleport>
            )
        }
    }
})