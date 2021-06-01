<template>
  <h1>Sheet 表格</h1>
  <div style="padding:15px 0;">
    <div style="margin-bottom:10px;">
      <Checkbox v-model="isAuto"
        :value="[false,true]">宽度自动</Checkbox>
      <Checkbox v-model="hasIndex"
        :value="[false,true]">带序号</Checkbox>
      <Checkbox v-model="hasAction"
        :value="[false,true]">有添加和删除行</Checkbox>
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
      :hasAction="hasAction"
      :can-highlight="h"
      highlightKey="BillCode"
      v-model:highlight="hValue"
      @after-checked="afterChecked"
      @add="toAdd"
      @delete="toDelete"
      height="calc(65vh - 100px)">
      <template #status="{row}">
        <template v-if="row.Status===11">状态11</template>
        <template v-else-if="row.Status===3">已完成</template>
        <template v-else>12退货</template>
      </template>
    </Sheet>
    <div style="margin-top:12px">
      <div style="margin-bottom:10px;">
        <Checkbox v-model="h"
          :value="[false,true]">高亮展示某一行</Checkbox>

      </div>
      <Sheet :data="rows"
        :columns="columns"
        :canHighlight="h"
        highlightKey="BillCode"
        v-model:highlight="hValue"
        hasAction
        height="calc(35vh - 50px)">
        <template #action="{row,index}">
          <Overlay placement="top"
            toBody>
            <template #trigger>
              <div>
                <Icon name="k-icon-close" />
              </div>
            </template>
            <template #default="{hide}">
              <div :class="css.indeed">
                确认要删除<span style="color:red;">订单：{{row.BillCode}}</span>吗?
              </div>
              <div style="float:right;margin-top:12px;">
                <span style="color:var(--k-color-5);cursor:pointer;"
                  @click="hide">取消</span>
                <span style="color:var(--k-color-primary);cursor:pointer;margin-left:10px;">确定</span>
              </div>
            </template>
          </Overlay>
        </template>
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
import Confirm from "../packages/components/confirm"
import Icon from "../packages/components/icon"
import Overlay from "../packages/components/overlay"
export default defineComponent({
  components: { Sheet, Bouton, Checkbox, Radio, Icon, Overlay },
  setup() {
    const a = ref(0)
    const D = ref(Data)
    const isAuto = ref(true)
    const hasIndex = ref(true)
    const stripe = ref(false)
    const hasAction = ref(true)
    const h = ref(true)
    const ck = ref("radio")
    const keys = ref<any[]>([])
    const rows = ref<any[]>([])
    const currentKey = ref("")
    const hValue = ref("CGDD2104290001")

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
          style: { width: "12em" },
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
      hasAction,
      stripe,
      h,
      ck,
      keys,
      rows,
      currentKey,
      hValue,
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
      toAdd(row: any, index: number) {
        console.log(index)
        D.value.splice(index + 1, 0, {
          BillCode: (Math.random() + "").slice(2),
        } as any)
      },
      toDelete(row: any, index: number) {
        Confirm.open({
          content(close: any) {
            return (
              <div>
                &#12288;
                <Icon
                  name="k-icon-warning"
                  size="20"
                  style="color:var(--k-color-warning)"
                />
                &#8194;确定要删除【{row.BillCode}】吗？
              </div>
            )
          },
          ok() {
            D.value.splice(index, 1)
          },
        })
      },
    }
  },
})
</script>
<style module="css" lang="postcss">
.indeed {
  max-width: 150px;
  color: var(--k-color-3);
  font-size: 12px;
}
</style>