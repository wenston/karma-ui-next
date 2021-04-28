import {defineComponent, computed} from 'vue'
import Icon from '../../icon'
export default defineComponent({
    setup(props) {
        const iconName = computed(()=>{
            return props.name??'k-icon-close-fill'
        })
        return ()=>{
            return (
                <Icon name={iconName.value} class="k-close" />
            )
        }
    },
    props: {
        ...Icon.props
    }
})