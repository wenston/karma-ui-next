export default {
  data: Array,
  columns: [Array, Function],
  stripe: Boolean,
  hover: { type: Boolean, default: true },
  nowrap: { type: Boolean, default: true },
  height: String,
  maxHeight: String,
  autoWidth: Boolean,
  hasCheckbox: Boolean,
  checkable: Function, //返回{checked:boolean,disabled:boolean}//选中状态，能否点选
  checkboxKey: { type: String, default: "Id" },
  keys: { type: Array, default: () => [] }, //用于checkboxKey的双向绑定
  hasRadio: Boolean,
  radioKey: { type: String, default: "Id" },
  hasAction: Boolean,
  hasIndex: Boolean,
  indexContent: { type: String, default: "#" },
  pageSize: [String, Number],
  pageIndex: [String, Number]
}
