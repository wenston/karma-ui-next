import {ref} from 'vue'
interface CountType {
    init: number
    step?: number
}
export default function useCount({
    init,step
}:CountType = {init:0,step:1}) {
    const count = ref(init)
    const _step = ref(step||1)
    function add(delta?:number) {
        count.value+=delta??_step.value
    }
    function reset(num?:number) {
        count.value=num??0
    }
    function set(num:number) {
        count.value = num
    }
    function get() {
        return count.value
    }

    return {
        count, add, reset, get, set
    }
}