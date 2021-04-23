<template>
  <h1>Tooltip</h1>
  <div>

    <Tooltip title="提示的内容"
      v-model:show="show"
      placement="bottom-start"
      trigger="click">
      <Button>点击</Button>
    </Tooltip>

    <Tooltip :class="css.item"
      placement="top-start"
      title="一个比较长比较长的提示">
      top-start </Tooltip>
    <Tooltip :class="css.item"
      placement="top-end"
      title="位置在top-end">top-end</Tooltip>
    <Tooltip :title="tip"
      :class="css.item">
      <span :class="css.item">tip</span>
    </Tooltip>
    <Tooltip title="one tip"
      bind="v-if"
      placement="bottom">下方出现提示</Tooltip>
    <Tooltip title="在左侧出现一个提示"
      bind="v-if"
      placement="left"
      :class="css.item">
      <div style="background-color:green;">左侧</div>
    </Tooltip>
    <Tooltip title="bs"
      bind="v-if"
      placement="bottom-start"
      :class="css.item">
      <div style="background-color:green;">bottom-start</div>
    </Tooltip>
    <Tooltip title="右下方出现一个小提示"
      bind="v-if"
      placement="bottom-end"
      :class="css.item">
      <div style="background-color:green;">bottom-end</div>
    </Tooltip>
    <Tooltip title="right"
      bind="v-if"
      placement="right"
      :class="css.item">
      <div style="background-color:green;">右边出现一个提示</div>
    </Tooltip>
  </div>
  <div style="height:500px;background-color:#f1f1f1;margin-top:10px;
    overflow:auto">
    <div style="height:1000px;padding-top:500px;">
      <Tooltip title="right"
        bind="v-if"
        placement="right"
        :class="css.item">
        <div style="background-color:green;">右边出现一个提示</div>
      </Tooltip>
    </div>
  </div>
  <div>
    <!-- <Tooltip content="提示的内容">
      <span>再次提示</span>
    </Tooltip> -->
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import Tooltip from "../packages/components/tooltip"
import Button from "../packages/components/button"
export default defineComponent({
  components: { Tooltip, Button },
  setup(props) {
    const show = ref(false)
    return {
      // Tooltip: shallowRef(Tooltip),
      onClick: (e) => {
        console.log("click 啦")
      },
      tip: <div>这个提示也不短也不短也不短</div>,
      show,
    }
  },
})
</script>
<style lang="postcss" module="css">
.item {
  margin: 0 20px;
}
</style>