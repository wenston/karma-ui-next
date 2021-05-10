<template>
  <h1>Write 输入框</h1>
  <section>
    <div>

      <Write v-model="t"
        :validate="{when:'change',invalidTip:'至少3位',minlength:3}"
        @input="onInput"
        @change="onChange" />
    </div>
    <!-- <div style="margin-top:20px;">
      <Write />
    </div>
    <div style="margin-top:20px;">
      <Write simple />
    </div>
    <div style="margin-top:20px;">
      <Write>
        <template #prepend>
          <span>用户</span>
        </template>
        <span>搜索一下</span>
      </Write>
    </div> -->
  </section>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue"
import Write from "../packages/components/write"
export default defineComponent({
  components: { Write },
  setup() {
    const t = ref("sdf")

    return {
      t,
      onInput(e: any) {
        // console.log("外部使用write组件时的input事件", e.target.value)
      },
      onChange(e: any) {
        // console.log("外部使用write组件时的change事件", e.target.value)
      },
    }
  },
})
</script>
