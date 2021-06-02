import {
  ComputedRef,
  Ref,
  computed,
  ref,
  watch,
  onUpdated,
  nextTick
} from "vue"
import { isObject, isFunction } from "@vue/shared"
import {
  toPX,
  getScrollbarWidth,
  hasUnit,
  getUnit,
  getStyle
} from "../../../util"
import useEvent from "../../../use/useEvent"
import useDelay from "../../../use/useDelay"

const PRESET_INDEX = "__preset_index__"
const PRESET_CHECKBOX = "__preset_checkbox__"
const PRESET_RADIO = "__preset_radio__"
const PRESET_ACTION = "__preset_action__"

export const PRESET_FIELDS: { [key: string]: any } = {
  index: { field: PRESET_INDEX, style: { width: 40 } },
  checkbox: { field: PRESET_CHECKBOX, style: { width: 40 } },
  radio: { field: PRESET_RADIO, style: { width: 40 } },
  action: { field: PRESET_ACTION, style: { width: 42 } }
}
export const IS_PRESET = (field: string) => {
  let b = false
  for (const o in PRESET_FIELDS) {
    if (PRESET_FIELDS[o].field === field) {
      b = true
      break
    }
  }
  return b
}

export const IS_INDEX = (field: string) => PRESET_INDEX === field
export const IS_CHECKBOX = (field: string) => PRESET_CHECKBOX === field
export const IS_RADIO = (field: string) => PRESET_RADIO === field

export function useTdWidth(
  isAuto: ComputedRef<boolean>,
  inner: Ref,
  bodyColumns: ComputedRef
) {
  const { start } = useDelay()
  //设置a，只是为了重新计算tdWidths
  const a = ref(0)
  const tdWidths = computed(() => {
    let totalTdWidth = a.value - a.value
    let totalStretchWidth = 0
    const wrapperWidth = inner.value
      ? Math.floor(inner.value.clientWidth) + 1
      : window.innerWidth
    //使用组件时设置的宽度
    let widths = bodyColumns.value.map((col: any, index: number) => {
      let style =
        typeof col.style === "function" ? col.style(null, null, {}) : col.style
      //w是通过代码设置的宽度
      //由于width的单位可能是px、em、rem、vh、vw单位，故需要转换成px
      //TODO: 待完善，此处只简单的转换一下
      let w = style?.width ?? 120
      if (hasUnit(w)) {
        if (getUnit(w) !== "px") {
          w = parseFloat(w) * 12
        }
      }
      // const w = style?.width ?? 120
      totalTdWidth += w
      if (!IS_PRESET(col.field) && !col.lockWidth) {
        totalStretchWidth += w
      }
      return w
    })
    //计算后的真实宽度
    // console.log(totalTdWidth, widths)
    if (isAuto.value) {
      //预置的列，不参与计算
      if (wrapperWidth > totalTdWidth) {
        const restWidth = wrapperWidth - totalTdWidth
        widths = bodyColumns.value.map((col: any, i: number) => {
          if (IS_PRESET(col.field) || col.lockWidth) {
            return widths[i]
          } else {
            return (
              widths[i] +
              Math.floor(restWidth * (widths[i] / totalStretchWidth))
            )
          }
        })
      }
    }

    // resizeWidths.value = [...widths]
    // console.log(resizeWidths.value)

    return widths
  })
  useEvent(ref(window), "resize", () => {
    start(() => {
      a.value += 1
    })
  })

  return { tdWidths }
}

export function useColumns(columns: ComputedRef, opts: ComputedRef) {
  const col_index = computed(() => ({
    name: opts.value.indexContent,
    ...PRESET_FIELDS.index
  }))
  const col_checkbox = { ...PRESET_FIELDS.checkbox }
  const col_radio = { ...PRESET_FIELDS.radio }
  const col_action = { ...PRESET_FIELDS.action }
  let cols = computed(() => {
    let _columns = columns.value
    let validCols: any[] = []
    //对columns进行处理
    if (typeof _columns === "function") {
      _columns = _columns()
    }
    _columns = _columns.forEach((c: any) => {
      if (isObject(c)) {
        validCols.push(c)
      } else if (isFunction(c)) {
        let f = c()
        if (isObject(f)) {
          validCols.push(f)
        }
      }
    })
    let arr: any[] = []
    if (opts.value.hasIndex || opts.value.hasAction) {
      arr.push(col_index.value)
    }
    if (opts.value.hasCheckbox) {
      arr.push(col_checkbox)
    } else if (opts.value.hasRadio) {
      arr.push(col_radio)
    }
    // if (opts.value.hasAction) {
    //   arr.push(col_action)
    // }
    return [...arr, ...validCols]
  })

  return cols
}

