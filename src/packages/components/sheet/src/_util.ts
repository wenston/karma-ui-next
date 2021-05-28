import { isObject } from "@vue/shared"
export function isBuiltInColumn(field: string) {
  return field === ""
}

//筛选出有效的数据列
export function filterValidColumns(columns: any) {
  if (typeof columns === "function") {
    columns = columns()
  }
  let arr: any[] = []
  columns.forEach((col: any) => {
    if (!!col && isObject(col)) {
      arr.push(col)
    } else if (typeof col === "function") {
      const c = { ...col() }
      if (!!c && isObject(c)) arr.push(c)
    }
  })
  return arr
}

export function createTbodyColumns(columns: any) {
  let bodyColumns: any[] = []
  const cols = filterValidColumns(columns)
  const fn = (arr: any) => {
    arr.forEach((col: any) => {
      if (col.children && col.children.length) {
        fn(col.children)
      } else {
        // bodyColumns.push({...col})
        bodyColumns.push(col)
      }
    })
  }
  fn(cols)
  return bodyColumns
}

export function getAlign(col: any) {
  const align = col.align || ""
  if (typeof align === "string") {
    return {
      thead: align,
      tbody: align,
      tfoot: align
    }
  } else {
    if (align.length) {
      let [a, b, c] = align
      return {
        thead: a || "",
        tbody: b || "",
        tfoot: c || ""
      }
    }
  }
}
