import {computed, defineComponent, Ref, inject} from 'vue'
import Cell from './_cell'
import Checkbox from '../../checkbox'
import Icon from '../../icon'
import {IS_PRESET,IS_ACTION,IS_CHECKBOX,IS_INDEX,IS_RADIO} from './_use'
import {getAlign,getSelectedKey} from './_util'
export default defineComponent({
    components: {Cell,Checkbox,Icon},
    props: {
        columns: Array,
        data: Array,
        hasIndex: Boolean,
        pageIndex: {type:[String, Number]},
        pageSize: {type: [String, Number]},
        tbodySlots: Object,
        checkboxKey: String,
        radioKey: String,
        hasCheckbox:Boolean,
        hasRadio:Boolean,
        isCheckedAll: Number,//0,1
        checkable: Function
    },
    setup(props,{emit,attrs}) {
        const isCheckedAll = inject('isCheckedAll') as Ref<number>
        const selectedKeys = inject('selectedKeys') as Ref<string[]>
        const toggleSelect = inject('toggleSelect') as Function
        const hasKey = inject('hasKey') as Function
        const pi = computed(()=>props.pageIndex?Number(props.pageIndex):0)
        const ps = computed(()=>props.pageSize?Number(props.pageSize):0)
        //row是一行数据，col是columns里的其中一列, index是第几行
        function renderTd(
            row:any,col:any,index:number,checked:boolean,
            isChecked:boolean,disabled:boolean
        ) {
            const tdProps:any = {
                align:getAlign(col)?.tbody
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
                } else if(IS_CHECKBOX(col.field)) {
                    let iconName = 'k-icon-checkbox'
                    if(checked || (isChecked && disabled)) {
                        iconName = 'k-icon-checkbox-fill'
                    }
                    if(disabled && !isChecked) {
                        iconName = 'k-icon-square'
                    }
                    cont = <Icon name={iconName}
                        class={['k-checkbox-icon',{
                            'k-checkbox-icon--checked':checked||isChecked,
                            'k-checkbox-icon--disabled':disabled
                            }]}
                         />
                }
                
            } else if(col.render) {
                cont = col.render(row,index)
            } else if(col.slot) {
                if(props.tbodySlots && props.tbodySlots[col.slot]) {
                    cont = props.tbodySlots[col.slot]({row,index})
                }
            } else if(col.field) {
                cont = row[col.field]
            }

            return (
                <Cell {...tdProps}>{cont}</Cell>
            )
        }
        function renderTr(row:any,index:number) {
            const checkboxValue = getSelectedKey(row,props.checkboxKey??'Id')
            const checked = hasKey(checkboxValue)
            let isChecked=false,disabled=false
            if(props.checkable) {
                ({checked:isChecked,disabled} = props.checkable(row,index))
            }
            const trProps:any = {
                class: {
                    'k-sheet-tr--checked': checked
                }
                
            }
            if(!disabled) {
                trProps.onClick = ()=>{toggleSelect(checkboxValue,checked)}
            }
            const tds = (props.columns??[]).map((col:any)=>{
                //isChecked是在disabled时用的
                return renderTd(row,col,index,checked, isChecked,disabled)
            })
            return <tr {...trProps}>{tds}</tr>
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
