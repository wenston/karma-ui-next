import { ComputedRef, Ref, computed, ref, watch } from "vue"
import { getBoundingClientRect } from "../../../util"

export default function useTdWidth(container: Ref, bodyColumns: ComputedRef) {
  const tdWidths = computed(() => {
    let totalTdWidth = 0
    const wrapperWidth = container.value
      ? getBoundingClientRect(container.value).width
      : window.innerWidth
    //设置的宽度
    let widths = bodyColumns.value.map((col: any) => {
      let style =
        typeof col.style === "function" ? col.style(null, null, {}) : col.style
      //w是通过代码设置的宽度
      const w = style?.width ?? 120
      totalTdWidth += w - 2
      return w
    })
    //计算后的真实宽度
    // console.log(totalTdWidth, widths)
    if (wrapperWidth > totalTdWidth) {
      console.log(wrapperWidth, totalTdWidth)
      widths = widths.map((w: number) =>
        //为什么要减1？因为边框占去了1px的宽度！
        Math.floor(wrapperWidth * ((w - 3) / totalTdWidth))
      )
    }
    return widths
  })

  return tdWidths
}
