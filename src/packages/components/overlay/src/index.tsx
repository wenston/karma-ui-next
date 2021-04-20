/**
 * 覆盖层，用以辅助展示一些东西，给出一个relateElement时，会根据此元素定位
 */
import { defineComponent, Teleport, ref,watch, computed, h } from 'vue';
import {withDirectives, resolveDirective} from 'vue'
import clickOutside from '../../../directives/clickOutside'
import useEvent from '../../../use/useEvent'
import useDelay from '../../../use/useDelay'
import usePlacement from '../../../use/usePlacement'

export default defineComponent({
    inheritAttrs: false,
    directives: {
        clickOutside
    },
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
        const clickOutside = resolveDirective('clickOutside')
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
            return  {
                class:_class, style
            }
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
                if(props.trigger==='click') {
                    if(visible.value) {
                        return withDirectives(
                            h('div',overlayProps.value,defaultSlot),
                            [
                                [clickOutside!, ()=>{visible.value=false}]
                            ]
                        )
                    }
                }
                return visible.value?cont(<div {...overlayProps.value}>{defaultSlot}</div>): null
            }else if(props.bind==='v-show'){
                if(props.trigger === 'click') {
                    return withDirectives(
                        cont(
                            <div v-show={visible.value}  {...overlayProps.value}>{defaultSlot}</div>
                        ),
                        [[clickOutside!, ()=>{visible.value=false}]]
                    )
                }
                return cont(
                    <div v-show={visible.value}  {...overlayProps.value}>{defaultSlot}</div>
                )
            }
        }
    }
})