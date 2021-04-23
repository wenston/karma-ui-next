<template>
  <h1>气泡卡</h1>
  <section>
    <bubble-card placement="right"
      v-model:show="showDel">
      <template #title>
        <Button>点击展示气泡卡</Button>
        <template v-for="item in actions"
          :key="item">
          <a href="javascript:;">{{item}}</a>
          <span>&#12288;</span>
        </template>
      </template>
      <div>确定要删除吗？？？</div>
      <div>
        <Button @click="onCancel">取消</Button>
        <Button type="primary"
          @click="onOk">确定</Button>
      </div>
    </bubble-card>
    <div>
      <Button @click="onAdd">添加一些操作</Button>
    </div>
    <template v-for="item in actions"
      :key="item">
      <a href="javascript:;">{{item}}</a>
      <span>&#12288;</span>
    </template>
  </section>
  <section>
    <!-- <bubble-card placement="bottom-start">
      <template #title>没有标签包裹的提示<span>3333333333</span></template>
      <div>
        提示一些东西
      </div>
    </bubble-card> -->
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
    const actions = ref(["删除"])
    return {
      showDel,
      actions,
      onCancel() {
        console.log("你点了取消")
        showDel.value = false
      },
      onOk() {
        console.log("你点了确定！！")
        showDel.value = false
      },
      onAdd() {
        actions.value.push(Math.random() * 1000)
      },
    }
  },
})
</script>
