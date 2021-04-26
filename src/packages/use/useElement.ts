import { isRef, nextTick, onMounted, ref, Ref } from 'vue'
import {isString, isObject} from '@vue/shared'
import {isDisplayNone, getBoundingClientRect} from '../util'
function isElement(v:any) {
    return v instanceof HTMLElement
}
function isId(str:string) {
    return str.charAt(0) === '#'
}
function isClass(str:string) {
    return str.charAt(0) === '.'
}
function $(str:string) {
    return document.querySelector(str)
}
function isDocumentBody(str:any) {
    return str === 'body' || str === document.body
}
/**
 * 获取真实的元素。并获取元素的宽高（元素display:none时，通过其他方式获取！）
 * @param 
 * @returns 
 */
export default function useElement(v?:any) {
    const el = ref()
    const width = ref(0)
    const height = ref(0)
    function get(val?:any) {
        v = val??v
        let _v = undefined
        let _el = undefined
        if(isRef(v)) {
            _v = v.value
        }
        if(isElement(_v)) {
            _el = _v
        } else if(isDocumentBody(_v)) {
            _el = document.body
        }else if(isString(_v)) {
            if(isId(_v) || isClass(_v)) {
                _el = $(_v)
            }
        } else if(isObject(_v)) {
            if(_v.$el && isElement(_v.$el)) {
                _el = _v.$el
            } 
        }
        el.value = _el
        if(_el) {
            if(isDisplayNone(_el)) {
                const node = _el.cloneNode(true)
                node.style.display = 'block'
                node.style.opacity = 0
                _el.parentNode.appendChild(node)
                const {width:_w,height:_h} = getBoundingClientRect(node)
                // console.log(width,height)
                width.value = _w
                height.value = _h
                _el.parentNode.removeChild(node)
                //需要注意的一点：原样复制出来的也会出现宽度差异！
            }

        }
        return {el:_el,width:width.value,height:height.value}
    }
    onMounted(get)
    return {el,get,width,height}
}