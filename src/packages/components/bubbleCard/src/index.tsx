import type {SetupContext, DirectiveArguments} from 'vue'
import { defineComponent, ref, cloneVNode, watch, computed } from 'vue'
import {withDirectives, resolveDirective} from 'vue'
import clickOutside from '../../../directives/clickOutside'
import Overlay from '../../overlay'
import useSlot from '../../../use/useSlot'
export default defineComponent({
    inheritAttrs: false,
    components: {Overlay},
    directives: {clickOutside},
    props: {
        ...Overlay.props,
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
        const overlay = ref(null)
        const titleSlot = slots.title?.()
        const defaultSlot = slots.default?.()
        console.log(titleSlot)
        watch(()=>props.show,v=>{
            visible.value=v
        })
        watch(visible,v=>{
            emit('update:show',v)
        })
        const op = computed(()=>{
            const _ = {
                ...props,
                show:visible.value,
                ref:overlay,
                style: {
                    '--__overlay-background-color': 'rgba(255,255,255,.95)',
                    '--__overlay-text-color': '#666',
                    '--__overlay-z-index': 2000
                },
                "onUpdate:show":toggle
            }
            return _
        })
        function toggle(v:boolean) {
            visible.value=v
        }
        // const _titleSlot = computed(()=>useSlot(
        //     {slot:slots.title!,tag:props.tag}))
        const {_titleSlot} = useSlot({slot:slots.title!,tag:props.tag})
        return ()=> {
            let t = <span />
            if(_titleSlot.value.length) {
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
            return (
                <>
                    {trigger}
                    {_titleSlot.value.slice(1)}
                    <Overlay {...op.value} relate-element={relateElement}>{defaultSlot}</Overlay>
                </>
            )
        }
    }
})