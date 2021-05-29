import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
  toRefs,
  provide,
  readonly
} from "vue"
import { getBoundingClientRect } from "../../../util"
import Thead from "./_thead"
import Tbody from "./_tbody"
import _props from "./_props"
import { useTdWidth, useColumns } from "./_use"
import { createTbodyColumns, getSelectedKey } from "./_util"
export default defineComponent({
  components: { Thead, Tbody },
  props: _props,
  emits: ["update:keys", "after-checked"],
  setup(props, { emit, attrs, slots }) {
    const isCheckedAll = ref(0)
    const selectedKeys = ref<any[]>([])
    const tableRoot = ref()
    const inner = ref()
    const innerProps = computed(() => {
      let o: any = {
        ref: inner,
        class: [
          "k-sheet-inner-container",
          "k-sheet--min-content",
          {
            "k-sheet--nowrap": props.nowrap,
            "k-sheet--stripe": props.stripe,
            "k-sheet--hover": props.hover
          }
        ],
        style: {
          height: props.height,
          maxHeight: props.maxHeight
        }
      }
      return o
    })
    //columns参数传入之后，加入预置列, 序列号、多选框、单选框
    const finalColumns = useColumns(
      computed(() => props.columns),
      computed(() => ({
        indexContent: props.indexContent,
        hasIndex: props.hasIndex,
        hasCheckbox: props.hasCheckbox,
        checkboxKey: props.checkboxKey,
        hasRadio: props.hasRadio,
        radioKey: props.radioKey,
        hasAction: props.hasAction
      }))
    )
    const tbodyColumns = computed(() => createTbodyColumns(finalColumns.value))
    const theadProps = computed(() => {
      let o: any = {
        columns: finalColumns.value,
        indexContent: props.indexContent,
        checkboxKey: props.checkboxKey
      }
      return o
    })
    const tbodyProps = computed(() => {
      let o: any = {
        columns: tbodyColumns.value,
        data: props.data,
        hasIndex: props.hasIndex,
        pageSize: props.pageSize,
        pageIndex: props.pageIndex,
        tbodySlots: slots,
        checkboxKey: props.checkboxKey,
        isCheckedAll: isCheckedAll.value,
        checkable: props.checkable
      }
      return o
    })

    const tdWidths = useTdWidth(
      computed(() => props.autoWidth),
      inner,
      tbodyColumns
    )

    provide("isCheckedAll", readonly(isCheckedAll))
    //thead中使用
    provide("setCheckAll", setCheckAll)

    provide("selectedKeys", readonly(selectedKeys))
    provide("hasKey", (k: any) => {
      return selectedKeys.value.some((sv) => sv === k)
    })
    provide("toggleSelect", (k: any, checked: boolean) => {
      if (checked) {
        selectedKeys.value = selectedKeys.value.filter((el) => el !== k)
      } else {
        selectedKeys.value.push(k)
      }
      let b = checkAllSelected()
      isCheckedAll.value = b
      afterChecked()
    })

    function setCheckAll(b: number) {
      isCheckedAll.value = b
      if (b) {
        if (props.data && props.data.length) {
          ;(props.data as any).forEach((row: any, index: number) => {
            if (props.checkable) {
              const { disabled } = props.checkable(row, index)
              if (!disabled) {
                selectedKeys.value.push(getSelectedKey(row, props.checkboxKey))
              }
            } else {
              selectedKeys.value.push(getSelectedKey(row, props.checkboxKey))
            }
          })
        }
      } else {
        selectedKeys.value = []
      }
      afterChecked()
    }
    //可以复选时，检查是否所有行都被选中了
    function checkAllSelected() {
      const keys = selectedKeys.value
      const d = (props.data ?? []).filter((row: any, index: number) => {
        if (props.checkable) {
          const { disabled } = props.checkable(row, index)
          return !disabled
        }
        return true
      })
      if (d && d.length && keys.length) {
        let checked = 1

        if (d.length <= keys.length) {
          let i = 0
          while (i < d.length) {
            const row = d[i]
            const k = getSelectedKey(row, props.checkboxKey)
            if (!keys.some((_k) => _k == k)) {
              checked = 0
              break
            }
            i++
          }
        } else {
          checked = 0
        }
        return checked
      }
      return 0
    }

    function afterChecked() {
      let arr = (props.data ?? []).filter((row, index) => {
        const k = getSelectedKey(row, props.checkboxKey)
        if (props.checkable) {
          const { disabled } = props.checkable(row, index)
          if (!disabled) {
            return selectedKeys.value.some((s) => s == k)
          }
          return false
        }
        return selectedKeys.value.some((s) => s == k)
      })
      emit("after-checked", arr)
    }

    watch(
      selectedKeys,
      (ks) => {
        if (!isSameArray(ks, props.keys as any)) {
          emit("update:keys", ks)
        }
      },
      { deep: true }
    )
    watch(
      () => props.keys,
      (ks: any) => {
        if (!isSameArray(ks, selectedKeys.value)) {
          selectedKeys.value = ks
        }
      },
      { deep: true, immediate: true }
    )

    onMounted(() => {})
    return () => {
      const thead = <Thead {...theadProps.value}></Thead>
      const tbody = <Tbody {...tbodyProps.value}></Tbody>
      return (
        <div class="k-sheet-container" ref={tableRoot}>
          <div {...innerProps.value}>
            <div class="k-sheet-thead">
              <table class="k-sheet">
                {colGroup(tdWidths.value)}
                <thead>{thead}</thead>
              </table>
            </div>
            <div class="k-sheet-tbody">
              <table class="k-sheet">
                {colGroup(tdWidths.value)}
                <tbody>{tbody}</tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }
  }
})

function colGroup(widths: number[]) {
  return (
    <colgroup>
      {widths.map((w: any) => {
        return <col width={w} />
      })}
    </colgroup>
  )
}

// 两个数组
function isSameArray(arr1: any[], arr2: any[]) {
  if (arr1.length === arr2.length) {
    if (arr1.length === 0) {
      return true
    }
    let i = 0
    let b = true
    while (i < arr1.length) {
      const k = arr1[i]
      if (!arr2.some((item) => item === k)) {
        b = false
        break
      }
      i++
    }
    return b
  }
  return false
}
