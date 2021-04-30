import {computed, defineComponent, onMounted, ref} from 'vue'

export default defineComponent({
    props: {
        tag: {type: String,default:'div'}
    },
    setup(props,{slots,emit,attrs}) {
        const tag = props.tag
        onMounted(()=>{
            console.log('item onMounted')
        })
        const itemProps = computed(()=>{
            return {
                class:'k-item'
            }
        })
        return ()=> {

            return (
                <tag {...itemProps.value}>{slots.default?.()}</tag>
            )
            
        }
    }
})