<template>
  <h1>Tooltip</h1>
  <div>

    <Tooltip title="提示的内容"><Button type="primary">鼠标滑入</Button>
    </Tooltip>

    <!-- <component :is="Tooltip"
      :class="css.item"
      title="一个比较长比较长的提示">详细答复</component> -->
    <Tooltip :title="tip"
      :class="css.item">
      <span :class="css.item">tip</span>
    </Tooltip>
  </div>
  <div style="height:500px;background-color:#f1f1f1;margin-top:10px;
    overflow:auto">
    <div style="height:1000px;padding-top:500px;">

    </div>
  </div>
  <div>
    <!-- <Tooltip content="提示的内容">
      <span>再次提示</span>
    </Tooltip> -->
  </div>
</template>
<script>
import { defineComponent, shallowRef } from "vue"
import Tooltip from "../packages/components/tooltip"
import Button from "../packages/components/button"
export default defineComponent({
  components: { Tooltip, Button },
  setup(props) {
    return {
      Tooltip: shallowRef(Tooltip),
      onClick: (e) => {
        console.log("click 啦")
      },
      tip: <div>这个提示也不短也不短也不短</div>,
    }
  },
})
</script>
<style lang="postcss" module="css">
.item {
  margin: 0 20px;
}
</style>