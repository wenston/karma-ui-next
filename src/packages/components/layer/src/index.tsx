/**
 * TODO: 1：layer框体在隐藏时自动调整位置；2：框体位置跟随鼠标进行自动调整
 * 
 */
import { defineComponent,ref,watch,computed,SetupContext, toRef, Transition, 
     vShow, nextTick } from 'vue'
import usePlacement from '../../../use/usePlacement'
import useBoundingCientRect from '../../../use/useBoundingClientRect'
import useParentNode from '../../../use/useParentNode'
import useGlobalZIndex from '../../../use/useGlobalZIndex'
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
        toBody: {
            type: Boolean,default: false
        },//是否插入body中
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
        const {place,setPlace} = usePlacement({
            relateElement: re,
            el: root,
            isRelative: !props.toBody,
            gap: props.gap,
            placement: props.placement
        })

        const layerProps = computed(()=>{
            let sty = attrs.style || {}
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
                    "--__layer-arrow-position": `${place.arrowPosition}px`,
                    "--__layer-z-index": props.zIndex??zIndex.value,
                    "--__layer-transform-origin": `${place.transformOrigin}`
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
            if(props.bind==='v-show') {
                return (
                    <Transition name="k-layer-scale">
                        <div {...layerProps.value} 
                            v-show={props.show}
                            onClick={e=>{e.stopPropagation()}}>{con}</div>
                    </Transition>
                )
            }
            return (
                <Transition name="k-layer-scale">
                    {props.show && <div {...layerProps.value}
                            onClick={e=>{e.stopPropagation()}}>{con}</div>}
                </Transition>
            )
        }

        return ()=> wrapper(slots.default?.())
    }
})