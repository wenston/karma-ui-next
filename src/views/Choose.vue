<template>
  <h3>选择器，类似于select</h3>
  <section>
    <Choose v-model="val">
      <Item v-for="item in supplier"
        :key="item.Id"
        :disabled="item.Name.indexOf('小米')>-1"
        :label="item.Name"
        :value="item.Id">{{item.Name}}</Item>
      <template #use="{text}">
        <div>{{text}}</div>
      </template>
    </Choose>
    <Choose v-model="val1">
      <Item v-for="item in supplier"
        :key="item.Id"
        :disabled="item.Name.indexOf('北京')>-1"
        :label="item.Name"
        :value="item.Id">{{item.Name}}</Item>
      <template #use="{text}">
        <div>{{text}}</div>
      </template>
    </Choose>
  </section>
</template>
<script>
import { defineComponent, onMounted, ref, watch } from "vue"
import Choose from "../packages/components/choose"
import Item from "../packages/components/item"
import supplierData from "@/assets/test-data/supplier"
export default defineComponent({
  components: { Choose, Item },
  setup() {
    const val = ref(0)
    const val1 = ref(0)
    const supplier = ref([])
    watch(val, (v) => {
      console.log(v)
    })
    onMounted(() => {
      setTimeout(() => {
        supplier.value = supplierData
      }, 500)
    })
    return {
      supplier,
      val,
      val1,
    }
  },
})
</script>
<style module="css" lang="postcss">
</style>
