<template>
  <div class="home">
    <Checkbox v-for="item in baseData"
      :key="item"
      :data="item"
      :value="arr"
      @update:value="onUpdate">{{item}}</Checkbox>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import Checkbox from "@/packages/checkbox"

export default defineComponent({
  name: "Home",
  components: {
    Checkbox
  },
  setup() {
    let arr = ref([])
    let baseData = ref(['北京', '广州', '上海'])
    watch(arr, a => {
      console.log(a)
    })
    function onUpdate(e) {
      console.log(e)
      arr.value = e;
    }
    return {
      arr, baseData, onUpdate
    }
  }
});
</script>
