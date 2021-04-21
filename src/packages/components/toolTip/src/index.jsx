/**
 * 待改进问题点：如何在没有根节点（没有tag）的情况下，获取到插槽里第一个有效节点（非Comment）
 */
import {defineComponent, ref, computed, watch} from 'vue'
import {withDirectives, resolveDirective} from 'vue'
import clickOutside from '../../../directives/clickOutside'
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
    directives: {clickOutside},
    props: {
        ...Overlay.props,
        title: [String,Object],
        tag: {
            type: String,
            default: 'div'
        }
    },
    emits: ['update:show'],
    setup(props, {attrs,slots,emit}) {
        const visible = ref(props.show)
        const clickOutside = resolveDirective('clickOutside')
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
        const op = computed(()=>{
            const p = {
                ...props, 
                show:visible.value,
                class: 'k-tooltip-content',
                style: {
                    '--__overlay-background-color': 'rgba(0,0,0,.8)',
                    '--__overlay-text-color': 'rgba(255,255,255,.8)',
                    '--__overlay-z-index': 2000
                },
                "onUpdate:show":v=>{
                    visible.value=v
                }
            }
            return p
        })

        watch(()=>props.show,v=>{visible.value=v})
        watch(visible,v=>{emit('update:show',v)})

        return () => {
            const main = <t {...p.value}>{slots.default?.()}</t>
            const direc = [[clickOutside, ()=>{
                    visible.value=false
                }
            ]]
            let trigger = main
            if(props.trigger==='click') {
                trigger = withDirectives( main,direc)
            }
            return (
                <>
                    {trigger}
                    <Overlay {...op.value} relate-element={root}>{props.title}</Overlay>
                </>
            )
        }
    }
})