import { isRef, onMounted, ref, Ref } from 'vue'
import {isString, isObject} from '@vue/shared'
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
export default function useElement(v:any):Ref<HTMLElement|undefined> {
    const el = ref()
    function get() {
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
    }
    onMounted(get)
    return el
}