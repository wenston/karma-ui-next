import {defineComponent, computed} from 'vue'
import {hasUnit} from '@/packages/util'
export default defineComponent({
    props: {
        name: String,
        size: [Number, String]
    },
    setup(props,{emit, slots}) {
        const fontSize = computed(()=>{
            hasUnit(props.size)?props.size:props.size + 'px'
        })
        return ()=> (
            <i class={["iconfont", props.name]} 
            style={{fontSize:fontSize.value}}></i>
        )
    }
})