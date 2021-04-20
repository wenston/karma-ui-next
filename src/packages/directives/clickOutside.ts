import {ref,Ref, DirectiveBinding} from 'vue'
import useEvent from '../use/useEvent'
interface ClickOutsideOptions {
    exclude: Ref<HTMLElement>[],
    fn:Function
}



export default {
    mounted(el:HTMLElement,binding:DirectiveBinding) {
        console.log(binding)
    },
    
}