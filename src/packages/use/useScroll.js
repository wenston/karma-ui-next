import {ref, onUpdated} from 'vue'
import useListener from './useListener'
export default function useScroll(elem = document.documentElement) {
    const top = ref(0)
    const left = ref(0)
    function get() {
        top.value = elem.scrollTop
        left.value=elem.scrollLeft
    }

    useListener(window,'scroll',get)
    useListener(elem,'scroll',get)
    return {top,left}
}