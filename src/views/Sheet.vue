<template>
  <h1>Sheet 表格</h1>
  <div style="padding:15px 0;">
    <div style="margin-bottom:10px;">
      <Checkbox v-model="isAuto"
        :value="[false,true]">宽度自动</Checkbox>
      <Checkbox v-model="hasIndex"
        :value="[false,true]">带序号</Checkbox>
      <Checkbox v-model="stripe"
        :value="[false,true]">隔行变色</Checkbox>
      <span style="padding-left: 30px;padding-right: 30px;">
        <Radio value='checkbox'
          v-model="ck">多选</Radio>
        <Radio value='radio'
          v-model="ck">单选</Radio>
      </span>
      <!-- <Bouton @click="isAuto=!isAuto"
        :type="isAuto?'primary':'default'">宽度自动</Bouton>
      <Bouton @click="hasIndex=!hasIndex"
        :type="hasIndex?'primary':'default'">带序号</Bouton> -->
    </div>

    <Sheet :data='D.slice(0)'
      :columns="columns"
      :autoWidth="isAuto"
      :stripe="stripe"
      :hasIndex="hasIndex"
      :hasCheckbox="ck==='checkbox'"
      checkKey="BillCode"
      v-model:keys="keys"
      v-model="currentKey"
      :checkable="checkable"
      :hasRadio="ck==='radio'"
      @after-checked="afterChecked"
      height="calc(70vh - 100px)">
      <template #status="{row}">
        <template v-if="row.Status===11">状态11</template>
        <template v-else-if="row.Status===3">已完成</template>
        <template v-else>12退货</template>
      </template>
    </Sheet>
    <div style="margin-top:12px">
      <Sheet :data="rows"
        :columns="columns"
        height="calc(30vh - 50px)">
        <template #status="{row}">
          <template v-if="row.Status===11">状态11</template>
          <template v-else-if="row.Status===3">已完成</template>
          <template v-else>12退货</template>
        </template>
      </Sheet>
    </div>
  </div>
</template>
<script lang="tsx">
import { defineComponent, ref, computed, watch, onMounted } from "vue"
import Sheet from "../packages/components/sheet"
import Data from "./test-data/sheet"
import Bouton from "../packages/components/bouton"
import Checkbox from "../packages/components/checkbox"
import Radio from "../packages/components/radio"
export default defineComponent({
  components: { Sheet, Bouton, Checkbox, Radio },
  setup() {
    const a = ref(0)
    const D = ref(Data)
    const isAuto = ref(true)
    const hasIndex = ref(true)
    const stripe = ref(false)
    const ck = ref("radio")
    const keys = ref<any[]>([])
    const rows = ref<any[]>([])
    const currentKey = ref("")

    watch(
      keys,
      (v: any) => {
        // console.log(v)
      },
      { deep: true }
    )
    function columns() {
      return [
        {
          name: "单号",
          field: "BillCode",
          style: { width: "11.3em" },
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

    onMounted(() => {
      setTimeout(() => {
        currentKey.value = "CGDD2105130004"
      }, 200)
    })
    return {
      a,
      D,
      isAuto,
      hasIndex,
      stripe,
      ck,
      keys,
      rows,
      currentKey,
      columns,
      checkable(row: any) {
        if (row.TotalPrice - 0 > 400) {
          return { disabled: true, checked: false }
        }
        return { disabled: false, checked: false }
      },
      afterChecked(arr: any[]) {
        rows.value = arr
      },
    }
  },
})
</script>