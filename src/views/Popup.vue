<template>
  <h1>Popup</h1>
  <Button @click="show=!show">点击弹框展示某些东西</Button>
  <Popup v-model="show"
    title="这是自定义title">
    <div>展示的内容</div>
    <div>
      <Button>按钮</Button>
    </div>
  </Popup>
</template>
<script>
import { ref } from "vue"
import Popup from "../packages/components/popup"
import Button from "../packages/components/button"
export default {
  components: { Popup, Button },
  setup() {
    const show = ref(false)
    return {
      show,
    }
  },
}
</script>