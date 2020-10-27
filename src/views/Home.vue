<template>
  <div class="home">
    <div class="fixed">
      {{client.x}},{{client.y}},{{page.x}},{{page.y}}

    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import Checkbox from "@/packages/checkbox"
import useMouse from '@/use/useMouse'

export default defineComponent({
  name: "Home",
  components: {
    Checkbox
  },
  setup() {
    const check = ref(0)
    const { client, page } = useMouse()

    return {
      check, client, page
    }
  }
});
</script>
<style scoped>
.home {
  & .fixed {
    bottom: 20px;
    left: 20px;
    position: fixed;
  }
}
</style>
