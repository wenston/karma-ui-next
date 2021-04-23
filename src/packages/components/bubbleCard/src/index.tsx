import {SetupContext, DirectiveArguments, getCurrentInstance, onMounted} from 'vue'
import { defineComponent, ref, cloneVNode, watch, computed } from 'vue'
import {withDirectives, resolveDirective} from 'vue'
import clickOutside from '../../../directives/clickOutside'
import Layer from '../../layer'
import useSlot from '../../../use/useSlot'
export default defineComponent({
    inheritAttrs: false,
    components: {Layer},
    directives: {clickOutside},
    props: {
        ...Layer.props,
        trigger: {
            type: String,
            default:'click'
        },
        tag: {
            type: String,
            default: 'span'
        }
    },
    emits: ['update:show'],
    setup(props,{slots,emit,attrs}:SetupContext) {
        const ins = getCurrentInstance()
        const clickOutside = resolveDirective('clickOutside')
        const visible = ref(props.show)
        const relateElement = ref(null)
        const titleSlot = computed(()=>{
            return slots.title?.() || []
        })
        const defaultSlot = slots.default?.()
        // console.log(titleSlot)
        watch(()=>props.show,v=>{
            visible.value=v
        })
        watch(visible,v=>{
            emit('update:show',v)
        })
        const op = computed(()=>{
            const _ = {
                ...props,
                show:visible.value,
                style: {
                    '--__layer-background-color': 'rgba(255,255,255,.95)',
                    '--__layer-text-color': '#666',
                    '--__layer-z-index': props.zIndex
                },
                "onUpdate:show":toggle
            }
            return _
        })
        function toggle(v:boolean) {
            visible.value=v
        }

        const _titleSlot = useSlot({slot:titleSlot,tag:props.tag})
        return ()=> {
            let t = <span />
            if(_titleSlot.value.length) {
                //注意：由于是clone出的节点，所以ref指向的有可能是个组件，而不是原生html标签！！
                t = cloneVNode(_titleSlot.value[0],{ref:relateElement})
            }
            const direc:DirectiveArguments = [[
                clickOutside!, 
                {
                    handler:()=>{visible.value=false},
                    exclude: []
                }
            ]]
            let trigger = t
            if(props.trigger==='click') {
                trigger = withDirectives(trigger, direc)
            }
            
            return (
                <>
                    {trigger}
                    {_titleSlot.value.slice(1)}
                    <Layer {...op.value} relate-element={relateElement}>{defaultSlot}</Layer>
                </>
            )
        }
    }
})