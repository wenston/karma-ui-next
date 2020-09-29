<script lang="tsx">
import { ref, defineComponent, computed } from "vue"
import Button from "@/packages/button"

export default defineComponent({
  components: {
    Button,
  },
  setup(props, ctx) {
    const a = ref("一个按钮")
    const buttonProps = computed(() => ({
      tag: "div",
      "data-index": 3,
      // 问题：将事件直接写到组件上会出现类型上的错误！为什么？
      onClick: handleClick,
      onMouseover: () => {
        // console.log("mouseover")
      },
      onMousedown: () => {},
    }))
    function handleClick(e: MouseEvent) {
      // console.log(e, 222)
    }
    return () => (
      <div>
        <h1>button</h1>
        <div>
          <Button>{a.value}</Button>
          <Button {...buttonProps.value}>另外一个按钮</Button>
        </div>
      </div>
    )
  },
})
</script>