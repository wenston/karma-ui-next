<template>
  <div class="home">
    <div>
      <Checkbox v-model="check"
        @change="onChangeAll">{{check?'取消全选':'全选区域'}}</Checkbox>
    </div>
    <Checkbox v-for="item in baseData"
      :key="item"
      :data="item"
      v-model="arr"
      @change="onChangeOne">{{item}}</Checkbox>
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
    const check = ref(0)
    const arr = ref([])
    const baseData = ref(['北京', '广州', '上海'])
    // watch([check, arr], ([c, a]) => {
    //   console.log(c, a)
    // })
    function onChangeAll() {
      if (check.value) {
        arr.value = baseData.value
      } else {
        arr.value = []
      }
    }
    function onChangeOne() {
      check.value = Number(arr.value.length > 0 && arr.value.length === baseData.value.length)
    }
    return {
      check, arr, baseData, onChangeAll, onChangeOne
    }
  }
});
</script>
