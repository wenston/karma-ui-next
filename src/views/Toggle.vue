
<script lang="jsx">
import { ref, defineComponent, computed, reactive, watch, onMounted } from "vue"
import Button from "@/packages/button"
import Toggle from "@/packages/toggle"
import Checkbox from "@/packages/checkbox"

export default defineComponent({
  components: {
    Toggle,
    Button,
    Checkbox,
  },
  setup(props, ctx) {
    const v = ref(0)
    const ch = ref(true)
    const arr = ref([])
    const baseArea = ref([])

    // watch(arr,_v=>{
    //   console.log(_v)
    // })
    onMounted(()=> {
      setTimeout(()=>{
        baseArea.value = ['红','黄','蓝','白','黑']
      },300)
      setTimeout(()=>{
        arr.value = ['红','白','黑']
      },600)
    })
    return () => (
      <>
        <h1>Toggle</h1>
        <section>
          <div>
            <Checkbox v-model={v.value}>选择</Checkbox>
          </div>
          <h3>多选</h3>
          <div>
          {
            baseArea.value.map(area=>{
              return (
                <Checkbox data={area} v-model={arr.value}>{area}</Checkbox>
              )
            })
          }
          </div>
        </section>
      </>
    )
  },
})
</script>