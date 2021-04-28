/**
 * TODO: 1：layer框体在隐藏时自动调整位置；2：框体位置跟随鼠标进行自动调整
 * 
 */
import { defineComponent,ref,watch,computed,SetupContext, toRef, onUpdated, onRenderTracked, onRenderTriggered} from 'vue'
import usePlacement from '../../../use/usePlacement'
import useParentNode from '../../../use/useParentNode'
import useGlobalZIndex from '../../../use/useGlobalZIndex'
export default defineComponent({
    props: {
        show: Boolean,
        bind: {
            type: String, default: 'v-if'
        },
        trigger: {
            type: String, default: 'click'
        },
        placement: {
            type: String,
            default: 'bottom'
        },
        gap: {
            type: Number,
            default: 8
        },
        zIndex: {type:[Number,String]},//用于层级管理
        toBody: {
            type: Boolean,default: false
        },//是否插入body中
        hasArrow: {
            type: Boolean,default: true
        },//是否有箭头
        
        // 以上参数，主要给使用者用
        // =============================================================
        // 以下参数，主要给组件开发用
        arrowOffsetPercent: {
            type: [Number],default: 0.35
        },
        //传过来的有可能是个vue组件！
        relateElement: {
            type: [HTMLElement,Object],
            default: ()=>document.body
        },
        transitionName: {//使用的过渡名称
            type: String,default: ''
        }
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
        //注意：如果是v-if，是计算不出el元素的真实宽高的。
        //故，在动画钩子里计算，即在beforeEnter里计算
        const {place,width,setPlace} = usePlacement({
            relateElement: re,
            el: root,
            isRelative: !props.toBody,
            gap: props.gap,
            placement: props.placement,
            transitionName: props.transitionName,
            arrowOffsetPercent: props.arrowOffsetPercent
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
            //不能这样用，因为style的变化滞后，而且在getPlacement返回的宽度width
            //之后再次调用setPlace，由于传入的el参数并没有变化，故同样不会计算出
            //正确的layer宽度，
            //解决方法：放入Overlay组件中设置
            // if(props.isEqualWidth) {
            //     o.style['--__layer-min-width'] = `${width.value}px`
            // }
            return o
            
        })

        watch(()=>props.show,v=>{
            if(v) {
                add()
            }
        })
        // watch(width,w=>{
        //     console.log(w)
        //     setPlace()
        // })

        function wrapper(con:any) {
            return (<div {...layerProps.value}
            onClick={e=>{e.stopPropagation()}}>{con}</div>)
        }

        return ()=> wrapper(slots.default?.())
    }
})