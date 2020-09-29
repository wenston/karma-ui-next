
<script lang="tsx">
import { ref, defineComponent, computed } from "vue"
import Button from "@/packages/button"
//ToggleType飘红，为什么？
import Toggle, { ToggleType } from "@/packages/toggle"
export default defineComponent({
  components: {
    Toggle,
    Button,
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
      </div>
    )
  },
})
</script>