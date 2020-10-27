import {ref, reactive, onMounted, onUnmounted} from 'vue'

export default function useMouse() {
    const client = reactive({x: 0,y : 0})
    const page = reactive({x: 0,y: 0})

    function handler(e) {
        ({clientX:client.x,clientY:client.y,pageX:page.x,pageY:page.y} = e)
    }
    onMounted(()=>{
        document.addEventListener('mousemove', handler)
    })
    onUnmounted(()=>{
        document.removeEventListener('mousemove',handler)
    })
    return {
        client, page
    }
}