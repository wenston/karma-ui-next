/**
 * TODO: 1：layer框体在隐藏时自动调整位置；2：框体位置跟随鼠标进行自动调整
 * 
 */
import { defineComponent,ref,watch,computed,SetupContext, toRef, onUpdated, onRenderTracked, onRenderTriggered, onMounted} from 'vue'
import usePlacement from '../../../use/usePlacement'
import useParentNode from '../../../use/useParentNode'
import useGlobalZIndex from '../../../use/useGlobalZIndex'
export default defineComponent({
    props: {
        //控制显隐
        show: Boolean,
        bind: {
            type: String, default: 'v-if'
        },
        //弹框出现的触发方式
        trigger: {
            type: String, default: 'click'
        },
        //弹框出现在relateElement的相对位置
        placement: {
            type: String,
            default: 'bottom'
        },
        //弹框与relateElement的间距
        gap: {
            type: Number,
            default: 8
        },
        //弹框的zIndex
        zIndex: {type:[Number,String]},//用于层级管理
        //弹框是否插入document.body
        toBody: {
            type: Boolean,default: false
        },//是否插入body中
        //弹框是否有箭头
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
        },
        //是否是fixed定位，这种情况下，插入到body，并定位到页面中间
        //此时，placement失效
        isFixed: Boolean
    },
    emits: ['update:show','rect'],
    setup(props,{slots,emit,attrs}:SetupContext) {
        const re = toRef(props, 'relateElement')
        const visible=ref(props.show)
        const root = ref(null)
        const {zIndex,add} = useGlobalZIndex()
        
        if(!props.toBody) {
            useParentNode(re)
        }

        const {place,width,setPlace} = usePlacement({
            relateElement: re,
            el: root,
            isRelative: !props.toBody,
            gap: props.gap,
            placement: props.placement,
            transitionName: props.transitionName,
            arrowOffsetPercent: props.arrowOffsetPercent,
            isFixed: props.isFixed
        })

        const layerProps = computed(()=>{
            let sty = attrs.style || {}
            let o:{[key:string]:any} = {
                ref: root,
                class:[
                    attrs.class,
                    'k-layer',
                    props.isFixed?'k-layer--fixed':`k-layer--${props.placement}`,
                    {'k-layer-has-arrow': props.hasArrow}
                ],
                style: {
                    ...(sty as object),
                    // left: `${place.left}px`,
                    // top: `${place.top}px`,
                    //以下的宽和高的计算，在isFixed 为true的情况下，由于
                    //动画需要用到width和height，故这两个放在这里，将导致
                    //复制出来的节点宽和高失准，故放入usePlacement里边，
                    //采用dom操作的方式来设置，
                    //为了统一，将left和top也放入usePlacement里一起设置
                    // width: props.isFixed?`${place.width}px`:'',
                    // height: props.isFixed?`${place.height}px`:'',
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
        // watch([place,()=>place.left,()=>place.top,()=>place.width,()=>place.height],([
        //     p,l,t,w,h
        // ])=>{
        //     console.log(p)
        // })
        // onMounted(()=>{
        // })

        function wrapper(con:any) {
            return (<div {...layerProps.value}
            onClick={e=>{e.stopPropagation()}}>{con}</div>)
        }

        return ()=> wrapper(slots.default?.())
    }
})