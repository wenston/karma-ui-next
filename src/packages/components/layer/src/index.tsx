import { defineComponent,Teleport,ref, isRef,watch,computed,onMounted,SetupContext, toRef, toRaw } from 'vue'
import useEvent from '../../../use/useEvent'
import useDelay from '../../../use/useDelay'
import usePlacement from '../../../use/usePlacement'
import useParentNode from '../../../use/useParentNode'
import {isTopBottom,isLeftRight} from '../../../util'
export default defineComponent({
    inheritAttrs: false,
    props: {
        bind: {
            type: String, default: 'v-if'
        },
        //传过来的有可能是个vue组件！
        relateElement: {
            type: [HTMLElement,Object],
            default: ()=>document.body
        },
        trigger: {
            type: String, default: 'click'
        },
        show: Boolean,
        placement: {
            type: String,
            default: 'bottom'
        },
        gap: {
            type: Number,
            default: 8
        },
        showDelay: {type: Number,default: 200},
        hideDelay: {type: Number,default: 200},
        zIndex: {type:[Number,String],default: 100},//用于层级管理
        toBody: Boolean,//是否插入body中
        hasArrow: {
            type: Boolean,default: true
        },//是否有箭头
    },
    emits: ['update:show'],
    setup(props,{slots,emit,attrs}:SetupContext) {
        function get$el(v:any) {
            // console.log(toRaw(props.relateElement))
            let _el = null
            if(isRef(v)) {
                _el = v.value
            } else if(v instanceof HTMLElement) {
                _el = v
            }
            // console.log(_el)
        }
        const re = ref(props.relateElement)
        get$el(re)
        const visible=ref(props.show)
        const zi = ref(props.zIndex)
        const root = ref(null)
        //没有用到parentNode，但不要删除，因为给直接父级一个定位了
        const {parentNode} = useParentNode(re)
        const {start,stop,clear} = useDelay()
        const {getPlace,place,width:root_width,height:root_height} = usePlacement({
            relateElement: re,
            el: root,
            isRelative: !props.toBody,
            gap: props.gap,
            placement: props.placement
        })

        const layerProps = computed(()=>{
            let sty = attrs.style || {}
            const arrowPosition = isLeftRight(props.placement)?root_height.value*0.3
                :isTopBottom(props.placement)?root_width.value*0.3:12
            let o:{[key:string]:any} = {

                ref: root,
                class:[
                    attrs.class,
                    'k-layer',`k-layer--${props.placement}`,
                    {'k-layer-has-arrow': props.hasArrow}
                ],
                style: {
                    ...(sty as object),
                    left: place.left,
                    top: place.top,
                    transform: place.transform,
                    "--__layer-arrow-position": `${arrowPosition}px`
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
        watch(()=>props.zIndex,z=>{zi.value=z})

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
            return <Teleport to={document.body}>{con}</Teleport>
        }

        return ()=> {
            const vnode = wrapper(slots.default?.())
            const main = props.toBody?teleport(vnode):vnode
            if(props.bind==='v-if') {
                return visible.value?main:null
            }
            return main
        }
    }
})