<template>
  <h1>Tooltip</h1>
  <div>

    <Tooltip title="提示的内容"
      placement="bottom-start"
      v-model:show="show"
      trigger="click">
      <Bouton>点击</Bouton>
    </Tooltip>

    <Tooltip placement="top-start"
      trigger="click"
      title="一个比较长比较长的提示">
      top-start </Tooltip>
    <Tooltip placement="top-end"
      title="位置在top-end">top-end</Tooltip>
    <Tooltip :title="tip">
      <span :class="css.item">tip</span>
    </Tooltip>
    <Tooltip title="one tip"
      bind="v-if"
      placement="bottom">下方出现提示</Tooltip>
    <Tooltip title="在左侧出现一个提示"
      bind="v-if"
      placement="left"
      :class="css.item">
      <span style="background-color:green;">左侧</span>
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
        placement="bottom-start"
        :toBody="false"
        :class="css.item">
        <div style="background-color:green;">下方出现一个提示</div>
      </Tooltip>
    </div>
  </div>
  <div>
    <Tooltip title="提示的内容"
      toBody
      placement="top-start">
      <span>再次提示</span>
    </Tooltip>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import Tooltip from "../packages/components/tooltip"
import Bouton from "../packages/components/bouton"
export default defineComponent({
  components: { Tooltip, Bouton },
  setup(props) {
    const show = ref(true)
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