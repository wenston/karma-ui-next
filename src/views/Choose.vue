<template>
  <h3>选择器，类似于select</h3>
  <section>
    <Choose>
      <Item v-for="item in supplier"
        :key="item.Id">{{item.Name}}</Item>
    </Choose>
  </section>
</template>
<script>
import { defineComponent, ref } from "vue"
import Choose from "../packages/components/choose"
import Item from "../packages/components/item"
import supplierData from "@/assets/test-data/supplier"
export default defineComponent({
  components: { Choose, Item },
  setup() {
    return {
      supplier: ref(supplierData),
    }
  },
})
</script>
<style module="css" lang="postcss">
</style>
