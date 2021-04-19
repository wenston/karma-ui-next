<script lang="jsx">
import { ref, defineComponent, computed, useCssModule } from "vue"
import Button from "../packages/components/button"

export default defineComponent({
  components: {
    Button,
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
          <h1>button</h1>
          <div>
            <Button type="danger" class={[css.danger,css.d]} disabled  onClick={e=>{
              console.log('danger button')
            }}>danger button</Button>
            <Button type={buttonType.value}
              onClick={e=>{
                buttonType.value="success"
              }}>primary button</Button>
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
  color: v-bind(color) !important;
}
</style>