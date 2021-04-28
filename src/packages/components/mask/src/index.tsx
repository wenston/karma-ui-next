import {defineComponent, computed, Teleport, Transition, withDirectives, vShow, watch} from 'vue'
import useGlobalZIndex from '../../../use/useGlobalZIndex'
export default defineComponent({
    props: {
        bind: {
            type: String,
            default: 'v-if'
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

        const {zIndex, add} = useGlobalZIndex()
        watch(()=>props.modelValue,v=>{
            if(v) {add()}
        })
        function onClickMask() {
            emit('update:modelValue', false)
        }

        const maskProps = computed(()=>{
            const o:any = {
                class: 'k-mask',
                style: {
                    "--__mask-z-index": zIndex.value??props.zIndex
                }
            }
            if(props.canCloseByClickSelf) {
                o.onClick = onClickMask
            }
            return o
        })
        function wrapper(con:any) {
            return (
                <Teleport to={document.body}>
                    <Transition name="k-mask-fade">
                        {con}
                    </Transition>
                </Teleport>
            )
        }
        return () => {
            let con:any = (
                <div {...maskProps.value}>
                    {slots.default?.()}
                </div>
            )
            if(props.bind==='v-show') {
                con = withDirectives(con,[[vShow, props.modelValue]])
            } else if(props.bind==='v-if') {
                con = props.modelValue && con
            }
            
            return wrapper(con)
        }
    }
})