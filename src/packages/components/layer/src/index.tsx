import { defineComponent,Teleport,ref, isRef,watch,computed,onMounted,SetupContext, toRef, toRaw, getCurrentInstance } from 'vue'
import useEvent from '../../../use/useEvent'
import useDelay from '../../../use/useDelay'
import usePlacement from '../../../use/usePlacement'
import useBoundingCientRect from '../../../use/useBoundingClientRect'
import useParentNode from '../../../use/useParentNode'
import {isTopBottom,isLeftRight} from '../../../util'
export default defineComponent({
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
        // showDelay: {type: Number,default: 200},
        // hideDelay: {type: Number,default: 200},
        zIndex: {type:[Number,String],default: 100},//用于层级管理
        toBody: Boolean,//是否插入body中
        hasArrow: {
            type: Boolean,default: true
        },//是否有箭头
    },
    emits: ['update:show'],
    setup(props,{slots,emit,attrs}:SetupContext) {
        const re = toRef(props, 'relateElement')
        const visible=ref(props.show)
        const zi = ref(props.zIndex)
        const root = ref(null)
        //没有用到parentNode，但不要删除，因为给直接父级一个定位了
        if(!props.toBody) {
            useParentNode(re)
        }
        const {getPlace,place,width:relate_elem_w,height:relate_elem_h} = usePlacement({
            relateElement: re,
            el: root,
            isRelative: !props.toBody,
            gap: props.gap,
            placement: props.placement
        })
        const {width:root_w,height:root_h} = useBoundingCientRect(root)


        const layerProps = computed(()=>{
            let sty = attrs.style || {}
            const arrowPosition = isLeftRight(props.placement)?relate_elem_h.value*0.3
                :isTopBottom(props.placement)?relate_elem_w.value*0.3:12
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
                    "--__layer-arrow-position": `30%`
                }

            }
            if(props.bind==='v-show') {
                o['v-show'] = visible.value
            }
            return o
            
        })

        watch(visible,v=>{emit('update:show',v)})
        watch(()=>props.show,v=>{visible.value=v})
        watch(()=>props.zIndex,z=>{zi.value=z})

        function wrapper(con:any) {
            return (
                <div {...layerProps.value} 
                    onClick={e=>{e.stopPropagation()}}>{con}</div>
            )
        }

        return ()=> {
            const main = wrapper(slots.default?.())
            if(props.bind==='v-if') {
                return visible.value?main:null
            }
            return main
        }
    }
})