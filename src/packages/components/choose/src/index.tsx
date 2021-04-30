import {computed, defineComponent, ref} from 'vue'
import Overlay from '../../overlay'
import Icon from '../../icon'
import Close from '../../close'
import {isInvalidValue} from '../../../util'
import useToggle from '../../../use/useToggle'
const {transitionName,relateElement,...restOverlayProps} = Overlay.props
const OverlayProps = {
    ...restOverlayProps,
    placement: {
        type: String,default: 'bottom-start'
    },
    isEqualWidth: {
        type: Boolean,default: true
    },
    arrowOffsetPercent: {
        type: Number,default: 0.15
    },

}
const ChooseProps = {
    modelValue: [Number,String],
    placeholder: {
        type: String,default:'请选择请选择请选择请选择请选择请选择请选择请选择请选择'
    }

}

export default defineComponent({
    name:'Choose',
    components: {Overlay,Icon,Close},
    props: {
        ...OverlayProps,
        //以上是Overlay的参数
        //以下是Choose的参数
        ...ChooseProps
    },
    emits: [
        'update:show','update:modelValue'
    ],
    setup(props,{emit,attrs,slots}) {

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
                style: {
                    padding: '5px 0'
                },
                "onUpdate:show":(v:any)=>{
                    emit('update:show',v)
                }
            }
            return o
        })

        const _slots = computed(()=>({
            default: ()=>slots.default?.(),
            title: titleFn
        }))

        function titleFn() {
            return (
                <div {...chooseProps.value}>
                    <span class="k-choose-placeholder">{props.placeholder}</span>
                    <span class="k-choose-right-icon">
                    <Close size="14" /></span>
                </div>
            )
        }

        return () => {
            return (
                <Overlay {...overlayProps.value} v-slots={_slots.value} />
            )
        }
    }
})