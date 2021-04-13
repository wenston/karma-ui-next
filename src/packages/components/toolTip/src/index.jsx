import {defineComponent, ref, Teleport, onMounted} from 'vue'
export default defineComponent({
    props: {
        title: [String,Object],
        //插入在dom中的位置
        to: {
            type: Element,
            default: document.body
        }
    },
    setup(props,{slots}) {
        const show = ref(false)
        onMounted(()=>{
            const elem = slots.default()[0]
            if(elem) {
                console.log(slots.default)
                // elem.el.addEventListener('mouseenter',e=>{
                //     show.value = true
                // })
                // elem.el.addEventListener('mouseleave',(e)=>{
                //     show.value = false
                // })
            }
        })
        return () => (
            <>
                {slots.default?.()}
                {show.value?(
                <Teleport to={props.to}>
                    <div>{props.title}</div>
                </Teleport>
                ):null}
            </>
        )
    }
})