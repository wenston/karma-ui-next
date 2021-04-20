/**
 * 覆盖层，用以辅助展示一些东西，给出一个relateElement时，会根据此元素定位
 */
import { defineComponent, Teleport, ref,watch, computed } from 'vue';
import useEvent from '../../../use/useEvent'
import useDelay from '../../../use/useDelay'
import usePlacement from '../../../use/usePlacement'

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
            type: HTMLElement,
            default: ()=>document.body
        },
        placement: {
            type: String,
            default: 'top'
        },
        gap: {
            type: Number,
            default: 8
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
        const root=ref<any>(null)
        const visible = ref(props.show)
        const elem = ref(props.relateElement)
        const {start,stop} = useDelay()
        const {getPlace,place} = usePlacement({
            relateElement: elem,
            el: root,
            placement: props.placement,
            gap: props.gap
        })
        const overlayProps = computed(()=>{
            const _class = [
                ctx.attrs.class,
                'k-overlay',
                [`k-overlay--${props.placement}`]
            ]
            const style = {
                left: place.left,top:place.top,transform:place.transform
            }
            const o: {[key:string]:any} = {
                class:_class,style,ref:root
            }
            if(props.bind==='v-show') {
                o['v-show'] = visible.value
            }
            return  o
        })

        if(props.trigger === 'hover') {
            useEvent(elem, 'mouseenter', ()=>{
                start(()=>{
                    getPlace()
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
                getPlace()
                visible.value = !visible.value
            })
        }

        watch(()=>props.show,v=>{
            visible.value=v
            console.log('overlay:',v)
        })
        watch(visible,v=>{
            ctx.emit('update:show',v)
        })
        function cont(c:any) {
            return <Teleport to={props.to}>{c}</Teleport>//一样
        }
        return ()=>{
            const defaultSlot = ctx.slots.default?.()
            const main = cont(<div  {...overlayProps.value}>{defaultSlot}</div>)

            if(props.bind==='v-if') {
                return visible.value?main:null
            }else if(props.bind==='v-show') {
                return main
            }
        }
    }
})