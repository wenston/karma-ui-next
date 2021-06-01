import {ref,computed, defineComponent,inject,ComputedRef, reactive} from 'vue'
export default defineComponent({
    props: {
        tag:{type:String,default:'td'},
        align: {type:String},//center
        isNarrow: Boolean,
        notBold: Boolean,
        resizeWidth: Boolean,
        colIndex: Number
    },
    setup(props,{slots}){
        const tdRoot = ref(null)
        const start = reactive({x: 0,y: 0})
        const end = reactive({x: 0,y:0})
        const beforeResize = inject('beforeResize') as Function
        const inResizing = inject('inResizing') as Function
        const afterResize = inject('afterResize') as Function
        const cellProps = computed(()=>{
            let o:any = {
                class: ['k-cell',{
                    'k-cell--center':props.align==='center',
                    'k-cell--right': props.align==='right',
                    'k-cell--narrow':props.isNarrow,
                    'k-cell--not-bold':props.notBold
                }],

            }
            if(props.resizeWidth) {
                o.ref = tdRoot
            }
            return o
        })
        function toResize(e:MouseEvent) {
            end.x = e.clientX
            inResizing(props.colIndex,end.x-start.x)
        }
        function handleMouseup(e:MouseEvent) {
            afterResize(props.colIndex, e.clientX - start.x)
            start.x = 0
            end.x = 0
            document.removeEventListener('mousemove',toResize)
            document.removeEventListener('mouseup',handleMouseup)
        }
        return ()=>{
            let line:any = null
            if(props.resizeWidth) {
                const lineProps = {
                    class:"k-cell-resize-line",
                    onMousedown:(e:MouseEvent)=> {
                        start.x = e.clientX
                        beforeResize(tdRoot.value)

                        document.addEventListener('mousemove', toResize)
                        document.addEventListener('mouseup', handleMouseup)
                    }

                }
                line =  (
                    <span {...lineProps}></span>
                )
            }
            
            return (
                <props.tag {...cellProps.value}>
                    {slots.default?.()}
                    {line}
                </props.tag>
            )
        }
    }
})