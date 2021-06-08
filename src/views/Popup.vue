<template>
  <h1>Popup</h1>
  <div style="height:300px;">
    <Bouton @click="showModal">点我也可以展示弹框</Bouton>
  </div>
  <Popup :has-header="true"
    :has-mask="true"
    v-model:show="show"
    :has-footer="true"
    :body-class="css.bd"
    title="这是自定义title"
    :before-cancel="beforeCancel"
    :before-ok="beforeOk"
    @after-cancel="afterCancel"
    @after-ok="afterOk">
    <!-- 推荐这种方式 -->
    <template #trigger>
      <Bouton type="danger"
        style="width:fit-content;margin:auto;display:block;">点击弹框展示某些东西</Bouton>
    </template>
    <div :class="css.body">

      <Tooltip title="给一个提示看看层级"
        toBody>提示</Tooltip>
      <div>这是比较长的内容这是比较长的内容这是比较长的内容<br />这是比较长的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长的内容
      </div>
      <div>这是比较长的内容这是比较长的内容这是比较长的内容<br />这是比较长的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长的内容
      </div>
      <div>这是比较长的内容这是比较长的内容这是比较长的内容<br />这是比较长的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长的内容
      </div>
      <div>这是比较长的内容这是比较长的内容这是比较长的内容<br />这是比较长的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长的内容
      </div>
      <div>这是比较长的内容这是比较长的内容这是比较长的内容<br />这是比较长的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长的内容
      </div>
      <div>这是比较长的内容这是比较长的内容这是比较长的内容<br />这是比较长的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长的内容
      </div>
      <!-- <div>这是比较长的内容这是比较长的内容这是比较长的内容<br />这是比较长的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长的内容
      </div>
      <div>这是比较长的内容这是比较长的内容这是比较长的内容<br />这是比较长的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长的内容
      </div>
      <div>这是比较长的内容这是比较长的内容这是比较长的内容<br />这是比较长的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长的内容
      </div>
      <div>这是比较长的内容这是比较长的内容这是比较长的内容<br />这是比较长的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长的内容
      </div>
      <div>这是比较长的内容这是比较长的内容这是比较长的内容<br />这是比较长的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长的内容
      </div>
      <div>这是比较长的内容这是比较长的内容这是比较长的内容<br />这是比较长的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长<br />的内容
        这是比较长的内容这是比较长的内容这是比较长的内容这是比较长的内容
      </div> -->
      <div>！！！！！！！！！！！！！！</div>
      <div>
        <Bouton>324234234234</Bouton>
      </div>
    </div>
    <template #footer-prepend>
      <Bouton>其他操作</Bouton>
    </template>
    <template #use="{hide,show}">
      <div>
        <div>一种新的使用组件内部方法和数据的方式，比较奇葩</div>
        <Bouton @click="hide">hide</Bouton>
        <Bouton @click="show">show</Bouton>

      </div>
    </template>
  </Popup>
</template>
<script>
// popup组件可以绑定一个show，即：v-model:show。也可以不绑定
// 而由组件内部的状态来控制显隐
import { nextTick, ref } from "vue"
import Popup from "../packages/components/popup"
import Bouton from "../packages/components/bouton"
import Tooltip from "../packages/components/tooltip"
export default {
  components: { Popup, Bouton, Tooltip },
  setup() {
    const show = ref(false)
    return {
      show,
      showModal() {
        show.value = true
      },
      beforeCancel() {
        return new Promise((res, rej) => {
          setTimeout(() => {
            const n = Math.random()
            console.log(n > 0.5)
            if (n > 0.5) {
              res()
            } else {
              rej("呵呵，没有关闭这个弹框")
            }
          }, 100)
        })
      },
      beforeOk() {
        return Promise.resolve()
        // return new Promise((res, rej) => {
        //   setTimeout(() => {
        //     const n = Math.random()
        //     if (n > 0.5) {
        //       res()
        //     } else {
        //       rej("呵呵，没有关闭这个弹框")
        //     }
        //   }, 100)
        // })
      },
      afterCancel() {
        console.log("after cancel")
      },
      afterOk() {
        console.log("afterok")
        // show.value = false
      },
    }
  },
}
</script>
<style lang="postcss" module="css">
.bd {
  background: lightgoldenrodyellow;
  /* overflow: auto; */
}
.body {
}
</style>