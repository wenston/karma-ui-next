/**
 * 待改进问题点：如何在没有根节点（没有tag）的情况下，获取到插槽里第一个有效节点（非Comment）
 */
import {defineComponent, ref, computed} from 'vue'
import Overlay from '../../overlay'
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
        
        const p = computed(()=>{
            const o = {
                class: ['k-tooltip',attrs.class],
                ref: root,
                style: attrs.style
            }
            return o
        })

        return () => {
            return (
            <>
                <t {...p.value}>{slots.default?.()}</t>
                <Overlay relate-element={root}>{props.title}</Overlay>
            </>
        )}
    }
})