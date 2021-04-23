import {SetupContext, DirectiveArguments, Teleport, onMounted} from 'vue'
import { defineComponent, ref, cloneVNode, watch, computed } from 'vue'
import {withDirectives, resolveDirective} from 'vue'
import clickOutside from '../../../directives/clickOutside'
import Layer from '../../layer'
import useSlot from '../../../use/useSlot'
import useEvent from '../../../use/useEvent'
import useDelay from '../../../use/useDelay'
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
        toBody: {
            type: Boolean,default: true
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
        const _defaultSlot = useSlot({slot:defaultSlot,tag:props.tag})
        const {start,stop,clear} = useDelay()
        
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
            const {tag,title,..._props} = props
            const _:{[key:string]:any} = {
                ..._props,
                show:visible.value,
                style: {
                    '--__layer-background-color': 'rgba(0,0,0,.8)',
                    '--__layer-text-color': 'rgba(255,255,255,.8)'
                },
                "onUpdate:show":toggle,
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

        function teleport(con:any){
            return <Teleport to={document.body}>{con}</Teleport>
        }
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
            const layer = <Layer {...layerProps.value} relate-element={relateElement}>{props.title}</Layer>
            const tit = props.toBody?teleport(layer):layer
            // console.log(trigger)
            return (
                <>
                    {trigger}
                    {_defaultSlot.value.slice(1)}
                    {visible.value&&tit}
                </>
            )
        }
    }
})