import {defineComponent, computed} from 'vue'
import Icon from '../../icon'
export default defineComponent({
    setup(props) {
        const iconName = computed(()=>{
            return props.name??'k-icon-close'
        })
        const p = computed(()=>{
            return {
                name:iconName.value,
                size: props.size,
                class: 'k-close'
            }
        })
        return ()=>{
            return (
                <Icon {...p.value} />
            )
        }
    },
    props: {
        ...Icon.props
    }
})