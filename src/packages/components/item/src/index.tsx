import {computed, defineComponent, onMounted, ref,Ref, toRef, inject, watch, onUpdated} from 'vue'

export default defineComponent({
    name: 'Item',
    props: {
        tag: {type: String,default:'div'},
        value: {type:[String,Number],required:true},
        label: {type:String,required: true},
        disabled: Boolean,
    },
    emits: ['get-element'],
    setup(props,{slots,emit,attrs}) {
        const tag = props.tag
        const root = ref<unknown>(null)
        const v = toRef(props,'value')
        const currentModelValue = inject('currentModelValue') as Ref<number|string>
        const changeModelValue = inject('changeModelValue') as Function
        const changeText = inject('changeText') as Function
        const getElement = inject('getElement') as Function
        onMounted(toChangeText)
        const itemProps = computed(()=>{
            return {
                ref: root,
                tabindex: -1,
                class:[
                    'k-item',
                    {
                        'k-item--active':v.value===currentModelValue.value,
                        'k-item--disabled':props.disabled
                    }
                ],
                onClick:()=>{
                    if(!props.disabled) {
                        if(v.value!==currentModelValue.value) {
                            changeModelValue(v.value, props.label)
                            changeText(props.label)
                            if(root.value!==null) {
                                getElement(root.value)
                            }
                        }
                    }
                }
            }
        })
        function toChangeText() {
            if(v.value===currentModelValue.value) {
                changeText(props.label)
                if(root.value!==null) {
                    getElement(root.value)
                }
            }
        }
        return ()=> {
            return (
                <tag {...itemProps.value}>{slots.default?.()}</tag>
            )
            
        }
    }
})