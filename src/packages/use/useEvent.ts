import {onMounted, onUnmounted, onUpdated, Ref} from 'vue'
import useElement from './useElement'
export default function useListener(
    elem:Ref, //elem.value可能是HTMLElement，也可能个组件！
    type:string, 
    listener:EventListener) {
    const {el} = useElement(elem)
    function add() {
        el.value?.addEventListener(type,listener)
    }
    function remove() {
        el.value?.removeEventListener(type,listener)
    }
    onMounted(()=>{
        add()
    })
    onUpdated(()=>{
        remove()
        add()
    })

    onUnmounted(remove)
}