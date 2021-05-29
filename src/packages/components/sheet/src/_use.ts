import { ComputedRef, Ref, computed, ref, watch } from "vue"
import { isObject, isFunction } from "@vue/shared"
import { toPX, getScrollbarWidth, hasUnit, getUnit } from "../../../util"
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
    let widths = bodyColumns.value.map((col: any) => {
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

    return widths
  })
  useEvent(ref(window), "resize", () => {
    start(() => {
      a.value += 1
    })
  })

  return tdWidths
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
