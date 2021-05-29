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
  checkKey: { type: String, default: "Id" }, //用于checkbox或者radio的选择
  keys: { type: Array, default: () => [] }, //用于checkboxKey的双向绑定
  hasRadio: Boolean,
  modelValue: [String, Number],
  hasAction: [Boolean, Array, String], //true/false,['add','delete'],'add'/'delete'
  hasIndex: Boolean,
  indexContent: { type: String, default: "#" },
  pageSize: [String, Number],
  pageIndex: [String, Number]
}
