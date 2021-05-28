<template>
  <h1>Sheet 表格</h1>
  <div style="padding:15px 0;">
    <div style="margin-bottom:10px;">
      <Checkbox v-model="isAuto"
        :value="[false,true]">宽度自动</Checkbox>
      <Checkbox v-model="hasIndex"
        :value="[false,true]">带序号</Checkbox>
      <!-- <Bouton @click="isAuto=!isAuto"
        :type="isAuto?'primary':'default'">宽度自动</Bouton>
      <Bouton @click="hasIndex=!hasIndex"
        :type="hasIndex?'primary':'default'">带序号</Bouton> -->
    </div>

    <Sheet :data='D'
      :columns="columns"
      :autoWidth="isAuto"
      stripe
      :hasIndex="hasIndex"
      height="calc(100vh - 140px)">
      <template #status="{row,index}">
        <template v-if="row.Status===11">状态11</template>
        <template v-else-if="row.Status===3">已完成</template>
        <template v-else>12退货</template>
      </template>
    </Sheet>
  </div>
</template>
<script lang="tsx">
import { defineComponent, ref, computed } from "vue"
import Sheet from "../packages/components/sheet"
import Data from "./test-data/sheet"
import Bouton from "../packages/components/bouton"
import Checkbox from "../packages/components/checkbox"
export default defineComponent({
  components: { Sheet, Bouton, Checkbox },
  setup() {
    const a = ref(0)
    const D = ref(Data)
    const isAuto = ref(true)
    const hasIndex = ref(true)
    function columns() {
      return [
        {
          name: "单号",
          field: "BillCode",
          style: { width: 140 },
          //是否锁定该列的宽度，只在autoWidth为true时有用，虽然锁定，但仍然可以通过拖拽调整宽度！
          lockWidth: true,
        },
        {
          name: "状态",
          field: "Status",
          style: { width: 70 },
          slot: "status",
          lockWidth: true,
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
          lockWidth: true,
          align: "right",
          render: (row: any, index: number) => {
            return (
              <span style="color:var(--k-color-danger)">{row.TotalPrice}</span>
            )
          },
        },
        {
          name: "收货单位",
          children: [
            {
              name: "收货仓库",
              field: "StoreName",
              children: [
                { name: "A", style: { width: 40 }, lockWidth: true },
                { name: "B" },
              ],
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
      ]
    }
    return {
      a,
      D,
      isAuto,
      hasIndex,
      columns,
    }
  },
})
</script>