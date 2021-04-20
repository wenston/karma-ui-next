import {ref,Ref} from 'vue'
import useEvent from './useEvent'
interface ClickOutsideOptions {
    exclude: Ref<HTMLElement>[],
    fn:Function
}

export default function useClickOutside(options:ClickOutsideOptions) {

}