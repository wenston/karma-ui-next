import { defineComponent,Teleport,ref,watch,computed,onMounted,SetupContext } from 'vue'
import useEvent from '../../../use/useEvent'
import useDelay from '../../../use/useDelay'
import usePlacement from '../../../use/usePlacement'
import useParentNode from '../../../use/useParentNode'
export default defineComponent({
    inheritAttrs: false,
    props: {
        bind: {
            type: String, default: 'v-if'
        },
        //
        relateElement: {
            type: [Element,Object],
            default: ()=>document.body
        },
        trigger: {
            type: String, default: 'click'
        },
        show: Boolean,
        to: [HTMLElement,String],//插入位置，没有的话，默认是挨着relateElement
        placement: {
            type: String,
            default: 'bottom'
        },
        gap: {
            type: Number,
            default: 9
        },
        showDelay: {type: Number,default: 200},
        hideDelay: {type: Number,default: 200}
    },
    emits: ['update:show'],
    setup(props,{slots,emit,attrs}:SetupContext) {
        const re = ref(props.relateElement)
        const visible=ref(props.show)
        const root = ref(null)
        const {parentNode} = useParentNode(props.to||re)
        const {start,stop,clear} = useDelay()
        const {getPlace,place} = usePlacement({
            relateElement: re,
            el: root,
            gap: props.gap,
            placement: props.placement
        })

        const layerProps = computed(()=>{
            let sty = attrs.style || {}

            let o:{[key:string]:any} = {

                ref: root,
                class:[
                    attrs.class,
                    'k-layer',`k-layer--${props.placement}`
                ],
                style: {
                    ...(sty as object),
                    left: place.left,
                    top: place.top,
                    transform: place.transform
                }

            }
            if(props.bind==='v-show') {
                o['v-show'] = visible.value
            }
            return o
            
        })

        if(props.trigger === 'hover') {
            useEvent(re, 'mouseenter', ()=>{
                start(()=>{
                    getPlace()
                    visible.value=true
                }, props.showDelay)
                
            })
            useEvent(re, 'mouseleave',()=>{
                stop(()=>{
                    visible.value=false
                }, props.hideDelay)
            })

        } else if(props.trigger==='click') {
            useEvent(re,'click',()=>{
                getPlace()
                visible.value = !visible.value
            })
        }

        watch(visible,v=>{emit('update:show',v)})
        watch(()=>props.show,v=>{visible.value=v})

        onMounted(()=>{
            if(props.show) {
                getPlace()
            }
        })
        function wrapper(con:any) {
            const t = props.trigger
            if(t==='hover') {
                return (
                    <div {...layerProps.value}
                        onMouseenter={clear}
                        onMouseleave={(e=>{stop(()=>visible.value=false)})}>{con}</div>
                )
            } else if(props.trigger==='click') {
                return (
                    <div {...layerProps.value} onClick={e=>{e.stopImmediatePropagation()}}>{con}</div>
                )
            }
        }
        function teleport(con:any){
            return <Teleport to={parentNode.value}>{con}</Teleport>
        }

        return ()=> {
            const vnode = teleport(wrapper(slots.default?.()))
            if(props.bind==='v-if') {
                return visible.value?vnode:null
            }
            return vnode
        }
    }
})