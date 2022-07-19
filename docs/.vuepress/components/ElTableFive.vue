<template>
  <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    :tree-props="{ children: 'children' }"
    :span-method="arraySpanMethod">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: '2011-05-02',
          name: '张三',
          address: '上海市'
        },
        {
          id: 2,
          date: '2018-02-08',
          name: '李四',
          address: '广州市'
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎ccc',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [
            {
              id: 123123,
              date: '2016-05-01',
              name: '王五',
              address: '上海市普陀区'
            },
            {
              id: 32,
              date: '2022-03-01',
              name: '王小虎',
              address: '金沙江路'
            }
          ]
        },
        {
          id: 4,
          date: '2022-05-04',
          name: '赵思',
          address: '深圳'
        }
      ]
    }
  },
  methods: {
    // 合并行或列
    arraySpanMethod({ row, column, rowIndex, columnIndex }){
      if(row.children){
        if (columnIndex === 0) {
          return {
            rowspan: 1,
            colspan: 12
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.el-table {
  margin: 10px 0;
}

.el-table :deep(table) {
  margin: 0;
}
</style>