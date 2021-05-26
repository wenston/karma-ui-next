import {computed, defineComponent} from 'vue'
export default defineComponent({
    props: {
        tag:{type:String,default:'td'},
    },
    setup(props,{slots}){
        const tag = props.tag
        const cellProps = computed(()=>{
            let o:any = {
                class: 'k-cell'
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