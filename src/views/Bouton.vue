<script lang="jsx">
import { ref, defineComponent, computed, useCssModule } from "vue"
import Bouton from "../packages/components/bouton"

export default defineComponent({
  components: {
    Bouton,
  },
  data() {
    return {
      color: 'blue'
    }
  },
  setup(props, ctx) {
    const buttonType = ref('primary')
    const css  = useCssModule('css')
    const a = ref("一个按钮")
    const buttonProps = computed(() => ({
      tag: "em",
      "data-index": 3,
      href: "###",
      target: "_blank",
      // 问题：将事件直接写到组件上会出现类型上的错误！为什么？
      onClick: handleClick,
      onMouseover: () => {
        // console.log("mouseover")
      },
      onMousedown: () => {},
    }))
    function handleClick() {
      // console.log(e, 222)
    }
    return () => (
      <>
        <div>
          <h1>bouton 法语：'按钮'</h1>
          <div>
            <Bouton type="danger" class={[css.danger,css.d]} disabled  onClick={e=>{
              console.log('danger bouton')
            }}>danger 按钮</Bouton>
            <Bouton type={buttonType.value}
              onClick={e=>{
                buttonType.value="success"
              }}>primary 按钮</Bouton>
          </div>
        </div>
      </>
    )
  },
})
</script>
<style lang="postcss" module="css">
.danger {
  font-size: 18px;
  border: 3px dashed red;
}
.d {
  /* color: v-bind(color) !important; */
}
</style>