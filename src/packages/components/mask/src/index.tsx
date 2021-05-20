import {defineComponent, computed,ref, Teleport, Transition, withDirectives, vShow, watch, h, onMounted} from 'vue'
import useGlobalZIndex from '../../../use/useGlobalZIndex'
export default defineComponent({
    props: {
        bind: {type: String,default:'v-if'},
        zIndex: [Number,String],
        show: {type: Boolean,default:false},
        canCloseByClickSelf: {
            type: Boolean,default: false
        },
        to: {
            type:HTMLElement,default: ()=>document.body
        }
    },
    emits: ['update:show','get-ref'],
    setup(props, {slots, emit}) {
        const root = ref(null)
        const {zIndex} = useGlobalZIndex()
        const visible = ref(props.show)
        watch(()=>props.show,v=>{visible.value=v})
        watch(visible,v=>{emit('update:show',v)})
        onMounted(()=>{emit('get-ref',root)})
        const maskProps = computed(()=>{
            const o:any = {
                ref: root,
                class: 'k-mask',
                style: {
                    zIndex: props.zIndex??zIndex.value
                },
                onClick:(e:MouseEvent)=>{
                    if(e.target===root.value && props.canCloseByClickSelf) {
                        visible.value=false
                    }
                }
            }
            return o
        })
        return ()=> {
            let main:any = (
                <div {...maskProps.value}>{slots.default?.()}</div>
            )
            if(props.bind==='v-if') {
                main = visible.value && main
            }else if(props.bind==='v-show') {
                main = withDirectives(main,[[vShow,visible.value]])
            }
            return (
                <Teleport to={props.to}>
                    <Transition name="k-mask-fade">
                        {main}
                    </Transition>
                </Teleport>
            )
        }
        // return ()=> {
        //     const mask = h('div',{
        //         ref: root,
        //         class: 'k-mask',
        //         style: {
        //             'z-index': props.zIndex??zIndex.value
        //         },
        //         onClick:(e:MouseEvent)=>{
        //             if(e.target===root.value && props.canCloseByClickSelf) {
        //                 visible.value=false
        //             }
        //         }
        //     }, slots.default?.())
        //     let _main = null
        //     if(props.bind==='v-if') {
        //         _main = (
        //             h(Teleport,{to:document.body},[
        //                 h(Transition,{name:'k-mask-fade'},{
        //                     default:()=>visible.value&&mask
        //                 })
        //             ])
        //         )
        //     } else if(props.bind==='v-show') {
        //         _main = (
        //             h(Teleport,{to:document.body},withDirectives(mask,[[vShow,visible.value]]))
        //         )
        //     }
        //     return _main
        // }
    }
})