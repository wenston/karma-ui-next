<template>

  <section>
    <details :class="css.details">
      <summary>
        Layer 组件说明
      </summary>
      <dl :class="css.box">
        <dd>最基础的一个页面弹层，其他很多组件，都用到了它</dd>
        <dd>overlay组件</dd>
        <dd>tooltip组件</dd>

      </dl>
    </details>
    <div>
      其他说明
    </div>
  </section>
</template>
<script>
import { defineComponent } from "vue"
import Layer from "../packages/components/layer"
export default defineComponent({
  components: { Layer },
  setup() {},
})
</script>
<style module="css" lang="postcss">
.details {
  & ::-webkit-details-marker {
    color: red;
  }
  & .box {
    height: 0;
    overflow: hidden;
    transition: height 0.35s;
  }
  &[open] .box {
    height: auto;
  }
}
</style>
