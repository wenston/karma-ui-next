import {computed, defineComponent} from 'vue'
export default defineComponent({
    props: {
        tag:{type:String,default:'td'},
        align: {type:String},//center
        isNarrow: Boolean,
        notBold: Boolean
    },
    setup(props,{slots}){
        const tag = props.tag
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
                <tag {...cellProps.value}>{slots.default?.()}</tag>
            )
        }
    }
})