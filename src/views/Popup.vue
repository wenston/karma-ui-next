<template>
  <h1>Popup</h1>
  <Button @click="show=!show">点击弹框展示某些东西</Button>
  <Popup v-model="show"></Popup>
</template>
<script>
import { ref } from 'vue'
import Popup from '@/packages/popup'
import Button from '@/packages/button'
export default {
  components: { Popup, Button },
  setup() {
    const show = ref(false)
    return {
      show
    }
  }
}
</script>