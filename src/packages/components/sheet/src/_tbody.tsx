import {computed, defineComponent} from 'vue'
import Cell from './_cell'
import {IS_PRESET,IS_ACTION,IS_CHECKBOX,IS_INDEX,IS_RADIO} from './_use'
import {getAlign} from './_util'
export default defineComponent({
    components: {Cell},
    props: {
        columns: Array,
        data: Array,
        hasIndex: Boolean,
        pageIndex: {type:[String, Number]},
        pageSize: {type: [String, Number]}
    },
    setup(props,{emit,attrs,slots}) {
        const pi = computed(()=>props.pageIndex?Number(props.pageIndex):0)
        const ps = computed(()=>props.pageSize?Number(props.pageSize):0)
        //row是一行数据，col是columns里的其中一列, index是第几行
        function renderTd(row:any,col:any,index:number) {
            const tdProps:any = {
                align: getAlign(col)?.tbody
            }
            let cont:any
            //处理预置列
            if(IS_PRESET(col.field)) {
                tdProps.align = 'center'
                tdProps.isNarrow=true
                if(IS_INDEX(col.field)) {
                    cont = index + 1
                    if(pi.value && ps.value) {
                        cont = ps.value * (pi.value - 1) + cont

                    }
                }
            } else if(col.render) {
                cont = col.render(row,index)
            } else if(col.field) {
                cont = row[col.field]
            }
            return (
                <Cell {...tdProps}>{cont}</Cell>
            )
        }
        function renderTr(row:any,index:number) {
            const tds = (props.columns??[]).map((col:any)=>{
                return renderTd(row,col,index)
            })
            return <tr>{tds}</tr>
        }
        function renderBody() {
            return (props.data??[]).map((row,i)=>{
                return renderTr(row,i)
            })
        }
        return ()=> {
            return renderBody()
        }
    }
})
