import {onMounted, onUnmounted, onUpdated, Ref} from 'vue'
export default function useListener(
    elem:Ref, 
    type:string, 
    listener:EventListener) {

    function add() {
        elem.value.addEventListener(type,listener)
        // console.log('上榜')
    }
    function remove() {
        if(elem.value) {
            elem.value.removeEventListener(type, listener)
            // console.log('解绑')
        }
    }
    onMounted(add)
    onUpdated(()=>{
        // console.log('useEvent updated')
        remove()
        add()
    })

    onUnmounted(remove)
}