export function useFixed(
  tableRoot: Ref,
  innerTable: Ref,
  leftFixed: ComputedRef,
  rightFixed: ComputedRef
) {
  const showTopShadow = ref(false)
  const leftOffset = ref<number[]>([])
  const leftShadowPosition = ref(-1000)
  const leftLastElem = ref<HTMLElement>()
  const rightOffset = ref<number[]>([])
  const showLeftShadow = ref(false)
  const leftNumber = computed(() => {
    if (leftFixed.value) {
      return Number(leftFixed.value)
    }
    return 0
  })
  const rightNumber = computed(() => {
    if (rightFixed.value) {
      return Number(rightFixed.value)
    }
    return 0
  })
  function getTdsAndThs() {
    const scrollTarget = innerTable.value
    const trs = [
      ...scrollTarget.querySelectorAll(".k-sheet-tbody>.k-sheet>tbody>tr")
    ]
    const ths = [
      ...scrollTarget.querySelectorAll(
        ".k-sheet-thead>.k-sheet>thead>tr>th.k-cell--sticky"
      )
    ]
    const tds = trs.length ? [...trs[0].querySelectorAll("td")] : []
    const leftTds = tds.slice(0, leftNumber.value)
    return { trs, leftTds, ths }
  }
  function reset() {
    leftOffset.value = []
    const { trs, leftTds, ths } = getTdsAndThs()
    trs.forEach((tr: HTMLElement, i: number) => {
      const tds = [...tr.querySelectorAll("td")].slice(0, leftNumber.value)
      tds.forEach((td) => {
        td.classList.remove("k-cell--sticky")
        td.style.removeProperty("left")
      })
    })
    nextTick(setFixed)
  }
  function setFixed(e?: any) {
    const scrollTarget = e ? (e.target as HTMLElement) : innerTable.value
    if (scrollTarget.scrollLeft > 0) {
      showLeftShadow.value = true
      if (leftNumber.value !== 0 || rightNumber.value !== 0) {
        const { trs, leftTds, ths } = getTdsAndThs()
        // const ths = [
        //   ...scrollTarget.querySelectorAll(
        //     ".k-sheet-thead>.k-sheet>thead>tr>th.k-cell--sticky"
        //   )
        // ]
        // const trs = [
        //   ...scrollTarget.querySelectorAll(".k-sheet-tbody>.k-sheet>tbody>tr")
        // ]
        const tds = trs.length ? [...trs[0].querySelectorAll("td")] : []

        // const leftTds = tds.slice(0, leftNumber.value)
        const rightTds = tds
          .reverse()
          .slice(0, rightNumber.value)
          .reverse()
        if (leftTds.length) {
          leftLastElem.value = leftTds.slice(-1)[0]
          if (leftOffset.value.length === 0) {
            let leftPosition = 0
            leftOffset.value = leftTds.map(
              (td: HTMLElement, i: number, arr) => {
                const l = td.offsetLeft + 1
                if (i === arr.length - 1) {
                  leftPosition = l + parseInt(getStyle(td, "width"))
                }
                return l
              }
            )
            leftShadowPosition.value = leftPosition
          }
        }
        if (rightTds.length) {
          rightOffset.value = rightTds.map((td) => td.offsetLeft - 1)
        }

        trs.forEach((tr) => {
          if (leftOffset.value.length) {
            const tds = [...tr.querySelectorAll("td")].slice(
              0,
              leftOffset.value.length
            )
            tds.forEach((td: HTMLElement, i) => {
              td.style.left = leftOffset.value[i] + "px"
              td.classList.add("k-cell--sticky")
            })
          }
        })
        ths.forEach((th: HTMLElement, i: number) => {
          th.style.left = leftOffset.value[i] + "px"
        })
      }
    } else {
      showLeftShadow.value = false
    }
    showTopShadow.value = scrollTarget.scrollTop > 0
  }
  useEvent(innerTable, "scroll", setFixed)
  // onUpdated(reset)
  return {
    leftLastElem,
    showLeftShadow,
    showTopShadow,
    leftShadowPosition,
    reset
  }
}
