import {onMounted, onUpdated, ref} from 'vue'
import useElement from './useElement'
import useEvent from './useEvent'
import {getBoundingClientRect} from '../util'
export default function useBoundingClientRect(elem:any) {
    const W = ref(window)
    const left = ref(0)
    const right = ref(0)
    const width = ref(0)
    const height = ref(0)
    const top =  ref(0)
    const bottom = ref(0)
    const {el} = useElement(elem)
    
    function get() {
        const _el = el.value
        if(_el!==undefined) {
            const r = getBoundingClientRect(_el)
            left.value = r.left
            right.value = r.right
            width.value = r.width
            height.value=r.height
            top.value = r.top
            bottom.value=r.bottom
            // console.log(r)
        }
    }
    onMounted(get)
    onUpdated(get)

    useEvent(W,'scroll',get)
    return {
        left,right,width,height,top,bottom
    }
}