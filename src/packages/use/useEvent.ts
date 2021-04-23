import {onMounted, onUnmounted, onUpdated, Ref} from 'vue'
export default function useListener(
    elem:Ref, 
    type:string, 
    listener:EventListener) {

    function add() {
        // console.log(elem.value,isProxy(elem))
        if(elem.value.addEventListener) {
            elem.value.addEventListener(type,listener)
        }else{
            console.log(elem.value)
        }
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