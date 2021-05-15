<template>
  <h1>Notice 通知</h1>
  <div>
    <Bouton type="primary"
      @click="show=true">弹出通知</Bouton>
    <Bouton type="danger"
      @click="show=false">关闭通知</Bouton>
    <Notice v-model:show="show">
      <div :class="css.flex">
        <Icon name="k-icon-warning"
          :class="css.icon" />
        <div :class="css.right">
          你的操作阿斯顿噶撒旦法撒地方<em style="color:lightblue;">萨芬撒放到撒旦法你的操作阿斯顿噶撒
            旦法撒地方萨芬撒放到撒旦法你的操</em>作阿斯顿噶撒旦法撒地方萨芬撒放到撒旦法
        </div>
      </div>
      <div style="display:flex;justify-content:flex-end;">
        <a href="javascript:;"
          style="text-decoration:none;color:#aaa;"
          @click="show=false">我知道了！</a>
      </div>
    </Notice>
  </div>
  <div style="margin-top:20px;">
    <Bouton type="primary"
      @click="show1=true">弹出通知</Bouton>
    <Bouton type="danger"
      @click="show1=false">关闭通知</Bouton>
    <Notice v-model:show="show1">
      <div :class="css.flex">
        <Icon name="k-icon-warning"
          :class="css.icon" />
        <div :class="css.right">
          你的操作阿斯顿噶撒旦
        </div>
      </div>
      <div style="display:flex;justify-content:flex-end;">
        <a href="javascript:;"
          style="text-decoration:none;color:#aaa;"
          @click="show1=false">我知道了！</a>
      </div>
    </Notice>
  </div>
  <div style="margin-top:20px;">
    <Bouton type="warning"
      @click="show2=true">不会自动关闭的通知</Bouton>
    <Bouton type="danger"
      @click="show2=false">关闭通知</Bouton>
    <Notice v-model:show="show2"
      placement="top-end"
      manual>
      <div :class="css.flex">
        <Icon name="k-icon-warning"
          :class="css.icon" />
        <div :class="css.right">
          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        </div>
      </div>
      <div style="display:flex;justify-content:flex-end;">
        <a href="javascript:;"
          style="text-decoration:none;color:#aaa;"
          @click="show2=false">我知道了！</a>
      </div>
    </Notice>
  </div>
  <div style="margin-top:20px">
    <Bouton @click="tell">通知</Bouton>
    <Bouton @click="tell2">通知2</Bouton>
    <Bouton @click="tell3">通知3</Bouton>
  </div>
  <div>
  </div>
</template>
<script lang="tsx">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  useCssModule,
  VNode,
  watch,
} from "vue"
import Bouton from "../packages/components/bouton"
import Notice from "../packages/components/notice"
import Icon from "../packages/components/icon"
export default defineComponent({
  components: { Bouton, Notice, Icon },
  setup() {
    const css = useCssModule("css")
    const ins = getCurrentInstance()
    const show = ref(false)
    const show1 = ref(false)
    const show2 = ref(false)

    return {
      css,
      show,
      show1,
      show2,
      ask() {
        const _ins = ins as any
        console.log(_ins.appContext.config.globalProperties.$notice)
      },
    }
  },
  methods: {
    tell() {
      // this.$notice()
      const that = this as any

      that.$notice({
        content: (
          <div class={this.css.flex}>
            <Icon name="k-icon-warning" />
            这个是动态插入的东西
          </div>
        ),
      })
    },
    tell2() {
      const that = this as any
      that.$notice({
        manual: true,
        content: (
          <div>
            <div class={that.css.flex}>这是另外的通知，不会自动关闭的</div>
            <div>
              <Bouton>我知道了</Bouton>
            </div>
          </div>
        ),
      })
    },
  },
})
</script>
<style module="css" lang="postcss">
.flex {
  display: flex;
  max-width: 250px;
  padding: 15px;
  align-items: cen;

  & .icon {
    font-size: 30px;
    color: var(--k-color-danger);
  }
  & .right {
    margin-left: 10px;
    font-size: 14px;
    color: var(--k-color-3);
    word-break: break-all;
  }
}
</style>