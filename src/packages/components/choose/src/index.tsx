import {computed, defineComponent, ref} from 'vue'
import Overlay from '../../overlay'
import {isInvalidValue} from '../../../util'
import useToggle from '../../../use/useToggle'
const {transitionName,relateElement,...restOverlayProps} = Overlay.props
export default defineComponent({
    components: {Overlay},
    props: {
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
        //以上是Overlay的参数
        //以下是Choose的参数
        modelValue: [Number,String],
        placeholder: {
            type: String,default:'请选择'
        }
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
                <div {...chooseProps.value}>请选择</div>
            )
        }

        return () => {
            return (
                <Overlay {...overlayProps.value} v-slots={_slots.value} />
            )
        }
    }
})