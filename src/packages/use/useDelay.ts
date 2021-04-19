import {ref,onUnmounted} from 'vue'
export default function useDelay(delay = 200) {
    const timer = ref<any>(null)
    function start(startFn:Function,startDelay?:number) {
        clearTimeout(timer.value)
        timer.value = setTimeout(startFn,startDelay??delay)
    }
    function stop(stopFn:Function,stopDelay?:number) {
        clearTimeout(timer.value)
        timer.value = setTimeout(stopFn,stopDelay??delay)
    }
    onUnmounted(()=>{
        clearTimeout(timer.value)
        timer.value=null
    })
    return {timer, start, stop}
}