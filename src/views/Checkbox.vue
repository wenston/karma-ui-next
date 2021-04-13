
<script lang="jsx">
import { ref, defineComponent, getCurrentInstance, watch, onMounted } from "vue"
import Button from "../packages/components/button"
import Toggle from "../packages/components/toggle"
import Checkbox from "../packages/components/checkbox"

export default defineComponent({
  components: {
    Toggle,
    Button,
    Checkbox,
  },
  setup(props, ctx) {
    const v = ref(1)
    const ch = ref(true)
    const arr = ref([])
    const baseArea = ref([])

    // watch(arr,_v=>{
    //   console.log(_v)
    // })
    // watch(v,_v=>{
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
        <h1>单选</h1>
        <section>
          <div>
            <Checkbox v-model={v.value}>选择</Checkbox>
          </div>
          <h3>多选</h3>
          <div>
          {
            
            baseArea.value.map(area=>{
              return (
                <Checkbox value={area} v-model={arr.value}>{area}</Checkbox>
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