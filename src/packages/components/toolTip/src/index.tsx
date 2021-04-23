import {SetupContext, DirectiveArguments} from 'vue'
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
        title: {
            type: [String,Object],
            default:''
        },
        tag: {
            type: String,
            default: 'span'
        }
    },
    emits: ['update:show'],
    setup(props,{slots,emit,attrs}:SetupContext) {
        const clickOutside = resolveDirective('clickOutside')
        const visible = ref(props.show)
        const relateElement = ref(null)
        const defaultSlot = computed(()=>{
            return slots.default?.() || []
        })

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
                    '--__layer-background-color': 'rgba(0,0,0,.8)',
                    '--__layer-text-color': 'rgba(255,255,255,.8)',
                    '--__layer-z-index': props.zIndex
                },
                "onUpdate:show":toggle
            }
            return _
        })
        function toggle(v:boolean) {
            visible.value=v
        }

        const _defaultSlot = useSlot({slot:defaultSlot,tag:props.tag})

        return ()=> {
            let t = <span />
            if(_defaultSlot.value.length) {
                /* 
                //注意：由于是clone出的节点，所以ref指向的有可能是个组件，而不是原生html标签！！ 
                */
                t = cloneVNode(_defaultSlot.value[0],{ref:relateElement})
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
            // console.log(trigger)
            return (
                <>
                    {trigger}
                    {_defaultSlot.value.slice(1)}
                    {visible.value&&<Layer {...op.value} 
                        relate-element={relateElement}>{props.title}</Layer>}
                </>
            )
        }
    }
})