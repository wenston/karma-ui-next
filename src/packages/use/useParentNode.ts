import {onMounted, onUpdated, ref, Ref, isRef, watch} from 'vue'
import {isString} from '@vue/shared'
import {getStyle} from '../util'
// type ElementOptions = Ref<HTMLElement|string> | ComputedRef<HTMLElement|string> 
function isId(str:string) {
    return str.charAt(0) === '#'
}
function isClass(str:string) {
    return str.charAt(0) === '.'
}
function $(str:string) {
    return document.querySelector(str)
}
function isDocumentBody(str:string|HTMLElement) {
    return str === 'body' || str === document.body
}
/**
 * 给定一个元素，返回此元素的直接父级
 * 如果给的是id或者class或者body，则用dom操作document.querySelector选出来并返回
 * @param 
 * @returns 
 */
export default function useParentNode(
    elem:any
){
    const parentNode = ref<HTMLElement>()
    function getPNode() {
        let _node = null
        const _el = isRef(elem)?elem.value:elem
        if(isDocumentBody(_el)) {
            _node = document.body
        }else{
            if(isString(_el)) {
                if(isId(_el)||isClass(_el)) {
                    _node = $(_el)
                }else{
                    console.warn('useParentNode：请传入#Id或者.class，不支持html标签')
                }
            }else{
                _node = _el.parentNode
            }
            if(_node) {
                const position  = getStyle(_node, 'position')
                if(position==='static') {
                    _node.style.position = 'relative'
                }
            }
        }
        // console.log(_node)
        parentNode.value = _node
        // console.log(parentNode)
    }
    onMounted(getPNode)
    // watch(p)

    return {
        parentNode
    }
}