<template>
  <h1>Number 数字输入框</h1>
  <div>
    <Number v-model="n"
      placeholder="数值"
      @change="onChange" />
  </div>
  <div>
    <input type="number" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue"
import Number from "../packages/components/number"
export default defineComponent({
  components: { Number },
  setup() {
    const n = ref(10)
    watch(n, (v) => {
      console.log("改变：", v)
    })
    return {
      n,
      onChange: (e: any) => {
        console.log(e)
      },
    }
  },
})
</script>