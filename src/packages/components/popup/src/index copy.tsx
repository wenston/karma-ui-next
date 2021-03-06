import { computed, defineComponent, ref, onMounted } from "vue"
import {hasUnit} from '../../../util'
import Mask from '../../mask'
import Icon from '../../icon'
import Bouton from '../../bouton'
import Close from '../../close'
export default defineComponent({
    setup(props, {slots,emit}) {
        const popup = ref(null)
        const width = computed(()=>{
            const _w = props.width
            return hasUnit(_w)?_w:`${_w}px`
        })
        async function onClose(e) {
            try {
                if(props.beforeCancel) {
                    await props.beforeCancel()
                    emit('update:modelValue', false)
                    emit('after-cancel')
                } else {
                    emit('after-cancel')
                    emit('update:modelValue', false)
                }
            } catch(err) {
                console.warn(err)
            }
        }
        function onOk() {
            emit('after-ok')
        }
        function rHeader() {
            if(props.hasHeader) {
                return (
                    <div class="k-popup__header">
                        <span class="k-popup__title">{props.title}</span>
                        <Close onClick={onClose} />
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
                        <Bouton onClick={onClose}>{props.cancelText}</Bouton>,
                        <Bouton type="primary"
                            onClick={onOk}>{props.okText}</Bouton>
                    ]
                }
                
                return (
                    <div class="k-popup__footer">
                        {
                            slots['footer-prepend']
                                ?<div>{slots['footer-prepend']()}</div>
                                :<span />
                        }
                        <div>{footerSlots}</div>
                    </div>
                )

            }
        }

        onMounted(()=>{
            popup.value?.focus()
        })
        
        return () => {
            if(props.modelValue) {
                return (
                    <Mask modelValue={props.modelValue} 
                        onUpdate:modelValue={
                            ()=>{
                                emit('update:modelValue', !props.modelValue)
                            }
                        }>
                        <div class="k-popup"
                            ref={popup}
                            tabindex="-1"
                            style={{width:width.value}}>
                            {rHeader()}
                            <div class={["k-popup__body",{[props.bodyClass]:!!props.bodyClass}]}>
                                {
                                    slots.default?.()
                                }
                            </div>
                            {rFooter()}
                        </div>
                    </Mask>
                    )
                }
            }
    },
    emits: [
        'update:modelValue',
        'after-cancel',
        'after-ok'
    ],
    components: {
        Mask, Icon, Bouton, Close
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
})