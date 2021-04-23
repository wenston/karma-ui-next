import {Ref,ref,reactive} from 'vue'
import {getElementPositionInPage, getOffset,getBoundingClientRect} from '../util/index'
export type Placement = 'top'|'top-start'|'top-end'|'bottom'
|'bottom-start'|'bottom-end'|'left'|'right'

//注意：传入的relateElement有可能是个经过ref过的组件！，
//所以需要拿出组件中的$el
export interface PlacementOptions {
    //要计算位置的那个元素
    relateElement: Ref<HTMLElement>,
    //要设置位置的那个覆盖物元素
    el: Ref<HTMLElement|null>,
    isRelative?: boolean,//是否是相对于有定位的父级计算位置
    gap?: number,
    offset?: number,//偏移，暂没实现
    placement?: Placement|string
}
export default function usePlacement(placementOptions: PlacementOptions = {
    relateElement: ref(document.body),
    el: ref(document.body)
}) {
    const left = ref(0)
    const right = ref(0)
    const width = ref(0)
    const height = ref(0)
    const top =  ref(0)
    const bottom = ref(0)
    const place = reactive({
        left: '0',top:'0',transform:''
    })
    //获取相关元素的位置信息
    function get(relateElem?:HTMLElement|null) {
        let _el = relateElem??placementOptions.relateElement.value
        _el = _el instanceof HTMLElement?_el:(_el as {[key:string]:any}).$el
        if(placementOptions.isRelative) {
            ({left:left.value,top:top.value} = getOffset(_el));
            ({width:width.value,height:height.value}=getBoundingClientRect(_el))
        }
        else {
            const p = getElementPositionInPage(_el)
            left.value = p.left
            right.value = p.right
            width.value = p.width
            height.value=p.height
            top.value=p.top
            bottom.value=p.bottom

        }
    }
    //获取要定位的元素的位置信息
    function getPlace(relateElem?:HTMLElement/*根据此元素计算位置*/,
        el?:HTMLElement/*要设置的那个元素*/,
        placement?:Placement|string/*位置*/) {
            get(relateElem)
            const {gap = 9,offset = 0} = placementOptions
            const _plc = placement??placementOptions.placement??'top'
            // console.log(_plc)
            let l:number = 0,t:number=-99999,trsfm:string = ''
            switch (_plc) {
                case 'top':
                    t = top.value+gap*-1
                    l = left.value+width.value/2
                    trsfm=`translate(-50%,-100%)`
                    break
                case 'top-start':
                    t = top.value+gap*-1
                    l = left.value
                    trsfm = `translate(0,-100%)`
                    break
                case 'top-end':
                    t = top.value+gap*-1
                    l = left.value+width.value
                    trsfm = `translate(-100%,-100%)`
                    break
                case 'bottom':
                    t = top.value+height.value+gap
                    l = left.value+width.value/2
                    trsfm = `translate(-50%,0)`
                    break
                case 'bottom-start':
                    t = top.value+height.value+gap
                    l = left.value
                    trsfm = `translate(0,0)`
                    break
                case 'bottom-end':
                    t = top.value+height.value+gap
                    l = left.value+width.value
                    trsfm = `translate(-100%,0)`
                    break
                case 'left':
                    t = top.value+height.value/2
                    l=left.value+gap*-1
                    trsfm=`translate(-100%,-50%)`
                    break
                case 'right':
                    t = top.value+height.value/2
                    l = left.value+width.value+gap
                    trsfm=`translate(0,-50%)`
                    break
                default:
                    break
            }
        place.left = l+'px'
        place.top = t+'px'
        place.transform = trsfm
    }
    //set是一步到位的设置。每个参数都有效的情况，可以用此方法
    function set(
        relateElem?:HTMLElement/*根据此元素计算位置*/,
        el?:HTMLElement/*要设置的那个元素*/,
        placement?:Placement|string/*位置*/
    ) {
        get(relateElem??placementOptions.el.value)
        getPlace(relateElem,el,placement)
        const _el = el??placementOptions.el.value
        if(_el) {
            _el.style.top = `${place.top}px`
            _el.style.left = `${place.left}px`
            _el.style.transform = place.transform

        }
    }
    return {
        //需要定位的那个元素的位置信息
        place,getPlace,
        //相关元素的信息relateElement
        left,right,width,height,top,bottom,get,set
    }
}