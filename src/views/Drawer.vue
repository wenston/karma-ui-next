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
  <div style="margin: 15px 0;">
    以下是在抽屉基础上，创建的Confirm组件
    <div>
      <Bouton @click="onConfirm">Confirm对话框</Bouton>
    </div>
  </div>
  <div style="margin: 15px 0;">

    <div>
      <Bouton @click="onShowOtherConfirm">另外一个Confirm对话框</Bouton>
    </div>
  </div>
</template>
<script lang="tsx">
import { defineComponent, getCurrentInstance, ref } from "vue"
import Bouton from "../packages/components/bouton"
import Drawer from "../packages/components/drawer"
import Close from "../packages/components/close"
import Confirm from "../packages/components/confirm"
export default defineComponent({
  components: { Bouton, Drawer, Close },
  setup() {
    const ins = getCurrentInstance()
    const show = ref(false)
    const placement = ref("right")
    return {
      show,
      placement,
      beforeShow(p: any) {
        placement.value = p
        show.value = true
      },
      onConfirm() {
        const confirm = ins?.appContext.config.globalProperties.$confirm
        confirm({
          content: "确认一下",
          ok: () => {
            console.log("ok")
          },
        })
      },
      onShowOtherConfirm() {
        Confirm.open({
          title: "这个是一个确认提示框",
          okText: "好吧",
          cancelText: "我再想想...",
          content(close: any) {
            return (
              <>
                <div>这是另外的一个确认框，引用方法有不同</div>
                <div style="margin-top:10px;">
                  <a href="javascript:;" onClick={close}>
                    好的，我知道了，关闭吧
                  </a>
                </div>
              </>
            )
          },
          ok: () => {},
        })
      },
    }
  },
})
</script>