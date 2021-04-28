import {SetupContext, DirectiveArguments, onMounted, Teleport, Transition} from 'vue'
import { defineComponent, ref, cloneVNode, watch, computed } from 'vue'
import {withDirectives, resolveDirective} from 'vue'
import {getBoundingClientRect} from '../../../util'
import clickOutside from '../../../directives/clickOutside'
import Layer from '../../layer'
import useSlot from '../../../use/useSlot'
import useDelay from '../../../use/useDelay'
import useEvent from '../../../use/useEvent'
const OverlayProps = {
    showDelay: {type: Number,default: 200},
    hideDelay: {type: Number,default: 200},
    isEqualWidth: {
        type: Boolean,default: false
    },
    tag: {
        type: String,
        default: 'span'
    }
}
const LayerProps = {
    ...Layer.props,
    transitionName: {
        type: String,default: 'k-layer-scale'
    },
}
export default defineComponent({
    inheritAttrs: false,
    components: {Layer},
    directives: {clickOutside},
    props: {
        ...LayerProps,
        ...OverlayProps
    },
    emits: ['update:show'],
    setup(props,{slots,emit,attrs}:SetupContext) {
        const clickOutside = resolveDirective('clickOutside')
        const visible = ref(props.show)
        const relateElement = ref(null)
        const titleWidth = ref(0)
        const {start,stop,clear} = useDelay()
        const titleSlot = computed(()=>{
            return slots.title?.() || []
        })

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
            useEvent(relateElement,'keyup',(e:KeyboardEvent)=>{
                if(e.code.toLowerCase()==='enter') {
                    visible.value=!visible.value
                }
            })
        }
        watch(()=>props.show,v=>{
            visible.value=v
        })
        watch(visible,v=>{
            emit('update:show',v)
        })
        const layerProps = computed(()=>{
            const {tag,showDelay,hideDelay,isEqualWidth,...rest} = props
            const _style:any = attrs.style??{}
            const _sty:any = {}
            for(const k in _style) {
                if(k==='background-color' || k==='color') {
                    _sty[`--__layer-${k}`] = _style[k]
                } else {
                    _sty[k] = _style[k]
                }
            }
            const _:{[key:string]:any} = {
                ...rest,
                show:visible.value,
                transitionName: props.transitionName,
                class: attrs.class??'',
                style: {
                    '--__layer-background-color': 'rgba(255,255,255,.95)',
                    '--__layer-color': '#666',
                    ..._sty
                }
            }
            if(props.isEqualWidth) {
                _.style['--__layer-min-width'] = `${titleWidth.value}px`
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

        onMounted(()=>{
            if(props.isEqualWidth) {
                const {width} = getBoundingClientRect(relateElement)
                titleWidth.value = width
            }
        })
        
        const _titleSlot = useSlot({slot:titleSlot,tag:props.tag})
        return ()=> {
            const defaultSlot = slots.default?.()
            let t = <></>
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
            let _layer = null
            if(props.bind==='v-show') {
                _layer = (
                    <Transition name={props.transitionName}>
                        <Layer {...layerProps.value} v-show={visible.value}
                            relate-element={relateElement}>{defaultSlot}</Layer>
                    </Transition>
                )
            } else {
                _layer = (
                    <Transition name={props.transitionName}>
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