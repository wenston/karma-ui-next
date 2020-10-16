
<script lang="tsx">
import { ref, defineComponent, computed } from "vue"
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
    const setTrue = (set: any, v: any) => ({
      onClick: () => {
        set({ item: v })
      },
    })
    const checkboxSlots = {
      default: (e: any) => (
        <>
          <i
            class={[
              "iconfont",
              e.value.value === false
                ? "k-icon-checkbox"
                : "k-icon-checkbox-fill",
            ]}
            onClick={e.toggle}
          ></i>
        </>
      ),
    }
    const radioSlots = {
      default: (e: any) => (
        <>
          {e.data.value.map((d: any, i: number) => {
            return (
              <label
                onClick={() => {
                  e.set({ index: i })
                }}
              >
                选择{d}&#8194;
                <i
                  class={[
                    "iconfont",
                    e.value.value === d ? "k-icon-radio-fill" : "k-icon-radio",
                  ]}
                ></i>
                &#12288;&#12288;
              </label>
            )
          })}
        </>
      ),
    }
    return () => (
      <div>
        <h1>Toggle</h1>
        <div>
          实现checkbox：
          <Toggle v-slots={checkboxSlots} data={[false, true]}></Toggle>
        </div>
        <div>
          实现radio：
          <Toggle v-slots={radioSlots} data={[0, 1, 2, 3]}></Toggle>
        </div>

        <h1>Checkbox</h1>
        <div>
          <Checkbox value={1}>选择</Checkbox>
          <Checkbox value={1}>选择另外的</Checkbox>
          <Checkbox data={[false, true]} value={false}>
            有一个
          </Checkbox>
        </div>
      </div>
    )
  },
})
</script>