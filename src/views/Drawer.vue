<template>
  <h1>抽屉 Drawer</h1>
  <div>
    <Bouton @click="beforeShow('right')">
      <span style="color:red;">从右侧</span>
      弹出一个抽屉
    </Bouton>
    <Bouton @click="beforeShow('left')">
      <span style="color:green;">从左侧</span>
      弹出一个抽屉
    </Bouton>
    <Bouton @click="beforeShow('top')">
      <span style="color:gold;">从顶部</span>
      弹出一个抽屉
    </Bouton>
    <Bouton @click="beforeShow('bottom')">
      <span style="color:blue;">从底部</span>
      弹出一个抽屉
    </Bouton>
    <Bouton @click="beforeShow('center')">
      <span style="color:blue;">从中间</span>
      弹出一个抽屉
    </Bouton>
    <Drawer v-model:show="show"
      :has-mask="true"
      :placement="placement">
      <template #header="{close}">
        <div style="padding:10px 15px;display:flex;justify-content:space-between;items-align:center;">
          <div>顶部展示什么东西顶部展示什么东西</div>
          <Close @click="close" />
        </div>
      </template>
      <template #footer="{close}">
        <div style="padding: 10px 15px;text-align:right;">
          <Bouton type="danger"
            @click="close">关闭</Bouton>
        </div>
      </template>
      <div style="margin: 20px"
        v-for="n in 10"
        :key="n">
        {{n}}. &nbsp;随便展示个什么东西
        随便展示个什么东西随便展示个什么东西随便展示个什么东西
      </div>
    </Drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue"
import Bouton from "../packages/components/bouton"
import Drawer from "../packages/components/drawer"
import Close from "../packages/components/close"
export default defineComponent({
  components: { Bouton, Drawer, Close },
  setup() {
    const show = ref(false)
    const placement = ref("right")
    return {
      show,
      placement,
      beforeShow(p: any) {
        placement.value = p
        show.value = true
      },
    }
  },
})
</script>