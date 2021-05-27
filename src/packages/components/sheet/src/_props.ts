export default {
  data: Array,
  columns: Array,
  stripe: Boolean,
  hover: { type: Boolean, default: true },
  nowrap: { type: Boolean, default: true },
  height: String,
  maxHeight: String,
  autoWidth: Boolean,
  hasCheckbox: Boolean,
  hasRadio: Boolean,
  hasAction: Boolean,
  hasIndex: Boolean,
  indexContent: { type: String, default: "#" },
  pageSize: [String, Number],
  pageIndex: [String, Number]
}
