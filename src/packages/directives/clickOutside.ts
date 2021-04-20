import {ref,onMounted,Ref, DirectiveBinding} from 'vue'
import useEvent from '../use/useEvent'
interface ClickOutsideOptions {
    exclude: Ref<HTMLElement>[],
    handler:Function
}
const clickout = function() {
    let handlers = []
    const clickOutside = {
        mounted(el:HTMLElement,binding:DirectiveBinding) {
            document.addEventListener('click',(e)=>{
                const tar = e.target as Node
                if(tar===el || el.contains(tar)) {return}
                binding.value()
            })
        },
        updated(el:HTMLElement,binding:DirectiveBinding) {
            // console.log(binding)
        },
    }
    return clickOutside
}
export default clickout()
