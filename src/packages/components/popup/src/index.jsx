import { computed, defineComponent } from "vue"
import {hasUnit} from '../../../util'
import Mask from '../../mask'
import Icon from '../../icon'
import Button from '../../button'
export default defineComponent({
    setup(props, {slots,emit}) {
        const width = computed(()=>{
            const _w = props.width
            return hasUnit(_w)?_w:`${_w}px`
        })
        function onClose(e) {
            emit('update:modelValue', false)
        }
        function rHeader() {
            if(props.hasHeader) {
                return (
                    <div class="k-popup__header">
                        <span class="k-popup__title">{props.title}</span>
                        <Icon name="k-icon-close-fill" 
                            onClick={onClose} />
                    </div>
                )
            }
        }
        function rFooter() {
            if(props.hasFooter) {
                let footerSlots = null
                if(slots.footer) {
                    footerSlots = slots.footer()
                } else {
                    footerSlots = [
                        <Button >{props.cancelText}</Button>,
                        <Button type="primary">{props.okText}</Button>
                    ]
                }
                
                return (
                    <div class="k-popup__footer">
                        {footerSlots}
                    </div>
                )

            }
        }
        return () => (
            <Mask modelValue={props.modelValue} 
                onUpdate:modelValue={
                    ()=>{
                        emit('update:modelValue', !props.modelValue)
                    }
                }>
                <div class="k-popup"
                    style={{width:width.value}}>
                    {rHeader()}
                    <div class="k-popup__body">
                        {
                            slots.default?.()
                        }
                    </div>
                    {rFooter()}
                </div>
            </Mask>
        )
    },
    emits: ['update:modelValue'],
    components: {
        Mask, Icon, Button
    },
    props: {
        ...Mask.props,
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
        hasHeader: {
            type: Boolean,
            default: true
        },
        hasFooter: {
            type: Boolean,
            default: true
        }
    },
})