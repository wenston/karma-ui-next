import { defineComponent } from 'vue'
import Toggle, {ToggleType} from '@/packages/toggle'

export default defineComponent({
    components: {
        Toggle
    },
    props: {
        data: {
            type: Array,
            default: ()=> [0,1]
        },
        value: {
            type: [Number, Boolean, String],
            default: 0
        }
    },
    setup(props, ctx) {
        const slots = {
            default: (e:any) => (
                <span onClick={()=>{onCheck(e)}}>
                    <i class={[
                        'iconfont',
                        e.value.value?'k-icon-checkbox-fill':'k-icon-checkbox'
                    ]}></i>
                    {ctx.slots.default?.()}
                </span>
            )
        }
        function onCheck(e: any) {
            e.toggle()
            console.log(e.value.value)
        }
        return ()=>(
            <Toggle v-slots={slots} data={props.data} value={props.value} />
        )
    }
})