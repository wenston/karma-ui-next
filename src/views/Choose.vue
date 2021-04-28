<template>
  <h3>选择器，类似于select</h3>
  <section>
    <Choose>
      <div>里边的</div>
    </Choose>
  </section>
</template>
<script>
import { defineComponent } from "vue"
import Choose from "../packages/components/choose"
export default defineComponent({
  components: { Choose },
  setup() {},
})
</script>
<style module="css" lang="postcss">
</style>
