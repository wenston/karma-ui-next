import { computed, defineComponent, ref, onMounted, SetupContext, watch, h } from "vue"
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
    }
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
    bodyClass: [String,Array,Object],
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
        const visible = ref(props.show)

        const overlayProps = computed(()=> {
            const o:any = {
                show: visible.value,
                bind: props.bind,
                toBody: props.toBody,
                hasArrow: false,
                gap: 0,
                isFixed: true,
                class: 'k-popup',
                "onUpdate:show":(v:any)=> {
                    visible.value=v
                }
            }
            return o
        })
        async function onClose(e:any) {
            try {
                if(props.beforeCancel) {
                    await props.beforeCancel()
                    visible.value=false
                    emit('after-cancel')
                } else {
                    visible.value=false
                    emit('after-cancel')
                }
            } catch(err) {
                console.warn(err)
            }
        }
        function onOk(e:any) {
            emit('after-ok')
        }
        function Header() {
            if(props.hasHeader) {
                return (
                    <div class="k-popup__header">
                        <span class="k-popup__title">{props.title}</span>
                        <Close onClick={onClose} />
                    </div>
                )
            }
        }
        /**
         * 这里为什么要用h的方法，因为jsx给Bouton绑定事件出现类型上的问题！
         * 为什么？？？？
         * <Bouton onClick={onClose}>{props.cancelText}</Bouton
         */

        /**
         * 
         *  需要注意的一点：Bouton组件有个默认插槽，此默认插槽应这样写：default(){return props.okText}
         *  而不是直接 传入props.okText
         *  否则vue将给出警告：
         * [Vue warn]: Non-function value encountered for default slot. Prefer function
         */
        function cancelBtn() {
            return h(Bouton, {onClick:(e:any)=>{onClose(e)}}, {default:()=>props.cancelText})
        }
        function okBtn() {
            return h(Bouton, {
                onClick:onOk,
                type: 'primary'
            },{default:()=>props.okText})
        }
        function getFooterSlots(){return (<div>
            {slots.footer?.() || [
                cancelBtn(),okBtn()
            ]}
        </div>)}

        function btn() {
            return <Bouton v-slots={{
                default() {
                    return props.okText
                }
            }}></Bouton>
        }

        watch(()=>props.show,v=>{visible.value=v})
        watch(visible,v=>{emit("update:show",v)})
        return ()=> {
            const defaultSlots = slots.default?.()
            const prependSlots = <div>{slots['footer-prepend']?.()}</div>
            const overlay_slots = {
                title:()=> slots.title?.(),
                default:()=>(
                    <>
                        {Header()}
                        <div class={['k-popup__body',props.bodyClass]}>
                            {defaultSlots}
                        </div>
                        <div class="k-popup__footer">
                            {prependSlots}
                            {getFooterSlots()}
                        </div>
                    </>
                )
            }
            return (<Overlay {...overlayProps.value} v-slots={overlay_slots}  />)
        }
    }
})