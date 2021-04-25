import {SetupContext, DirectiveArguments, getCurrentInstance, onMounted, Teleport} from 'vue'
import { defineComponent, ref, cloneVNode, watch, computed } from 'vue'
import {withDirectives, resolveDirective} from 'vue'
import clickOutside from '../../../directives/clickOutside'
import Layer from '../../layer'
import useSlot from '../../../use/useSlot'
import useDelay from '../../../use/useDelay'
import useEvent from '../../../use/useEvent'
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
        const clickOutside = resolveDirective('clickOutside')
        const visible = ref(props.show)
        const relateElement = ref(null)
        const {start,stop,clear} = useDelay()
        const titleSlot = computed(()=>{
            return slots.title?.() || []
        })
        const defaultSlot = slots.default?.()
        // console.log(titleSlot)
        if(props.trigger==='hover') {
            useEvent(relateElement,'mouseenter',()=>{
                start(()=>{visible.value=true},props.showDelay)
            })
            useEvent(relateElement,'mouseleave',()=>{
                stop(()=>{visible.value=false},props.hideDelay)
            })

        }else if(props.trigger==='click' ) {
            useEvent(relateElement,'click',()=>{
                visible.value=!visible.value
            })

        }
        watch(()=>props.show,v=>{
            visible.value=v
        })
        watch(visible,v=>{
            emit('update:show',v)
        })
        const op = computed(()=>{
            const _:{[key:string]:any} = {
                ...props,
                show:visible.value,
                style: {
                    '--__layer-background-color': 'rgba(255,255,255,.95)',
                    '--__layer-text-color': '#666'
                },
                "onUpdate:show":toggle
            }
            if(props.trigger==='hover') {
                _.onMouseenter=clear
                _.onMouseleave=()=>{
                    stop(()=>{
                        visible.value=false
                    },props.hideDelay)
                }
            }else if(props.trigger==='click'){
                _.onClick=()=>{
                    // visible.value=!visible.value
                    // console.log('你想干什么')
                }
            }
            return _
        })
        function toggle() {
            visible.value=!visible.value
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
            const _layer = <Layer {...op.value} relate-element={relateElement}>{defaultSlot}</Layer>
            const layer = props.toBody?<Teleport to={document.body}>{_layer}</Teleport>:_layer
            return (
                <>
                    {trigger}
                    {_titleSlot.value.slice(1)}
                    {visible.value && layer}
                </>
            )
        }
    }
})