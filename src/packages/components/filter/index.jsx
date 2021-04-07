import {defineComponent } from 'vue'
import useMouse from '@/packages/use/useMouse'

export default defineComponent({
    setup(props,ctx) {
        const {client} = useMouse()
        return ()=> {
            const p = {
                class: 'k-filter',
                style: {
                    top: client.y + 'px',
                    left: client.x + 'px',
                    transform: `translate(-50%,-50%)`
                }
            }
            return (
                <div {...p}></div>
            )
        }
    }
})