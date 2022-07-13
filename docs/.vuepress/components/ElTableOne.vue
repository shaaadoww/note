<template>
  <el-table
    :data="tableData"
    :header-cell-style="{'background':'#f5f7fa'}"
    height="420"
    border
  >
    <el-table-column
      v-for="(item, index) in tableTitles"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      show-overflow-tooltip
      align="center"
    ></el-table-column>
  </el-table>

  <el-pagination
    v-model:currentPage="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[5, 10, 20, 30]"
    :total="total"
    layout="total, sizes, prev, pager, next, jumper"
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import Mock from 'mockjs'

interface List {
  name: string
  id: string
  age: number
  birthday: string
  city: string
}

export default defineComponent({
  setup () {
    const allTableData: List[] = Mock.mock({
      "list|1-50": [{
        'name': '@cname',
        'id': '@id',
        'age|10-60': 0,    // 10-60以内的随机数，0用来确定类型
        'birthday': '@date("yyyy-MM-dd")',    // 年月日
        'city': '@city(true)'    // 中国城市
      }]
    }).list
    const tableTitles = [
      { prop: 'id', label: 'id' },
      { prop: 'name', label: '名字' },
      { prop: 'age', label: '年龄' },
      { prop: 'birthday', label: '生日' },
      { prop: 'city', label: '城市' }
    ]
    let currentPage = ref<number>(1)
    let pageSize = ref<number>(10)
    let tableData = computed(() => {
      return allTableData.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
    })
    let total = computed(() => {
      return allTableData.length
    })

    const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`)
    }

    return {
      tableData,
      tableTitles,
      pageSize,
      currentPage,
      total,
      handleSizeChange,
      handleCurrentChange
    }
  }
})

</script>

<style scoped>
.el-table {
  margin: 10px 0;
}
.el-table :deep(table) {
  margin: 0;
}
</style>