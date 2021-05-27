import {computed, defineComponent} from 'vue'
export default defineComponent({
    props: {
        tag:{type:String,default:'td'},
        align: {type:String},//center
        isNarrow: Boolean
    },
    setup(props,{slots}){
        const tag = props.tag
        const cellProps = computed(()=>{
            let o:any = {
                class: ['k-cell',{
                    'k-cell--center':props.align==='center',
                    'k-cell--narrow':props.isNarrow
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