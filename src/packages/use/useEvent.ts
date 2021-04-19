import {onMounted, onUnmounted, onUpdated, Ref, getCurrentInstance} from 'vue'
export default function useListener(
    elem:Ref, 
    type:string, 
    listener:Function) {
    const ins = getCurrentInstance()
    onMounted(()=>{
        // console.assert(elem.value===null, elem.value)
        // console.log(ins)
        // console.log(elem.value)
        elem.value.removeEventListener(type, listener)
        elem.value.addEventListener(type, listener)
    })
    onUpdated(()=>{
        console.log('useEvent updated')
    })

    onUnmounted(()=>{
        if(elem.value) {
            elem.value.removeEventListener(type, listener)
            console.log('解绑')
        }
    })
}