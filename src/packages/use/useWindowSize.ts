import {ref} from 'vue'
import useEvent from './useEvent'
export default function useWindowSize() {
    const width = ref(window.innerWidth)
    const height = ref(window.innerHeight)

    useEvent(ref(window),'resize',()=> {
        width.value = window.innerWidth
        height.value = window.innerHeight
    })
    
    return {width,height}
}