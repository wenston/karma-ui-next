import {defineComponent, computed,ref, Teleport, Transition, withDirectives, vShow, watch, h, onMounted} from 'vue'
import useGlobalZIndex from '../../../use/useGlobalZIndex'
export default defineComponent({
    props: {
        bind: {type: String,default:'v-if'},
        zIndex: [Number,String],
        show: {type: Boolean,default:false}
    },
    emits: ['update:show','get-ref'],
    setup(props, {slots, emit}) {
        const root = ref(null)
        const {zIndex} = useGlobalZIndex()
        const visible = ref(props.show)
        watch(()=>props.show,v=>{visible.value=v})
        watch(visible,v=>{emit('update:show',v)})
        onMounted(()=>{emit('get-ref',root)})
        return ()=> {
            const mask = h('div',{
                ref: root,
                class: 'k-mask',
                style: {
                    'z-index': props.zIndex??zIndex.value
                }
            }, slots.default?.())
            let _main = null
            if(props.bind==='v-if') {
                _main = (
                    h(Teleport,{to:document.body},[
                        h(Transition,{name:'k-mask-fade'},{
                            default:()=>visible.value&&mask
                        })
                    ])
                )
            } else if(props.bind==='v-show') {
                _main = (
                    h(Teleport,{to:document.body},withDirectives(mask,[[vShow,visible.value]]))
                )
            }
            return _main
        }
    }
})