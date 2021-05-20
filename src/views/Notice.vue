<template>
  <h1>Notice 通知</h1>
  <div style="margin-top:20px">
    <Bouton @click="tell">通知</Bouton>
    <Bouton @click="tell2">通知2</Bouton>
    <Bouton @click="tell3">通知3</Bouton>
    <Bouton @click="ask">通知4 从setup里用</Bouton>
  </div>
  <div style="margin-top:20px">
    <Bouton @click="tell4">局部引入Notice</Bouton>
    <Bouton @click="tell5">从外部关闭的通知，而且点击多次只会有一个通知！</Bouton>
    <Overlay style="background-color:var(--k-color-danger);color:white "
      placement="top-start">
      <template #trigger>
        <Bouton @click="onClose"
          type="warning">我是专门用来关闭一个通知的</Bouton>
      </template>
      <div>
        还没有弹出<span style="color:currentColor">通知</span>,不用管了啊！
        其实，这个按钮是可以隐藏的，可以等通知出现之后再展现
      </div>
    </Overlay>
  </div>
  <div style="margin:30px 0;padding-top:30px;border-top:1px solid var(--k-color-line)">
    <div>
      <Bouton @click="onShowFromTop">从中间上部弹出</Bouton>
    </div>
  </div>
  <div style="margin:30px 0;padding-top:30px;border-top:1px solid var(--k-color-line);">
    <div>
      <Bouton @click="onShowFromBottom">从中间<b style="color: var(--k-color-danger)">底部</b>弹出</Bouton>
    </div>
  </div>
</template>
<script lang="tsx">
import {
  App,
  defineComponent,
  getCurrentInstance,
  ref,
  useCssModule,
  VNode,
  watch,
} from "vue"
import Bouton from "../packages/components/bouton"
import Icon from "../packages/components/icon"
import Notice from "../packages/components/notice"
import Overlay from "../packages/components/overlay"

export default defineComponent({
  components: { Bouton, Icon, Overlay },
  setup() {
    let notice5: any
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
        const open = _ins.appContext.config.globalProperties.$notice
        open({
          content: (close: any) => {
            return (
              <div class={css.flex}>
                <div>
                  <Icon name="k-icon-square" size="12" />
                  &#12288;随便弹出一些什么东西
                </div>
                <div>
                  <Icon name="k-icon-square" size="12" />
                  &#12288;随便弹出一些什么东西
                </div>
                <div>
                  <Icon name="k-icon-square" size="12" />
                  &#12288;随便弹出一些什么东西
                </div>
                <div>
                  <Icon name="k-icon-square" size="12" />
                  &#12288;随便弹出一些什么东西
                </div>
                <a href="javascript:;" onClick={close}>
                  关闭
                </a>
              </div>
            )
          },
        })
      },

      onClose() {
        if (notice5) {
          Notice.close(notice5)
          // notice5 = undefined
        }
      },
      tell4() {
        Notice.open({
          manual: true,
          content: (close: any) => {
            return (
              <div class={css.flex}>
                <div>这个是局部引入的组件</div>
                <br />
                <div>根据需要给出相应的通知信息，而且是不会自动关闭的哟</div>
                <div>
                  <a href="javascript:;" onClick={close}>
                    关闭
                  </a>
                </div>
              </div>
            )
          },
        })
      },
      tell5() {
        if (!notice5) {
          notice5 = Notice.open({
            manual: true,
            content: () => {
              return (
                <div class={css.flex}>
                  <div style="color:red">这也是局部引入的组件</div>
                  <br />
                  <div>这个通知是可以从外部关闭的！</div>
                </div>
              )
            },
            afterClose() {
              notice5 = undefined
            },
          })
        }
      },
      onShowFromTop() {
        Notice.open({
          placement: "top",
          manual: false,
          content: () => {
            return (
              <div style="padding: 15px 25px;background-color: rgba(0,0,0,.7);color:white;">
                <Icon
                  name="k-icon-warning"
                  style="color:var(--k-color-danger);"
                />
                <div>从中间弹出，并展示个什么什么东西</div>
              </div>
            )
          },
        })
      },
      onShowFromBottom() {
        Notice.open({
          placement: "bottom",
          manual: false,
          content: () => {
            return (
              <div style="padding: 15px 25px;background-color: var(--k-color-success);color:white;border-radius:var(--k-radius);">
                <div>
                  从中间底部弹出，并展示个什么什么东西，有点长长长
                  长长长长长长长长长长长长长长长长长
                  长长长长长长长长长长长长长长长长长
                  长长长长长长长长长长长长长长长长长
                  长长长长长长长长长长长长长长长长长
                  长长长长长长长长长长长长长长长长长
                </div>
              </div>
            )
          },
        })
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
        content: (destroy: () => void) => {
          const ps: any = {
            onClick: destroy,
          }
          return (
            <div>
              <div class={that.css.flex}>这是另外的通知，不会自动关闭的</div>
              <div style="padding: 10px;text-align:right;">
                <Bouton {...ps}>I know it!</Bouton>
              </div>
            </div>
          )
        },
      })
    },
    tell3() {
      const that = this as any
      that.$notice({
        content: <div>使用者根据需求填充内容</div>,
      })
    },
  },
})
</script>
<style module="css" lang="postcss">
.flex {
  max-width: 250px;
  padding: 15px;

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