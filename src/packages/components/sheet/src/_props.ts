export default {
  data: Array,
  columns: Array,
  stripe: Boolean,
  hover: { type: Boolean, default: true },
  nowrap: { type: Boolean, default: true },
  height: String,
  maxHeight: String,
  width: { type: String, default: "min-content" }, //取值'auto'，'min-content'
  hasCheckbox: Boolean,
  hasRadio: Boolean,
  hasIndex: Boolean,
  hasAction: Boolean
}
