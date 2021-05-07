import {computed, defineComponent, ref} from 'vue'
import {filterListeners} from '../../../util'
export default defineComponent({
    name:'Write',
    inheritAttrs:false,
    props: {
        block: Boolean,
        disabled: Boolean,
        readonly: Boolean,
        simple: Boolean,
        type: {
            type: String,
            default: 'text'
        },
        maxlength: [String,Number],
        minlength: [String,Number]
    },
    setup(props,{emit,slots,attrs}) {
        const wrapperProps = computed(()=>{
            const o:any = {
                class: [
                    'k-write',
                    {
                        'k-write--block': props.block,
                        'k-write--simple': props.simple,
                        'k-write--disabled': props.disabled
                    }
                ]
            }
            return o
        })
        const inputProps = computed(()=>{
            // console.log(Object.keys(props), attrs)
            const listeners = filterListeners(attrs)
            let t = props.type
            const o:any = {
                class: [
                    'k-write-input'
                ],
                type: t,
                ...listeners,
                
            }
            return o
        })
        return ()=>{
            let prepend = null, append= null
            if(slots.prepend) {
                prepend = (
                    <div class="k-write-prepend">{slots.prepend()}</div>
                )
            }
            if(slots.append || slots.default) {
                const d = slots.append || slots.default
                append = (
                    <div class="k-write-append">{d!()}</div>
                )
            }
            return (
                <div {...wrapperProps.value}>
                    {prepend}
                    <input {...inputProps.value} />
                    {append}
                </div>
            )
        }
    }
})