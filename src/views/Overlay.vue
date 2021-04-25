<template>
  <h1>气泡卡</h1>
  <section style="margin: 200px;">
    <Overlay :placement="placement"
      v-model:show="showDel">
      <template #title>
        <Button>点击展示覆盖层</Button>
        <template v-for="item in actions"
          :key="item">
          <a href="javascript:;">{{item}}</a>
          <span>&#12288;</span>
        </template>
      </template>
      <div>确定要删除吗？？？</div>
      <div>删除之后将无法恢复！！！</div>
      <div>
        <Button @click="onCancel">取消</Button>
        <Button type="primary"
          @click="onOk">确定</Button>
      </div>
    </Overlay>
    <div>
      <Button @click="toggle"
        ref="toggleBtn">覆盖层位置切换</Button>
      <Button @click="onAdd">添加一些操作</Button>
    </div>
    <template v-for="item in actions"
      :key="item">
      <a href="javascript:;">{{item}}</a>
      <span>&#12288;</span>
    </template>
  </section>
  <section>
    <!-- <Overlay placement="bottom-start">
      <template #title>没有标签包裹的提示<span>3333333333</span></template>
      <div>
        提示一些东西
      </div>
    </Overlay> -->
  </section>
</template>
<script>
import { defineComponent, nextTick, ref, watch } from "vue"
import Overlay from "../packages/components/overlay"
import Button from "../packages/components/button"
import useToggle from "../packages/use/useToggle"
export default defineComponent({
  components: { Overlay, Button },
  setup() {
    const { value: placement, toggle } = useToggle(
      [
        "top",
        "top-start",
        "top-end",
        "right",
        "right-start",
        "right-end",
        "left",
        "left-start",
        "left-end",
        "bottom",
        "bottom-start",
        "bottom-end",
      ],
      "top"
    )
    const showDel = ref(false)
    const actions = ref(["删除"])
    return {
      showDel,
      actions,
      placement,
      toggle() {
        toggle()
        nextTick(() => {
          showDel.value = true
        })
      },
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
