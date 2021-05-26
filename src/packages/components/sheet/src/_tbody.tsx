import {defineComponent} from 'vue'
import Cell from './_cell'
export default defineComponent({
    components: {Cell},
    props: {
        columns: Array,
        data: Array
    },
    setup(props,{emit,attrs,slots}) {
        //row是一行数据，col是columns里的其中一列
        function renderTd(row:any,col:any) {
            let cont:any
            if(col.field) {
                cont = row[col.field]
            }
            return (
                <Cell>{cont}</Cell>
            )
        }
        function renderTr(row:any) {
            const tds = (props.columns??[]).map((col:any)=>{
                return renderTd(row,col)
            })
            return <tr>{tds}</tr>
        }
        function renderBody() {
            return (props.data??[]).map((row,i)=>{
                return renderTr(row)
            })
        }
        return ()=> {
            return renderBody()
        }
    }
})