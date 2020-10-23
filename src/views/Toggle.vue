
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
    const v = ref(1)
    const ch = ref(true)
    const arr = ref([])
    const baseArea = ref([])

    watch(arr,a=>{
      console.log(a)
    })
    onMounted(()=> {
      setTimeout(()=>{
        baseArea.value = ['红','黄','蓝','白','黑']
      },1000)
      setTimeout(()=>{
        arr.value = ['红','白','黑']
      },1000)
    })
    return () => (
      <>
        <h1>Toggle</h1>
        <section>
          <div>
            <Checkbox value={v.value}
              onUpdate:value={e=>{
                v.value=e
              }}>选择</Checkbox>
          </div>
          <div>
            <label>
              <input type="checkbox" v-model={ch.value} />选择
            </label>
          </div>
          <h3>多选</h3>
          <div>
          {
            baseArea.value.map(area=>{
              return (
                <Checkbox data={area} value={arr.value}
                  onUpdate:value={e=>{
                    arr.value = e
                  }}>{area}</Checkbox>
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