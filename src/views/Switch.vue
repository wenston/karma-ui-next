<template>
  <h1>Switch 开关</h1>
  <section>
    <Switch v-model="s"
      @change="onChange" />
    <Switch v-model="s"
      style="width:60px;height:30px;"
      @change="onChange">
      <template #on>
        <Icon name="k-icon-checkbox-fill" />
      </template>
      <template #off>
        <Icon name="k-icon-checkbox" />
      </template>
    </Switch>
    <Switch v-model="s1"
      :style="{width:'260px',height:'145px'}"
      :data="[false,true]"
      @change="onChange1">
      <template #on>
        <span style="font-size:50px">开&#8194;</span>
      </template>
      <template #off>
        <span style="font-size:50px">&#8194;关</span>
      </template>
    </Switch>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue"
import Switch from "../packages/components/switch"
import Icon from "../packages/components/icon"
export default defineComponent({
  components: { Switch, Icon },
  setup(props, ctx) {
    const s = ref(0)
    const s1 = ref(true)
    watch(s, (v) => {
      console.log(v)
    })
    return {
      s,
      s1,
      onChange: (v: any) => {
        console.log(v)
      },
      onChange1: (v: any) => {
        console.log(v)
      },
    }
  },
})
</script>
