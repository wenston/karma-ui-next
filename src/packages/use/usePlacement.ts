import { Ref, ref, reactive, onMounted, onUpdated } from "vue"
import useElement from "./useElement"
import useEvent from "./useEvent"
import useWindowSize from "./useWindowSize"
import {
  getElementPositionInPage,
  getOffset,
  getBoundingClientRect,
  isTopBottom,
  isLeftRight
} from "../util/index"
export type Placement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end"
  | "center"

const ARROW_OFFSET_PERCENT = 0.35
const ARROW_OFFSET = 3.5
const W = ref(window)
// 获取相关元素（relateElement）的boundingClientRect，并设置el在页面中相对于相关元素的位置
//注意：传入的relateElement有可能是个经过ref过的组件！，
//所以需要拿出组件中的$el
export interface PlacementOptions {
  //要计算位置的那个元素
  relateElement: Ref<HTMLElement>
  //要设置位置的那个覆盖物元素
  el: Ref<HTMLElement | null>
  isRelative?: boolean //是否是相对于有定位的父级计算位置
  gap?: number
  offset?: number //偏移，暂没实现
  placement?: Placement | string
  transitionName?: string
  arrowOffsetPercent?: number
  //是否是fixed定位，此时定位到页面中间
  isFixed?: boolean
}
export default function usePlacement(
  placementOptions: PlacementOptions = {
    relateElement: ref(document.body),
    el: ref(document.body)
  }
) {
  const { get: getElement, getInvisibleElementSize } = useElement(
    placementOptions.el
  )
  const percent = ref(
    placementOptions.arrowOffsetPercent ?? ARROW_OFFSET_PERCENT
  )
  const elem = ref(placementOptions.el)
  const rElem = ref(placementOptions.relateElement)
  const left = ref(0)
  const right = ref(0)
  const width = ref(0)
  const height = ref(0)
  const top = ref(0)
  const bottom = ref(0)
  const { width: ww, height: wh } = useWindowSize()
  const place = reactive({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    right: 0,
    arrowPosition: 12,
    transformOrigin: ""
  })
  //获取相关元素的位置信息
  function getRelatePos(relateElem?: HTMLElement | null) {
    // let _el = relateElem??placementOptions.relateElement.value
    // _el = _el instanceof HTMLElement?_el:(_el as {[key:string]:any}).$el
    const _el = getElement(relateElem ?? placementOptions.relateElement)
    if (placementOptions.isFixed) {
      //因为在overlay组件里计算过了，所以这里不需要再算
    } else {
      if (placementOptions.isRelative) {
        ;({ left: left.value, top: top.value } = getOffset(_el))
        ;({ width: width.value, height: height.value } = getBoundingClientRect(
          _el
        ))
      } else {
        const p = getElementPositionInPage(_el)
        left.value = p.left
        right.value = p.right
        width.value = p.width
        height.value = p.height
        top.value = p.top
        bottom.value = p.bottom
        // console.log(p.right)
      }
    }
    if (_el !== document.body) {
      rElem.value = _el
    }
  }
  //当el状态是display:none或者在dom还不存在时，
  //通过简单的节点复制和Transtion的动画钩子beforeEnter都是获取不到宽高信息的！
  //所以此时要知道该动画使用了那个class，以便在节点复制的时候，去掉对应的class
  //然后再计算宽和高，就可以得到了！
  function getElPosition(el?: HTMLElement) {
    const _el = getElement(el ?? placementOptions.el)
    const { width, height } = getInvisibleElementSize(
      _el,
      placementOptions.transitionName
    )

    if (_el) {
      const p = getBoundingClientRect(_el)
      place.left = p.left
      place.top = p.top
      //通过getElement获取的宽高，是元素的真实宽高，就算是display:none了，也可以获取到哦
      place.width = width
      place.height = height
      place.right = p.right
      elem.value = _el
      // console.log('覆盖层宽和高',width,height)
    } else {
      console.warn("参数有问题？")
    }
  }
  //获取两个元素的位置信息
  function getPlace(
    relateElem?: HTMLElement /*根据此元素计算位置*/,
    el?: HTMLElement /*要设置的那个元素*/,
    placement?: Placement | string /*位置*/
  ) {
    getRelatePos(relateElem)
    getElPosition(el)
  }
  //set是一步到位的设置。每个参数都有效的情况，可以用此方法
  function setPlace(
    relateElem?: HTMLElement /*根据此元素计算位置*/,
    el?: HTMLElement /*要设置的那个元素*/,
    placement?: Placement | string /*位置*/
  ) {
    getPlace(relateElem, el, placement)
    if (placementOptions.isFixed) {
      const { gap = 15, offset = 0 } = placementOptions
      const _plc = (placement ?? placementOptions.placement) || "top-end"
      const _el: any = elem.value
      switch (_plc) {
        case "center":
          //在页面中fixed定位，并在中间，故要定位的元素的top和left是要相对于视窗大小计算的
          const pw = place.width
          const ph = place.height
          place.left = (ww.value - pw) / 2
          place.top = (wh.value - ph) / 2

          // console.log(l,t,_el)
          if (_el && _el.style) {
            _el.style.width = `${place.width}px`
            //onMounted后赋值height，是为了方便动画
            //页面调整resize后，高度去掉，是为了方便高度自适应
            _el.style.height = `${place.height}px`
            _el.style.top = `${place.top}px`
            _el.style.left = `${place.left}px`
          }
          break
        case "top-end":
          if (_el && _el.style) {
            _el.style.top = `${gap}px`
            _el.style.right = `${gap}px`
          }
          break
        case "bottom-end":
          if (_el && _el.style) {
            _el.style.bottom = `${gap}px`
            _el.style.right = `${gap}px`
          }
          break
        default:
          break
      }

      // console.log(place)
    } else {
      const { gap = 9, offset = 0 } = placementOptions
      const _plc = placement ?? placementOptions.placement ?? "top"
      let l: number = 0,
        t: number = -99999
      const offset_left = (width.value - place.width) / 2
      const offset_height = (height.value - place.height) / 2
      const min_width = Math.min(width.value, place.width)
      const min_height = Math.min(height.value, place.height)
      let arrow_position: number = isLeftRight(_plc)
        ? min_height * 0.5
        : isTopBottom(_plc)
        ? min_width * 0.5
        : 12
      let t_o = ""
      switch (_plc) {
        case "top":
          t = top.value - place.height + -1 * gap
          l = left.value + offset_left
          arrow_position = place.width / 2 - ARROW_OFFSET
          t_o = `${arrow_position}px bottom`
          break
        case "top-start":
          t = top.value - place.height + gap * -1
          l = left.value
          arrow_position = min_width * percent.value - ARROW_OFFSET
          t_o = `${arrow_position}px bottom`
          break
        case "top-end":
          t = top.value - place.height + gap * -1
          l = left.value + width.value - place.width
          arrow_position =
            place.width - min_width * percent.value - ARROW_OFFSET
          t_o = `${arrow_position}px bottom`
          break
        case "bottom":
          t = top.value + height.value + gap
          l = left.value + offset_left
          arrow_position = place.width / 2 - ARROW_OFFSET
          t_o = `${arrow_position}px top`
          break
        case "bottom-start":
          t = top.value + height.value + gap
          l = left.value
          arrow_position = min_width * percent.value - ARROW_OFFSET
          t_o = `${arrow_position}px top`
          break
        case "bottom-end":
          t = top.value + height.value + gap
          l = left.value + offset_left
          arrow_position =
            place.width - min_width * percent.value - ARROW_OFFSET
          t_o = `${arrow_position}px top`
          break
        case "left":
          t = top.value + offset_height
          l = left.value - place.width + gap * -1
          arrow_position = min_height * percent.value - ARROW_OFFSET
          t_o = `right ${arrow_position}px`
          break
        case "left-start":
          t = top.value
          l = left.value - place.width + gap * -1
          arrow_position = min_height * percent.value - ARROW_OFFSET
          t_o = `right ${arrow_position}px`
          break
        case "left-end":
          t = top.value + height.value - place.height
          l = left.value - place.width + gap * -1
          arrow_position =
            place.height - min_height * percent.value - ARROW_OFFSET
          t_o = `right ${arrow_position}px`
          break
        case "right":
          t = top.value + offset_height
          l = left.value + width.value + gap
          arrow_position = place.height / 2
          t_o = `left ${arrow_position}px`
          break
        case "right-start":
          t = top.value
          // l = left.value + place.width + gap
          l = left.value + width.value + gap
          arrow_position = min_height * percent.value - ARROW_OFFSET
          t_o = `left ${arrow_position}px`
          break
        case "right-end":
          t = top.value + height.value - place.height
          l = left.value + width.value + gap
          arrow_position =
            place.height - min_height * percent.value - ARROW_OFFSET
          t_o = `left ${arrow_position}px`
          break
        default:
          break
      }
      place.left = l
      place.top = t
      place.arrowPosition = arrow_position
      place.transformOrigin = t_o
      const _el: any = elem.value
      if (_el && _el.style) {
        _el.style.left = `${l}px`
        _el.style.top = `${t}px`
      }
    }
  }

  function handleWindowResize() {
    //当窗口大小调整的时候，只需要重新调整左右宽度，不需要重新计算宽和高
    // 特别是layer有max-width和max-height时，重新复制节点计算宽高，
    // 将会造成宽和高一直变小的情况
    const _el: any = elem.value
    if (_el && _el.style) {
      _el.style.removeProperty("height")
      // const p = getBoundingClientRect(_el)
      getElPosition()
      // place.width = p.width
      // place.height = p.height
      let l = (ww.value - place.width) / 2
      let t = (wh.value - place.height) / 2

      l = l < 15 ? 15 : l
      t = t < 15 ? 15 : t
      _el.style.left = `${l}px`
      _el.style.top = `${t}px`
      _el.style.height = `${place.height}px`
    }
  }

  onMounted(() => {
    setPlace()
  })
  onUpdated(setPlace)
  if (placementOptions.isFixed) {
    if (placementOptions.placement === "center")
      useEvent(W, "resize", handleWindowResize)
  }
  return {
    //需要定位的那个元素的位置信息
    place,
    getPlace,
    //相关元素的信息relateElement
    left,
    right,
    width,
    height,
    top,
    bottom,
    setPlace
  }
}
