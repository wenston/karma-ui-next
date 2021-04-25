/**
 * TODO: 1：layer框体在隐藏时自动调整位置；2：框体位置跟随鼠标进行自动调整
 * 
 */
import { defineComponent,ref,watch,computed,SetupContext, toRef, Transition, 
    withDirectives, DirectiveArguments, resolveDirective, vShow } from 'vue'
import usePlacement from '../../../use/usePlacement'
import useBoundingCientRect from '../../../use/useBoundingClientRect'
import useParentNode from '../../../use/useParentNode'
import useGlobalZIndex from '../../../use/useGlobalZIndex'
import {isTopBottom,isLeftRight} from '../../../util'
export default defineComponent({
    props: {
        bind: {
            type: String, default: 'v-show'
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
        // showDelay: {type: Number,default: 200},
        // hideDelay: {type: Number,default: 200},
        zIndex: {type:[Number,String]},//用于层级管理
        toBody: Boolean,//是否插入body中
        hasArrow: {
            type: Boolean,default: true
        },//是否有箭头
    },
    emits: ['update:show'],
    setup(props,{slots,emit,attrs}:SetupContext) {
        const re = toRef(props, 'relateElement')
        const visible=ref(props.show)
        const root = ref(null)
        const {zIndex,add} = useGlobalZIndex()
        
        if(!props.toBody) {
            useParentNode(re)
        }
        const {place,width:relate_elem_w,height:relate_elem_h} = usePlacement({
            relateElement: re,
            el: root,
            isRelative: !props.toBody,
            gap: props.gap,
            placement: props.placement
        })
        const {width:root_w,height:root_h} = useBoundingCientRect(root)
        const c_w_h = computed(()=>{
            const min_w = Math.min(root_w.value,relate_elem_w.value)
            const min_h = Math.min(root_h.value, relate_elem_h.value)
            return {min_h,min_w}
        })

        const layerProps = computed(()=>{
            let sty = attrs.style || {}
            const {min_w,min_h} = c_w_h.value
            const arrowPosition = isLeftRight(props.placement)?min_h*0.45
                :isTopBottom(props.placement)?min_w*0.45:12
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
                    // transform: place.transform,//此属性要留给动画，故取消掉！
                    "--__layer-arrow-position": `${arrowPosition}px`,
                    "--__layer-z-index": props.zIndex??zIndex.value
                }

            }
            return o
            
        })

        watch(()=>props.show,v=>{
            if(v) {
                add()
            }
        })

        function wrapper(con:any) {
            const vnode = <div {...layerProps.value} v-show={props.show}
                        onClick={e=>{e.stopPropagation()}}>{con}</div>
            return (
                <Transition name="k-layer-scale">
                    {vnode}
                </Transition>
            )
        }

        return ()=> {
            const main = wrapper(slots.default?.())
            if(props.bind==='v-if') {
                return props.show?main:null
            }
            return main
        }
    }
})