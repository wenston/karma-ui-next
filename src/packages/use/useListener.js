import {onMounted, onUnmounted, getCurrentInstance} from 'vue'
export default function useListener(elem, type, listener) {
    
    onMounted(()=>{
        elem.addEventListener(type, listener)
    })

    onUnmounted(()=>{
        elem.removeEventListener(type, listener)
        console.log('解绑')
    })
}