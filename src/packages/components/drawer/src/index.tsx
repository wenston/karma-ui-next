import {computed, defineComponent,Transition,Teleport, ref, watch, withDirectives, vShow, onMounted, reactive} from 'vue'
import Mask from '../../mask'
import useGlobalZIndex from '../../../use/useGlobalZIndex'
import {getInvisibleElementSize,getElement} from '../../../util'
export default defineComponent({
    components: {Mask},
    props: {
        bind: {type: String,default: 'v-if'},
        show:Boolean,
        hasMask: {type:Boolean,default: true},
        placement: {
            type: String,default: 'right'
        },
        //插入dom中的位置
        to: {
            type: HTMLElement,
            default:()=>document.body
        },
        //是否可以点击遮罩关闭抽屉
        canCloseByClickMask: {type: Boolean,default: true}
    },
    emits: ['update:show'],
    setup(props,{attrs,emit,slots}){
        // const root = ref()
        const center = ref()
        const visible = ref(props.show)
        const {zIndex} = useGlobalZIndex()
        const drawProps = computed(()=>{
            let o:any = {
                // ref: root,
                class: ['k-drawer',`k-drawer--${props.placement}`],
            }

            if(props.placement!=='center') {
                o.style = {zIndex: zIndex.value}
            } 

            return o
        })
        function close() {
            visible.value=false
        }

        watch(()=>props.show,v=>{visible.value=v})
        watch(visible,v=>{
            emit('update:show',v)
        })
        return ()=> {
            let mask = null
            if(props.hasMask) {
                const maskProps = {
                    show: visible.value,
                    canCloseByClickSelf: props.canCloseByClickMask,
                    "onUpdate:show":(v:boolean)=>{
                        visible.value=v
                    }
                }
                mask = <Mask {...maskProps}/>
            }
            let main:any = (
                <div {...drawProps.value}>
                    {
                        slots.header && (
                            <div class="k-drawer-header">{slots.header?.({close})}</div>
                        )
                    }
                    <div class="k-drawer-body">
                        {slots.default?.({close})}
                    </div>
                    {
                        slots.footer && (
                            <div class="k-drawer-footer">{slots.footer?.({
                                close
                            })}</div>
                        )
                    }
                </div>
            )
            if(props.placement==='center') {
                const wrapperProps:any = {
                    class: 'k-drawer-center-wrapper',
                    style: {zIndex:zIndex.value},
                    ref: center
                    
                }
                if(props.canCloseByClickMask) {
                    wrapperProps.onClick=(e:MouseEvent)=>{
                        if(e.target===center.value) {
                            visible.value=false
                        }
                    }
                }
                main = <div {...wrapperProps}>{main}</div>
            }
            if(props.bind==='v-if') {
                main = visible.value && main
            } else if(props.bind==='v-show') {
                main = withDirectives(main,[[vShow,visible.value]])
            }
            return (
                <>
                    {mask}
                    <Teleport to={props.to}>
                        <Transition name={`k-drawer-transition--${props.placement}`}>
                            {main}
                        </Transition>
                    </Teleport>
                </>
            )
        }
    }
})