import {computed, defineComponent,onMounted,ref} from 'vue'
import {getBoundingClientRect} from '../../../util'
import Thead from './_thead'
import Tbody from './_tbody'
import _props from './_props'
import useTdWidth from './_use'
import {createTbodyColumns} from './_util'
export default defineComponent({
    components: {Thead,Tbody},
    props: _props,
    setup(props,{emit,attrs,slots}) {
        const tableRoot = ref()
        const innerProps = computed(()=>{
            let o:any = {
                class: [
                    'k-sheet-inner-container',
                    'k-sheet--min-content',
                    {
                        'k-sheet--nowrap':props.nowrap,
                        'k-sheet--stripe':props.stripe,
                        'k-sheet--hover':props.hover,
                    }
                ],
                style:{
                    height: props.height,
                    maxHeight: props.maxHeight
                }
            }
            return o
        })
        //columns参数传入之后，加入预置列, 序列号、多选框、单选框
        const finalColumns = computed(()=>{

            return props.columns??[]
        })
        const tbodyColumns = computed(()=>createTbodyColumns(finalColumns.value))
        const theadProps = computed(()=>{
            let o:any = {
                columns: finalColumns.value
            }
            return o
        })
        const tbodyProps = computed(()=>{
            let o:any = {
                columns: tbodyColumns.value,
                data: props.data
            }
            return o
        })

        const tdWidths = useTdWidth(tableRoot, tbodyColumns)


        onMounted(()=>{
            
        })
        return ()=>{
            const thead = (
                <Thead {...theadProps.value}></Thead>
            )
            const tbody = (
                <Tbody {...tbodyProps.value} ></Tbody>
            )
            return (
                <div class="k-sheet-container" ref={tableRoot}>
                    <div {...innerProps.value}>
                        <div class="k-sheet-thead">
                            <table class="k-sheet">
                            {colGroup(tdWidths.value)}
                                <thead>
                                    {thead}
                                </thead>
                            </table>
                        </div>
                        <div class="k-sheet-tbody">
                            <table class="k-sheet">
                            
                            {colGroup(tdWidths.value)}
                                <tbody>
                                    {tbody}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
    }
})

function colGroup(widths:[]){
    return (
        <colgroup>
            {
                widths.map((w:any)=>{
                    return <col width={w} />
                })
            }
        </colgroup>
    )
}



