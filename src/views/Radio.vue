<script lang="jsx">
import { defineComponent, ref, onMounted, watch } from "vue";
import Radio from '@/packages/components/radio'

export default defineComponent({
    components: {Radio},
    setup(props, ctx) {
        const currentColor = ref(1)
        const colors = ref(['北京','上海', '广州'])
        watch(currentColor,c=>{
            console.log(c)
        })
        onMounted(()=> {
            setTimeout(() => {
                currentColor.value = 3
                
            }, 1000);
            setTimeout(() => {
                colors.value = ['红','黄','蓝', '赤', '金', '靛']
            }, 500);
        })
        return ()=>(
            <>
                <h1>radio</h1>
                <section>
                    {
                        colors.value.map((color,i)=>{
                            return (
                                <Radio data={i}
                                    v-model={currentColor.value}>{color}</Radio>
                            )
                        })
                    }
                </section>
            </>
        )
    }
})
</script>
