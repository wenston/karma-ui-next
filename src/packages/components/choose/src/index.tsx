import {computed, defineComponent, onMounted, reactive, toRef,ref,Ref, provide, watch, getCurrentInstance} from 'vue'
import Overlay from '../../overlay'
import Icon from '../../icon'
import Close from '../../close'
import {isInvalidValue, getBoundingClientRect} from '../../../util'
import useToggle from '../../../use/useToggle'
import useWindowSize from '../../../use/useWindowSize'
import useEvent from '../../../use/useEvent'
import useTouchBottom from '../../../use/useTouchBottom'
const {transitionName,relateElement,...restOverlayProps} = Overlay.props
const OverlayProps = {
    ...restOverlayProps,
    bind: {type: String,default:'v-show'},
    placement: {
        type: String,default: 'bottom-start'
    },
    isEqualWidth: {
        type: Boolean,default: true
    },
    arrowOffsetPercent: {
        type: Number,default: 0.15
    }

}
const ChooseProps = {
    modelValue: [Number,String],
    placeholder: {
        type: String,default:'请选择'
    }

}

export default defineComponent({
    name:'Choose',
    components: {Overlay,Icon,Close},
    props: {
        ...OverlayProps,
        ...ChooseProps
    },
    emits: [
        'update:show','update:modelValue','change'
    ],
    setup(props,{emit,attrs,slots}) {
        const scroll = ref(null)
        const titleSize = reactive({bottom:0})
        const visible = ref(props.show)
        const modelValue:Ref<string|number> = toRef(props,'modelValue')
        const curText = ref('')
        const item = ref<HTMLElement|null>(null)

        const chooseProps = computed(()=>{
            const o = {
                class: [
                    'k-choose',
                    {'k-choose-placeholder':isInvalidValue(props.modelValue)}],
                tabindex: 0
            }
            return o
        })

        const overlayProps = computed(()=>{
            const o = {
                ...props,
                show: visible.value,
                style: {
                    padding: '0'
                },
                "onUpdate:show":(v:any)=>{
                    visible.value=v
                },
                "onGet-relate-element-rect":(r:any)=>{
                    titleSize.bottom = r.bottom
                },
                "onAfter-enter":()=> {
                    if(item.value) {
                        // item.value.scrollIntoView({
                        //     behavior: 'smooth'
                        // })
                        item.value.focus()
                    }
                }
            }
            return o
        })

        const _slots = computed(()=>{
            const ps={
                style:{"max-height": `calc(100vh - ${titleSize.bottom}px - ${props.gap}px - 20px)`,
                "overflow": 'auto'},
                ref:scroll
            }
            return {
                default: ()=><div {...ps}>{slots.default?.()}</div>,
                title: titleFn
            }
        })

        useTouchBottom(scroll,onTouchBottom)

        function onTouchBottom() {
            // console.log('触底了！')
        }

        function clear(e:MouseEvent) {
            emit('update:modelValue','')
            curText.value = ''
            e.stopPropagation()
        }

        function titleFn() {
            const arrowIconStyle={
                transform: visible.value?'rotateX(-180deg)':'',
                transition: `var(--k-transition-enter)`
            }
            return (
                <div {...chooseProps.value}>
                    {curText.value?(
                        <span class="k-choose-text">{curText.value}</span>
                        ):
                        <span class="k-choose-placeholder">{props.placeholder}</span>}
                    <span class="k-choose-right-icon">
                        {modelValue.value?
                            <Close size="14" onClick={clear} />:(
                            <Icon name="k-icon-sort-down" size="20"
                                style={arrowIconStyle} />
                        )}
                    </span>
                </div>
            )
        }

        provide('currentModelValue', modelValue)
        provide('changeModelValue',(v:string|number,t: string)=>{
            emit('update:modelValue',v)
            emit('change',v,t)
            visible.value=false
        })
        provide('changeText',(t:string)=>{
            curText.value = t
            
        })
        provide('getElement',(elem:HTMLElement)=> {
            item.value = elem
        })
        // provide('getChildren',)

        watch(()=>props.show,v=>{
            visible.value=v
        })
        watch(visible,v=>{
            emit('update:show',v)
        })


        return () => {
            return (
                <>
                    <Overlay {...overlayProps.value} v-slots={_slots.value} />
                    {slots.use?.({
                        value: props.modelValue,
                        text: curText.value,
                        clear
                    })}
                </>
            )
        }
    }
})