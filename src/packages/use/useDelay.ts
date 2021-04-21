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
    function clear() {
        clearTimeout(timer.value)
        timer.value=null
    }
    onUnmounted(clear)
    return {timer, start, stop, clear}
}