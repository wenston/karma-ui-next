<template>
  <h1>气泡卡</h1>
  <section>
    <bubble-card placement="bottom-start"
      v-model:show="showDel">
      <template #title>
        <a href="javascript:;">删除</a>
        <a href="javascript:;">其他操作</a>
      </template>
      <div>确定要删除吗？？？</div>
      <div>
        <Button @click="onCancel">取消</Button>
        <Button type="primary"
          @click="onOk">确定</Button>
      </div>
    </bubble-card>
  </section>
  <section>
    <bubble-card placement="bottom-start">
      <template #title>没有标签包裹的提示</template>
      <div>
        提示一些东西
      </div>
    </bubble-card>
  </section>
</template>
<script>
import { defineComponent, ref } from "vue"
import BubbleCard from "../packages/components/bubbleCard"
import Button from "../packages/components/button"
export default defineComponent({
  components: { BubbleCard, Button },
  setup() {
    const showDel = ref(false)
    return {
      showDel,
      onCancel() {
        console.log("你点了取消")
        showDel.value = false
      },
      onOk() {
        console.log("你点了确定！！")
        showDel.value = false
      },
    }
  },
})
</script>
