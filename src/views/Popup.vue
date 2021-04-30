<template>
  <h1>Popup</h1>
  <div style="height:300px;"></div>
  <Popup :has-header="true"
    :has-footer="true"
    :body-class="css.bd"
    title="这是自定义title"
    :before-cancel="beforeCancel"
    @after-cancel="afterCancel"
    @after-ok="afterOk">
    <template #title>
      <Bouton type="danger">点击弹框展示某些东西</Bouton>
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
      <div>！！！！！！！！！！！！！！</div>
      <div>
        <Bouton>324234234234</Bouton>
      </div>
    </div>
    <template #footer-prepend>
      <div>ddd</div>
    </template>
    <!-- <template #footer>
      <Bouton @click="afterOk">其他按钮</Bouton>
    </template> -->

  </Popup>
</template>
<script>
import { ref } from "vue"
import Popup from "../packages/components/popup"
import Bouton from "../packages/components/bouton"
import Tooltip from "../packages/components/tooltip"
export default {
  components: { Popup, Bouton, Tooltip },
  setup() {
    const show = ref(false)
    return {
      show,
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
      afterCancel() {
        console.log("after cancel")
      },
      afterOk() {
        console.log("afterok")
        show.value = false
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