/**
 * 覆盖层，用以辅助展示一些东西，给出一个relateElement时，会根据此元素定位
 */
import { defineComponent, Teleport, reactive, ref,watch, computed } from 'vue';
import useEvent from '../../../use/useEvent'
import useDelay from '../../../use/useDelay'
import {getElementPositionInPage} from '../../../util'
import {get} from '../../../util/placement'
interface sty {
    [key: string]: any
}
export default defineComponent({
    inheritAttrs: false,
    props: {
        bind: {
            type: String,
            default: 'v-if'//v-show
        },
        relateElement: {
            type: [Element,Object],
            default: ()=>document.body
        },
        trigger: {
            type: String,
            default: 'hover'//click
        },
        show: {
            type: Boolean,
            default: false
        },
        to: {
            type: Element,
            default: ()=>document.body
        },
        placement: {
            type: String,
            default: 'top'
        },
        gap: {
            type: Number,
            default: 9
        },
        showDelay: {
            type: Number,
            default: 200
        },
        hideDelay: {
            type: Number,
            default: 200
        }
    },
    emits: ['update:show'],
    setup(props, ctx){
        const visible = ref(props.show)
        const elem = ref(props.relateElement)
        const {start,stop} = useDelay()
        const pos = reactive({
            top:0,
            left:0,
            right:0,
            bottom:0,
            width:0,
            height:0
        })
        const ps = computed(()=>{
            const _p = {
                class: [
                    ctx.attrs.class,
                    'k-overlay',
                    [`k-overlay--${props.placement}`]
                ]
            }
            let sty:sty = {}
            if(props.placement==='top') {
                sty.top = `${pos.top+props.gap*-1}px`
                sty.left = `${pos.left+pos.width/2}px`
                sty.transform = `translate(-50%,-100%)`
            } else if(props.placement==='top-start') {
                sty.top = `${pos.top+props.gap*-1}px`
                sty.left = `${pos.left}px`
                sty.transform = `translate(0,-100%)`
            } else if(props.placement==='top-end') {
                sty.top = `${pos.top+props.gap*-1}px`
                sty.left = `${pos.left + pos.width}px`
                sty.transform = `translate(-100%,-100%)`
            } else if(props.placement==='bottom') {
                sty.top = `${pos.top+pos.height+props.gap}px`
                sty.left = `${pos.left+pos.width/2}px`
                sty.transform = `translate(-50%,0)`
            } else if(props.placement === 'left') {
                sty.top = `${pos.top + pos.height/2}px`
                sty.left = `${pos.left + props.gap*-1}px`
                sty.transform = `translate(-100%, -50%)`
            } else if(props.placement==='right') {
                sty.top = `${pos.top + pos.height/2}px`
                sty.left = `${pos.left + pos.width + props.gap}px`
                sty.transform = `translate(0, -50%)`
            }
            return {..._p, style: sty}
        })
        if(props.trigger === 'hover') {
            useEvent(elem, 'mouseenter', ()=>{
                start(()=>{
                    getPos()
                    const p = get({
                        elem:elem.value,
                        placement:props.placement,
                        gap: props.gap,
                        offset:0
                    })
                    console.log(p)
                    // set({
                    //     elem:elem.value,
                    //     placement:props.placement,
                    //     gap: props.gap,
                    //     offset:0
                    // })
                    visible.value=true
                }, props.showDelay)
                
            })
            useEvent(elem, 'mouseleave',()=>{
                stop(()=>{
                    visible.value=false
                }, props.hideDelay)
                
            })

        } else if(props.trigger==='click') {
            useEvent(elem,'click',()=>{
                getPos()
                visible.value = !visible.value
            })
        }
        function getPos() {
            ({left:pos.left,top:pos.top,bottom:pos.bottom,right:pos.bottom,
                width:pos.width,height:pos.height} 
                = getElementPositionInPage(elem.value))
        }
        watch(()=>props.show,v=>{
            visible.value=v
        })
        watch(visible,v=>{
            ctx.emit('update:show',v)
        })
        function cont(c:any) {
            return <Teleport to={props.to}>{c}</Teleport>
        }
        return ()=>{
            const defaultSlot = ctx.slots.default?.()
            if(props.bind==='v-if') {
                return visible.value?cont(<div {...ps.value}>{defaultSlot}</div>): null
            }else if(props.bind==='v-show'){
                return cont(
                    <div v-show={visible.value} {...ps.value}>{defaultSlot}</div>
                )
            }
        }
    }
})