import {reactive, onMounted, onUnmounted} from 'vue'
import useListener from './useListener'

export default function useMouse() {
    const client = reactive({x: 0,y : 0})
    const page = reactive({x: 0,y: 0})

    function handler(e) {
        ({clientX:client.x,clientY:client.y,pageX:page.x,pageY:page.y} = e)
    }
    useListener(document,'mousemove', handler)
    return {
        client, page
    }
}