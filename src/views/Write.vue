<template>
  <h1>Write 输入框</h1>
  <section>
    <div>

      <Write v-model="t"
        @input="onInput"
        @change="onChange" />
    </div>
    <!-- <div style="margin-top:10px;">
      <Write type="number"></Write>
    </div>
    <div style="margin-top:10px;">
      <input type="number" />
    </div> -->
    <div style="margin-top:10px;">
      <Write>
        <template #prepend>
          <span>用户</span>
        </template>
        <span>搜索一下</span>
      </Write>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue"
import Write from "../packages/components/write"
export default defineComponent({
  components: { Write },
  setup() {
    const t = ref("sdf")
    return {
      t,
      onInput(e: any) {
        console.log(e.target.value)
      },
      onChange(e: any) {
        console.log(e.target.value)
      },
    }
  },
})
</script>
