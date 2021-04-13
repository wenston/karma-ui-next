<script lang="jsx">
import { ref, defineComponent, computed } from "vue"
import Button from "@/packages/components/button"
// import Filter from "@/packages/components/filter"
import Title from "@/packages/components/title"

export default defineComponent({
  components: {
    Button,
    // Filter,
    Title
  },
  setup(props, ctx) {
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
            <Title>
              <Button type="primary">{a.value}</Button>
            </Title>
            <Button {...buttonProps.value}>另外一个按钮</Button>
            <Button type="danger">danger</Button>
            <Button type="success">success</Button>
            <Button type="warning">warning</Button>
          </div>
        </div>
      </>
    )
  },
})
</script>