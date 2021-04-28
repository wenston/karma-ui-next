import { computed, defineComponent, ref, onMounted, SetupContext } from "vue"
import {hasUnit} from '../../../util'
import Overlay from '../../overlay'
import Icon from '../../icon'
import Bouton from '../../bouton'
import Close from '../../close'
const OverlayProps = {
    ...Overlay.props,
    bind: {
        type: String,default: 'v-if'
    },
    toBody: {
        type: Boolean,default: true
    },
}
const PopupProps = {
    title: {
        type: String,
        default: ''
    },
    cancelText: {
        type: String,
        default: '取消'
    },
    okText: {
        type: String,
        default: '确定'
    },
    width: {
        type: [String,Number],
        default: '700px'
    },
    bodyClass: String,
    hasHeader: {
        type: Boolean,
        default: true
    },
    hasFooter: {
        type: Boolean,
        default: true
    },
    beforeCancel: Function
}
export default defineComponent({
    emits: [
        'update:show',
        'after-cancel',
        'after-ok'
    ],
    components: {
        Overlay,Icon, Bouton, Close
    },
    props: {
        ...OverlayProps,...PopupProps,
    },
    setup(props,{emit,slots,attrs}:SetupContext) {


        const overlayProps = computed(()=> {
            const o:any = {
                show: props.show,
                bind: props.bind,
                toBody: props.toBody,
                hasArrow: false,
                gap: 0
            }
            return o
        })
        return ()=> {
            const overlay_slots = {
                title:()=> slots.title?.(),
                default:()=>{
                    const defaultSlots = slots.default?.()
                    const prependSlots = slots['footer-prepend']?.()
                    return (
                        <>
                            {defaultSlots}
                            {prependSlots}
                        </>
                    )
                }
            }
            return <Overlay {...overlayProps.value} v-slots={overlay_slots} />
        }
    }
})