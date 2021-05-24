<template>
  <h1>分页 Pagination</h1>
  <Pagination :total="313"
    @changePageIndex="onPageChange"
    @changePageSize="onSizeChange" />
</template>
<script lang="ts">
import { defineComponent } from "vue"
import Pagination from "../packages/components/pagination"
export default defineComponent({
  components: { Pagination },
  setup(props) {
    return {
      onPageChange(p: number) {
        console.log("页码变了：", p)
      },
      onSizeChange(size: number) {
        console.log("每页条数变了：", size)
      },
    }
  },
})
</script>