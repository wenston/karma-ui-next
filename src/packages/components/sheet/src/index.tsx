import {computed, defineComponent,onMounted,reactive,ref,toRefs} from 'vue'
import {getBoundingClientRect} from '../../../util'
import Thead from './_thead'
import Tbody from './_tbody'
import _props from './_props'
import {useTdWidth,useColumns} from './_use'
import {createTbodyColumns} from './_util'
export default defineComponent({
    components: {Thead,Tbody},
    props: _props,
    setup(props,{emit,attrs,slots}) {
        const tableRoot = ref()
        const inner = ref()
        const innerProps = computed(()=>{
            let o:any = {
                ref:inner,
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
        const finalColumns = useColumns(
            computed(()=>props.columns),
            computed(()=>({
                indexContent:props.indexContent,
                hasIndex: props.hasIndex,
                hasCheckbox: props.hasCheckbox,
                hasRadio: props.hasRadio,
                hasAction: props.hasAction
            })))
        const tbodyColumns = computed(()=>createTbodyColumns(finalColumns.value))
        const theadProps = computed(()=>{
            let o:any = {
                columns: finalColumns.value,
                hasIndex: props.hasIndex,
                indexContent:props.indexContent
            }
            return o
        })
        const tbodyProps = computed(()=>{
            let o:any = {
                columns: tbodyColumns.value,
                data: props.data,
                hasIndex: props.hasIndex,
                pageSize: props.pageSize,
                pageIndex: props.pageIndex
            }
            return o
        })

        const tdWidths = useTdWidth(
            computed(()=>props.autoWidth), inner, tbodyColumns)


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

function colGroup(widths:number[]){
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



