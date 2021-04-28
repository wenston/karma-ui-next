<template>
  <h1>覆盖层</h1>
  <section style="margin: 200px;">
    <Overlay :placement="placement"
      trigger="click"
      v-model:show="showDel">
      <template #title>
        <Bouton>点击展示覆盖层</Bouton>
        <template v-for="item in actions"
          :key="item">
          <a href="javascript:;">{{item}}</a>
          <span>&#12288;</span>
        </template>
      </template>
      <div>确定要删除吗？？？</div>
      <div>删除之后将无法恢复！！！</div>
      <div>
        <Bouton @click="onCancel">取消</Bouton>
        <Bouton type="primary"
          @click="onOk">确定</Bouton>
      </div>
    </Overlay>

  </section>
  <section style="height:300px;margin-left: 150px">
    <table>
      <tr>
        <td></td>
        <td>
          <Overlay placement="top-start">
            <template #title>
              <Bouton>顶部-左侧</Bouton>
            </template>
            <!-- 需要注意的是，如果没有指定宽度，则下边的绝对定位的元素会和单元格宽度差不多宽 -->
            <div style="min-width:150px">
              这是top-start的提示内容，可以很长，也可以很短
            </div>
          </Overlay>
        </td>
        <td>
          <Overlay placement="top">
            <template #title>
              <Bouton>顶部-中间</Bouton>
            </template>
            <p style="min-width:130px">
              top是位于<br />正上方的覆盖层提示
            </p>
          </Overlay>
        </td>
        <td>
          <Overlay placement="top-end">
            <template #title>
              <Bouton>顶部-右侧</Bouton>
            </template>
            <div style="min-width:130px">
              top-end是位于<br />右上方的提示
            </div>
          </Overlay>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>
          <Overlay placement="left-start">
            <template #title>
              <Bouton>左侧-上部</Bouton>
            </template>
            <div style="width:120px">
              提示的内容,如果没有给宽度，就会出现误差，此时需要给div一个宽
            </div>
          </Overlay>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <Overlay placement="right-start">
            <template #title>
              <Bouton>右侧-上部</Bouton>
            </template>
            <div>
              提示的内容
            </div>
          </Overlay>
        </td>
      </tr>
      <tr>
        <td>
          <Overlay placement="left"
            to-body>
            <template #title>
              <Bouton>左侧-中间</Bouton>
            </template>
            <div>
              提示的内容
            </div>
          </Overlay>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <Overlay placement="right">
            <template #title>
              <Bouton>右侧-中间</Bouton>
            </template>
            <div style="width: 129px;line-height:1.9">
              提示的内容，给多一点内容，看看情况
              <br />
              如果没有给出宽度，则会出现定位误差！
              <p style="color: red;">该误差是由于复制节点并计算宽高时的误差导致！</p>
            </div>
          </Overlay>
        </td>
      </tr>
      <tr>
        <td>
          <Overlay placement="left-end">
            <template #title>
              <Bouton>左侧-下部</Bouton>
            </template>
            <div style="width:90px">
              提示的内容呵呵提示的内容呵呵提示的内容呵呵提示的内容呵呵提示的内容呵呵
            </div>
          </Overlay>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <Overlay placement="right-end">
            <template #title>
              <Bouton>右侧-下部</Bouton>
            </template>
            <div style="width:90px">
              提示的内容和什么东西啊
            </div>
          </Overlay>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <Overlay placement="bottom-start">
            <template #title>
              <Bouton>底部-左侧</Bouton>
            </template>
            <div>
              提示的内容
            </div>
          </Overlay>
        </td>
        <td>
          <Overlay placement="bottom">
            <template #title>
              <Bouton>底部-中间</Bouton>
            </template>
            <div style="width:100px">
              提示的内容，给多一点人看看
            </div>
          </Overlay>
        </td>
        <td>
          <Overlay placement="bottom-end">
            <template #title>
              <Bouton>底部-右侧</Bouton>
            </template>
            <div>
              提示的内容
            </div>
          </Overlay>
        </td>
        <td></td>
      </tr>
    </table>
  </section>
</template>
<script>
/**
 * 使用时请注意，如果没有插入到body下，而是靠近插入的，
 * 那么overlay宽高的计算会出现误差！所以最好是给定宽，
 */
import { defineComponent, nextTick, ref, watch } from "vue"
import Overlay from "../packages/components/overlay"
import Bouton from "../packages/components/bouton"
import useToggle from "../packages/use/useToggle"
export default defineComponent({
  components: { Overlay, Bouton },
  setup() {
    const { value: placement, toggle } = useToggle(
      [
        "top",
        "top-start",
        "top-end",
        "right",
        "right-start",
        "right-end",
        "left",
        "left-start",
        "left-end",
        "bottom",
        "bottom-start",
        "bottom-end",
      ],
      "top"
    )
    const showDel = ref(false)
    const showAni = ref(false)
    const actions = ref(["删除"])
    return {
      showDel,
      actions,
      placement,
      showAni,
      toggle() {
        toggle()
        nextTick(() => {
          showDel.value = true
        })
      },
      onCancel() {
        console.log("你点了取消")
        showDel.value = false
      },
      onOk() {
        console.log("你点了确定！！")
        showDel.value = false
      },
      onAdd() {
        actions.value.push(Math.random() * 1000)
      },
      onToggleAni() {
        showAni.value = !showAni.value
      },
    }
  },
})
</script>
<style scoped>
.ani {
  width: 100px;
  height: 100px;
  background-color: #333;
}
</style>
