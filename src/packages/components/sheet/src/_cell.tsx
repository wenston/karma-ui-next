import {computed, defineComponent,inject,ComputedRef} from 'vue'
export default defineComponent({
    props: {
        tag:{type:String,default:'td'},
        align: {type:String},//center
        isNarrow: Boolean,
        notBold: Boolean
    },
    setup(props,{slots}){
        const canResizeWidth = inject('canResizeWidth') as ComputedRef<boolean>
        const cellProps = computed(()=>{
            let o:any = {
                class: ['k-cell',{
                    'k-cell--center':props.align==='center',
                    'k-cell--right': props.align==='right',
                    'k-cell--narrow':props.isNarrow,
                    'k-cell--not-bold':props.notBold
                }],

            }
            return o
        })
        return ()=>{
            return (
                <props.tag {...cellProps.value}>{slots.default?.()}</props.tag>
            )
        }
    }
})