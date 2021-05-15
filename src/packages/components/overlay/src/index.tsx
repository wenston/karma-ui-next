import {SetupContext, DirectiveArguments, onMounted, Teleport, Transition, Ref, getCurrentInstance, onUpdated} from 'vue'
import { defineComponent, ref,reactive, cloneVNode, watch, computed } from 'vue'
import {withDirectives, resolveDirective} from 'vue'
import {getBoundingClientRect} from '../../../util'
import clickOutside from '../../../directives/clickOutside'
import Layer from '../../layer'
import useSlot from '../../../use/useSlot'
import useDelay from '../../../use/useDelay'
import useEvent from '../../../use/useEvent'
const OverlayProps = {
    manual: Boolean,//是否手动控制layer的显隐
    showDelay: {type: Number,default: 200},
    hideDelay: {type: Number,default: 200},
    isEqualWidth: {
        type: Boolean,default: false
    },
    tag: {
        type: String,
        default: 'span'
    },
    canCloseByClickOutside: {type:Boolean,default:true},
    excludeRefs: Array//和setup里的exclude作用一样，最后会合并传给clickOutside，
    // layerClass: [String,Object,Array]
}
const LayerProps = {
    ...Layer.props,
    transitionName: {
        type: String,default: 'k-layer-scale'
    },
}
export default defineComponent({
    name:'Overlay',
    inheritAttrs: false,
    components: {Layer},
    directives: {clickOutside},
    props: {
        ...LayerProps,
        ...OverlayProps
    },
    emits: ['update:show',"get-relate-element-rect",'before-enter','after-enter','enter'],
    setup(props,{slots,emit,attrs}:SetupContext) {
        const clickOutside = resolveDirective('clickOutside')
        const visible = ref(props.show)
        const relateElement = ref(null)
        const exclude = ref<Ref[]>([])
        const titleRect = reactive({
            left:0,top:0,width:0,height:0,bottom:0,right:0
        })
        const {start,stop,clear} = useDelay()
        const titleSlot = computed(()=>{
            return slots.trigger?.() || []
        })

        if(!props.manual) {
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
        }
        
        watch(()=>props.show,v=>{
            visible.value=v
        })
        watch(visible,v=>{
            emit('update:show',v)
        })
        const trans_name = computed(()=>{
            if(props.isFixed) {
                return 'k-layer-size-transition'
            }
            return props.transitionName
        })
        const layerProps = computed(()=>{
            const {
                tag,showDelay,hideDelay,isEqualWidth,canCloseByClickOutside,excludeRefs,
                ...rest} = props
            const _style:any = attrs.style??{}
            const _sty:any = {}
            for(const _k in _style) {
                let k  = _k
                if(k==='backgroundColor') {
                    console.warn('不要用backgroundColor')
                }
                if(k==='background-color' || k==='color' || k==='border-color' || k==='padding') {
                    _sty[`--__layer-${k}`] = _style[k]
                } else {
                    _sty[k] = _style[k]
                }
            }
            const _:{[key:string]:any} = {
                ...rest,
                show:visible.value,
                transitionName: trans_name.value,
                class: attrs.class??'',
                style: {
                    '--__layer-background-color': 'rgba(255,255,255,.95)',
                    '--__layer-color': '#666',
                    ..._sty
                },
                "onGet-ref":(_ref:Ref)=> {
                    exclude.value = [_ref]
                }
            }
            if(props.isEqualWidth) {
                _.style['--__layer-min-width'] = `${titleRect.width}px`
            }
            if(props.isFixed) {
                _.style['--__layer-width-from-to'] = `${titleRect.width}px`
                _.style['--__layer-height-from-to'] = `${titleRect.height}px`
                _.style['--__layer-top-from-to'] = `${titleRect.top}px`
                _.style['--__layer-left-from-to'] = `${titleRect.left}px`
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

        function getRect() {
            const r = getBoundingClientRect(relateElement)
            emit('get-relate-element-rect',r)
            if(props.isEqualWidth || props.isFixed) {
                titleRect.width = r.width
                titleRect.height=r.height
                titleRect.top = r.top
                titleRect.left = r.left
                titleRect.right = r.right
                titleRect.bottom = r.bottom
            } 
        }

        onMounted(()=>{
            getRect()
        })
        onUpdated(()=>{
            getRect()
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
                    exclude: [...exclude.value,...props.excludeRefs??[]]
                }
            ]]
            let trigger = t
            if(!props.manual && (props.canCloseByClickOutside && props.trigger==='click' && visible.value)) {
                trigger = withDirectives(trigger, direc)
            }
            let _layer = null
            const transProps = {
                name: trans_name.value,
                'onBefore-enter':()=>{
                    emit('before-enter')
                },
                'onAfter-enter':()=> {
                    emit('after-enter')
                },
                'onEnter':()=>{
                    emit('enter')
                }
            }
            if(props.bind ==='v-show') {
                _layer = (
                    <Transition {...transProps}>
                        <Layer {...layerProps.value} v-show={visible.value}
                            relate-element={relateElement}>{defaultSlot}</Layer>
                    </Transition>
                )
            } else {
                _layer = (
                    <Transition {...transProps}>
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
                    {defaultSlot&&layer}
                </>
            )
        }
    }
})