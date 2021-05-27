import {defineComponent} from 'vue'
import Cell from './_cell'
import Checkbox from '../../checkbox'
import Radio from '../../radio'
import {IS_PRESET} from './_use'

export default defineComponent({
    components: {Cell,Checkbox,Radio},
    props: {
        //columns是加工处理过的
        columns: Array,
        indexContent: [String,Object],
        hasIndex: Boolean,
        hasCheckbox: Boolean,
        hasRadio: Boolean,
        hasAction: Boolean
    },
    setup(props,{attrs,emit,slots}) {

        function getRowspan(obj:any, max:number) {
            if (obj.children && obj.children.length !== 0) {
              return 1;
            }
            return max - obj.__level;
          }
        function getColspan(obj:any) {
            let arr = [],
                fn = (obj:any) => {
                if (obj.children && obj.children.length) {
                    obj.children.forEach((c:any) => {
                    fn(c);
                    });
                } else {
                    arr.push(obj);
                }
                };
            fn(obj);
            return arr.length || 1;
        }
        
        function renderTableHead() {
            //预置列数
            let presets = 0;
            let columns = props.columns??[];
            //记录总共行数
            let maxRowLength = 0;
            //记录单元格序列号
            let __index = 0;
            //标记每一行数据
            /**
             * addIndex，给每列添加一个index，对应col的序列
             *
             */
            let addIndex = (col:any, colChildren:any) => {
              if (colChildren.children && colChildren.children.length) {
                col.__index = col.__index + colChildren.children.length - 1;
                colChildren.children.forEach((c:any) => {
                  addIndex(col, c);
                });
              }
            };
            //addLevel标记层级，方便合并行和列
            let addLevel = (cols:any, i:number) => {
              cols.forEach((col:any) => {
                // if (this.$_is_built_in_column(col.field)) {
                //   presets += 1
                // }
                //__level代表了第几行tr
                col.__index = __index++;
                col.__level = i;
                if (maxRowLength < i) {
                  maxRowLength = i;
                }
                if (col.children && col.children.length) {
                  // col.__index = col.__index + col.children.length - 1
                  addIndex(col, col);
                  __index--;
                  addLevel(col.children, col.__level + 1);
                }
              });
            };
            //给数据添加行编号，方便后续循环时将单元格插入对应的行
            addLevel(columns, 0);
            //由于行号时从0开始的，所以要加1
            maxRowLength += 1;
            //预先创建好所有的行
            let trs:any[][] = Array.apply(null, ({ length: maxRowLength } as any)).map(() => []);
      
            let renderTd = (columns:any[]) => {
              columns.forEach((col, i, arr) => {
                const isPreset = false;//this.$_is_built_in_column(col.field)
                let content = null;
                // console.log(col.name , typeof col.name)
                if (typeof col.name === "function") {
                  content = col.name();
                } else {
                  content = col.name;
                }
                // console.log(col)
                if (props.hasIndex && col.field==='__preset_index__' /* && col.field === this.__index */) {
                  content = props.indexContent;
                }
                // if (this.hasAction && col.field === this.__action) {
                //   content = "操作"
                // }
                if (props.hasCheckbox /* && col.field === this.__checkbox */) {
                //   content = (
                //     <Checkbox
                //       checked={isCheckedAll.value}
                //       onChange={this.toggleCheckedAll}
                //     />
                //   );
                } else if (props.hasRadio/*  && col.field === this.__radio */) {
                  content = ""
                }
                const colspan = getColspan(col)
                const rowspan = getRowspan(col, maxRowLength)
      
                const cellProps = {
                  
                    colspan,
                    rowspan,
                    // resizeWidth: this.resizeWidth,
                    // presets,
                    // index: i,
                    tag: "th",
                    // sorter: (() => {
                    //   let b = true;
                    //   if (col.field && this.currentSorterField == col.field) {
                    //     b = this.currentSort
                    //   } else {
                    //     b = "sorter" in col
                    //   }
                    //   return b
                    // })()
                  
                  class: [
                    {
                      "k-cell--center":
                        colspan > 1 || IS_PRESET(col.field)
                    },
                    /* [
                      col.cellClass
                        ? this.$_get_td_class(null, null, col, { thead: true })
                        : ""
                    ] */
                  ],
                //   style: this.$_get_td_style(null, null, col, { thead: true }),
                };
      
                //如果有children，说明有列合并
                // trs[col.__level].push(<Cell {...cellProps}>{content}</Cell>);
                const _con = <Cell {...cellProps}>{content}</Cell>
                trs[col.__level].push(_con)
                if (col.children && col.children.length) {
                  renderTd(col.children);
                }
              })
            }
            renderTd(columns)
            return trs.map(tr => <tr>{tr}</tr>)
          }

        return ()=> {

            return renderTableHead()
        }
    }
})