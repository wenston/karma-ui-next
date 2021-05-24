import {defineComponent} from 'vue'

export default defineComponent({
    setup(props,{emit,attrs,slots}) {


        return ()=> {

            return (
                <ul>
                    <li>1</li>
                </ul>
            )
        }
    }
})