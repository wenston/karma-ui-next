import { isRef, SetupContext } from "vue"
import { isObject, isString } from "@vue/shared"
export const transitionState: string[] = [
  "enter-from",
  "enter-active",
  "leave-to",
  "leave-active"
]
export const topBottom: string[] = [
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end"
]
export const leftRight: string[] = [
  "left",
  "left-start",
  "left-end",
  "right",
  "right-start",
  "right-end"
]
function isElement(v: any) {
  return v instanceof HTMLElement
}
function isId(str: string) {
  return str.charAt(0) === "#"
}
function isClass(str: string) {
  return str.charAt(0) === "."
}
function $(str: string) {
  return document.querySelector(str)
}
function isDocumentBody(str: any) {
  return str === "body" || str === document.body
}

export function isInvalidValue(v: any) {
  return v === "" || v === undefined || v === null || isNaN(v)
}

export function getUnit(value: string | number) {
  const unit = String(value)
    .replace(/[\-\.\d]/gi, "")
    .toLowerCase()
  return unit
}

export function hasUnit(value: string | number) {
  const units = ["px", "em", "pt", "vh", "vw", "rem"]
  // console.log(units.indexOf(unit) > -1)
  const unit = getUnit(value)
  // return units.indexOf(getUnit(value)) > -1
  return unit !== ""
}

export function toPX(el: HTMLElement, value: string | number): number {
  const v = parseFloat(value + "")
  const unit = getUnit(value)
  const fontSize = parseInt(getStyle(el, "font-size"))
  if (unit !== "") {
    if (unit === "em") {
      return v * fontSize
    }
  }
  return 0
}

export function getStyle(elem: HTMLElement, prop: any) {
  return window.getComputedStyle(elem, null)[prop]
}

export function isDisplayNone(elem: HTMLElement) {
  return getStyle(elem, "display") === "none"
}

export function getPageScroll() {
  return {
    left: window.pageXOffset,
    top: window.pageYOffset
  }
}

export function getBoundingClientRect(elem: any) {
  const _el = getElement(elem)
  return _el.getBoundingClientRect()
}

export function getOffset(elem: HTMLElement) {
  return {
    left: elem.offsetLeft,
    top: elem.offsetTop
  }
}

export function getScrollbarWidth() {
  let noScroll,
    scroll,
    oDiv = document.createElement("DIV")
  oDiv.style.cssText =
    "position:fixed; top:-1000px; width:100px; height:100px; overflow:hidden;"
  noScroll = document.body.appendChild(oDiv).clientWidth
  oDiv.style.overflowY = "scroll"
  scroll = oDiv.clientWidth
  document.body.removeChild(oDiv)
  return noScroll - scroll
}

export function getElement(el: any) {
  const v = el
  let _v = undefined
  let _el = undefined
  if (isRef(v)) {
    _v = v.value
  } else if (isElement(v)) {
    _v = v
  }
  if (_v === window) {
    _el = _v
  } else if (isElement(_v)) {
    _el = _v
  } else if (isDocumentBody(_v)) {
    _el = document.body
  } else if (isString(_v)) {
    if (isId(_v) || isClass(_v)) {
      _el = $(_v)
    }
  } else if (isObject(_v)) {
    if (_v.$el && isElement(_v.$el)) {
      _el = _v.$el
    }
  }
  return _el
}

export function getElementPositionInPage(elem: HTMLElement) {
  const { left, top } = getPageScroll()
  const rect = getBoundingClientRect(elem)
  // const marginLeft = getStyle(elem,'margin-left')
  // const marginTop=getStyle(elem,'margin-top')
  // console.log(marginLeft,marginTop)
  return {
    left: left + rect.left,
    top: top + rect.top,
    right: rect.right + left,
    bottom: rect.bottom + top,
    width: rect.width,
    height: rect.height
  }
}

export function isTopBottom(p: string) {
  return topBottom.some((_p) => _p === p)
}
export function isLeftRight(p: string) {
  return leftRight.some((_p) => _p === p)
}

export function getInvisibleElementSize(
  el: HTMLElement,
  transitionName?: string
) {
  let width: number = 0,
    height: number = 0
  function _clone_calc_size(_el: HTMLElement) {
    const node: any = _el.cloneNode(true)
    if (transitionName) {
      removeClass(
        node,
        transitionState.map((s) => transitionName + "-" + s)
      )
    }
    // console.log(node)
    node.style.display = "block"
    node.style.opacity = 0
    _el.parentNode?.appendChild(node)
    const { width: _w, height: _h } = getBoundingClientRect(node)
    // console.log(_w,_h)
    width = _w
    height = _h
    _el.parentNode?.removeChild(node)
  }
  _clone_calc_size(el)
  return { width, height }
}

export function hasClass(el: any, className: string): boolean {
  const _el = getElement(el)
  if (!className) {
    return false
  }
  return _el.classList.contains(className)
}

export function addClass(el: any, className: string | string[]): void {
  const _el = getElement(el)
  const cls: string[] = isString(className) ? [className] : className
  _el.classList.add(...cls)
}

export function removeClass(el: any, className: string | string[]): void {
  const _el = getElement(el)
  const cls: string[] = isString(className) ? [className] : className
  _el.classList.remove(...cls)
}

//attrs是context里的attrs
export function filterListeners(attrs: any) {
  let o: any = {}
  if (attrs) {
    for (const k in attrs) {
      const _on = k.slice(0, 2).toLowerCase()
      if (_on === "on") {
        o[k] = attrs[k]
      }
    }
  }
  return o
}
