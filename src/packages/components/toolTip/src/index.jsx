/**
 * 待改进问题点：如何在没有根节点（没有tag）的情况下，获取到插槽里第一个有效节点（非Comment）
 */
import {defineComponent, ref, computed} from 'vue'
import Overlay from '../../overlay'
//检验slot插槽内容是否为有效的节点
//文本节点视为无效
//其他如组件、原生html标签视为有效
// function isValidElement(slot) {
//     return slot.children && slot.type && typeof slot.type!=='symbol'
// }
export default defineComponent({
    inheritAttrs: false,
    components: {Overlay},
    props: {
        ...Overlay.props,
        title: [String,Object],
        tag: {
            type: String,
            default: 'div'
        }
    },
    setup(props, {attrs,slots}) {
        const t = props.tag
        const root = ref(null)
        // const defaultSlot = slots.default?.()[0]
        const p = computed(()=>{
            const o = {
                class: ['k-tooltip',attrs.class],
                ref: root,
                style: attrs.style
            }
            return o
        })
        const op = computed(()=>{
            return props
        })

        return () => {
            return (
                <>
                    <t {...p.value}>{slots.default?.()}</t>
                    <Overlay {...op.value} relate-element={root}>{props.title}</Overlay>
                </>
            )
        }
    }
})