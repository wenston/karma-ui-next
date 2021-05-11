import { computed, Ref, ref, watch } from "vue"
import { isArray, isMap } from "@vue/shared"
interface ToggleOptions {
  data?: Ref<Map<unknown, unknown> | unknown[]>
  key?: any //初始化用
  val?: any //初始化用，和上边的key只能选其一
}
export default function useToggle({ data, key, val }: ToggleOptions) {
  const _d = computed(() => data?.value ?? [0, 1])
  const currentKey = ref(key ?? 0)
  const currentVal = ref(val ?? 0)

  if (key) {
    setByKey(key)
  } else if (val) {
    setByVal(val)
  }

  function setByKey(key: any) {
    if (currentKey.value !== key) {
      if (isArray(_d.value)) {
        if (typeof key === "number") {
          if (key < 0 || key > _d.value.length) {
            console.warn("给出的index超出了数组长度！")
          } else {
            currentKey.value = key
            currentVal.value = _d.value[key]
          }
        }
      } else if (isMap(_d.value)) {
        if (_d.value.has(key)) {
          currentKey.value = key
          currentVal.value = _d.value.get(key)
        } else {
          console.warn("给出的key不在data中！")
        }
      }
    }
  }
  function setByVal(val: any) {
    if (currentVal.value !== val) {
      _d.value.forEach((v: any, k: any) => {
        if (val === v) {
          currentVal.value = v
          currentKey.value = k
        }
      })
    }
  }

  function toggle() {
    if (isArray(_d.value)) {
      const len = _d.value.length
      setByKey((currentKey.value + 1) % len)
    } else if (isMap(_d.value)) {
      let arr: any[][] = []
      let i = -1
      let curIndex = 0
      _d.value.forEach((v, k) => {
        i += 1
        if (v === currentVal.value && k === currentKey.value) {
          curIndex = i
        }
        arr.push([k, v])
      })
      const len = arr.length
      const [k, v] = arr[(curIndex + 1) % len]
      currentKey.value = k
      currentVal.value = v
    }
  }

  return {
    currentKey,
    currentVal,
    setByKey,
    setByVal,
    toggle
  }
}
