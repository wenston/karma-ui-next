import {SetupContext, DirectiveArguments, onMounted, Teleport, Transition} from 'vue'
import { defineComponent, ref, cloneVNode, watch, computed } from 'vue'
import {withDirectives, resolveDirective} from 'vue'
import clickOutside from '../../../directives/clickOutside'
import Layer from '../../layer'
import useSlot from '../../../use/useSlot'
import useDelay from '../../../use/useDelay'
import useEvent from '../../../use/useEvent'
const TransitionName = 'k-layer-scale'
export default defineComponent({
    inheritAttrs: false,
    components: {Layer},
    directives: {clickOutside},
    props: {
        ...Layer.props,
        showDelay: {type: Number,default: 200},
        hideDelay: {type: Number,default: 200},
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
        const layerProps = computed(()=>{
            const {tag,...rest} = props
            const _:{[key:string]:any} = {
                ...rest,
                show:visible.value,
                transitionName: TransitionName,
                style: {
                    '--__layer-background-color': 'rgba(255,255,255,.95)',
                    '--__layer-text-color': '#666'
                }
            }
            if(props.trigger==='hover') {
                _.onMouseenter=clear
                _.onMouseleave=()=>{
                    stop(()=>{
                        visible.value=false
                    },props.hideDelay)
                }
            }else if(props.trigger==='click'){
                //无操作
            }
            return _
        })

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
            // const _layer = <Layer {...layerProps.value} 
            //     relate-element={relateElement}>{defaultSlot}</Layer>
            let _layer = null
            if(props.bind==='v-show') {
                _layer = (
                    <Transition name={TransitionName}>
                        <Layer {...layerProps.value} v-show={visible.value}
                            relate-element={relateElement}>{defaultSlot}</Layer>
                    </Transition>
                )
            } else {
                _layer = (
                    <Transition name={TransitionName}>
                       {visible.value && <Layer {...layerProps.value} 
                            relate-element={relateElement}>{defaultSlot}</Layer>}
                    </Transition>
                )
            }
            const layer = props.toBody
                ?<Teleport to={document.body}>{_layer}</Teleport>
                :_layer
            return (
                <>
                    {trigger}
                    {_titleSlot.value.slice(1)}
                    {layer}
                </>
            )
        }
    }
})