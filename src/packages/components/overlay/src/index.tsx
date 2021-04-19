/**
 * 覆盖层，用以辅助展示一些东西，给出一个relateElement时，会根据此元素定位
 */
import { defineComponent, Teleport, reactive, ref,watch, computed } from 'vue';
import useEvent from '../../../use/useEvent'
import {getElementPositionInPage} from '../../../util'
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
        direction: {
            type: String,
            default: 'top'
        },
        gap: {
            type: Number,
            default: 9
        }
    },
    emits: ['update:show'],
    setup(props, ctx){
        const visible = ref(props.show)
        const elem = ref(props.relateElement)
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
                    'k-overlay'
                ]
            }
            let sty = {
                top: '',left: '', transform: ''
            }
            if(props.direction==='top') {
                sty.top = `${pos.top+props.gap*-1}px`
                sty.left = `${pos.left+pos.width/2}px`,
                sty.transform = `translate(-50%,-100%)`
            }
            return {..._p, style: sty}
        })
        if(props.trigger === 'hover') {
            useEvent(elem, 'mouseenter', ()=>{
                getPos()
                visible.value=true
            })
            useEvent(elem, 'mouseleave',()=>{
                visible.value=false
            })

        } else if(props.trigger==='click') {
            useEvent(elem,'click',()=>{
                getPos()
                ctx.emit('update:show', !visible.value)
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
        return ()=>{
            const defaultSlot = ctx.slots.default?.()
            const cont = (<Teleport to={props.to}>
                <div {...ps.value}>{defaultSlot}</div>
            </Teleport>)
            if(props.bind==='v-if') {
                return visible.value?cont: null
            }else{
                
            }
        }
    }
})