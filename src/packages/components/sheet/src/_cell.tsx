import {
  ref,
  computed,
  defineComponent,
  inject,
  ComputedRef,
  reactive,
  onMounted,
  onUpdated,
  nextTick
} from "vue"
import Icon from '../../icon'
export default defineComponent({
    components: {Icon},
  props: {
    isInThead: Boolean,
    sorter: {type:[Boolean,Number],default: undefined },
    tag: { type: String, default: "td" },
    align: { type: String }, //center
    isNarrow: Boolean,
    notBold: Boolean,
    resizeWidth: Boolean,
    colIndex: Number,
    col:{type:Object}
  },
  setup(props, { slots }) {
    const tdRoot = ref(null)
    const start = reactive({ x: 0, y: 0 })
    const end = reactive({ x: 0, y: 0 })
    const beforeResize = inject("beforeResize") as Function
    const inResizing = inject("inResizing") as Function
    const afterResize = inject("afterResize") as Function
    const currentSorter = inject('currentSorter') as any
    const updateSorter = inject('updateSorter') as Function
    const cellProps = computed(() => {
      // console.log(leftFixed.value,props.colIndex)
      let o: any = {
        ref: tdRoot,
        "data-col-index": props.colIndex,
        class: [
          "k-cell",
          {
            "k-cell--center": props.align === "center",
            "k-cell--right": props.align === "right",
            "k-cell--narrow": props.isNarrow,
            "k-cell--not-bold": props.notBold,
            "k-cursor-pointer": props.sorter !==undefined
          }
        ]
      }
      if(props.sorter!==undefined) {
          o.onClick=toSort
      }
      return o
    })
    function toResize(e: MouseEvent) {
      end.x = e.clientX
      inResizing(props.colIndex, end.x - start.x)
    }
    function handleMouseup(e: MouseEvent) {
      afterResize(props.colIndex, e.clientX - start.x)
      start.x = 0
      end.x = 0
      document.removeEventListener("mousemove", toResize)
      document.removeEventListener("mouseup", handleMouseup)
    }
    function toSort() {
        updateSorter(props.col?.field)
    }
    onMounted(() => {})

    return () => {
      let line: any = null
      let sorter: any = null
      if (props.resizeWidth) {
        const lineProps = {
          class: "k-cell-resize-line",
          onMousedown: (e: MouseEvent) => {
            start.x = e.clientX
            beforeResize(tdRoot.value)

            document.addEventListener("mousemove", toResize)
            document.addEventListener("mouseup", handleMouseup)
          }
        }
        line = <span {...lineProps}></span>
      }
      if(props.sorter!== undefined) {
        sorter = (
            <div class="k-cell-sorter" onClick={e=>{
                toSort()
                e.stopPropagation()
            }}>
                <Icon name="k-icon-sort-down" class={["k-cell-sorter-icon k-cell-sorter-up",{
                    'k-cell-sorter--0': currentSorter.field===props.col?.field && currentSorter.sorter===0
                }]} />
                <Icon name="k-icon-sort-down" class={["k-cell-sorter-icon k-cell-sorter-down ",{
                    'k-cell-sorter--1': currentSorter.field===props.col?.field && currentSorter.sorter===1
                }]}/>
            </div>
        )
      }

      return (
        <props.tag {...cellProps.value}>
          {slots.default?.()}
          {line}
            {sorter}
        </props.tag>
      )
    }
  }
})
