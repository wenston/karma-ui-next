<template>
  <h1>Sheet 表格</h1>
  <div style="padding:15px 0;">
    <Sheet :data='D'
      :columns="columns"
      stripe
      width="auto"
      height="calc(100vh - 120px)"></Sheet>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue"
import Sheet from "../packages/components/sheet"
import Data from "./test-data/sheet"
export default defineComponent({
  components: { Sheet },
  setup() {
    const a = ref(0)
    const D = ref(Data)
    const columns = computed(() => [
      {
        name: "单号",
        field: "BillCode",
        style: { width: 140 },
      },
      {
        name: "状态",
        field: "Status",
        style: { width: 50 },
      },
      {
        name: "供应商",
        field: "SupplierName",
        style: { width: 250 },
      },
      {
        name: "金额",
        field: "TotalPrice",
        style: { width: 70 },
      },
      {
        name: "收货单位",
        children: [
          {
            name: "收货仓库",
            field: "StoreName",
            children: [{ name: "A" }, { name: "B" }],
          },
          {
            name: "门店",
            field: "BranchName",
            style: { width: 213 },
          },
          {
            name: "部门",
            field: "",
            children: [
              { name: "部门C", style: { width: 76 } },
              { name: "部门D", style: { width: 60 } },
            ],
          },
        ],
      },

      // {
      //   name: "发票类型",
      // },
      // {
      //   name: "交易类型",
      // },
      // {
      //   name: "商品",
      // },
      // {
      //   name: "经手人",
      //   field: "Handler",
      // },
      // {
      //   name: "制单人",
      //   field: "CreatedUserName",
      // },
      // {
      //   name: "制单时间",
      // },
      // {
      //   name: "备注",
      // },
    ])
    return {
      a,
      D,
      columns,
    }
  },
})
</script>