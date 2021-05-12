<template>
  <h1>Number 数字输入框</h1>
  <div>
    <Number v-model="n"
      :max="100"
      :min="5"
      placeholder="数值"
      @change="onChange" />
  </div>
  <div>
    <!-- :validate="{
        when: 'change',
        reg: /^[0-9]+(.[0-9]{2})?$/,
        invalidTip: '请保留两位小数'
      }" -->
    <Number v-model="n2"
      :validate="{
        when: 'change',
        reg: /^[0-9]+(.[0-9]{2})?$/,
        invalidTip: '请保留两位小数'
      }"
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
    const n2 = ref()
    watch(n, (v) => {
      console.log("改变：", v)
    })
    return {
      n,
      n2,
      onChange: (e: any) => {
        console.log(e)
      },
    }
  },
})
</script>