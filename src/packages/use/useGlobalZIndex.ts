/**
 * 功能：全局自增z-index，用以所有弹窗类型的东西
 */
import {onMounted} from 'vue'
import useCount from './useCount'
let __karma_ui_global_z_index = 100
export default function useGlobalZIndex() {
    const {count:zIndex,get,set,add:_add} 
        = useCount({init:__karma_ui_global_z_index})

    function add(delta?:number) {
        _add(delta)
        __karma_ui_global_z_index = get()
    }
    onMounted(add)
    return {zIndex,get,set,add}
}