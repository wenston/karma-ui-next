import { computed, defineComponent, ref, onMounted, SetupContext } from "vue"
import {hasUnit} from '../../../util'
import Icon from '../../icon'
import Bouton from '../../bouton'
import Close from '../../close'
export default defineComponent({
    emits: [
        'update:modelValue',
        'after-cancel',
        'after-ok'
    ],
    components: {
        Icon, Bouton, Close
    },
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
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
    },
    setup(props,{emit,slots,attrs}:SetupContext) {
        return ()=> {
            return <div>dssdfsdf</div>
        }
    }
})