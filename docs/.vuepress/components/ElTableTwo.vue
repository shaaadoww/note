<template>
  <el-table :data="tableData" :header-cell-style="{'background':'#f5f7fa'}" border style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
    <el-table-column prop="image" label="Address">
      <template #default="{ row }">
        <el-popover trigger="hover"
          placement="top"
          v-for="item in row.image"
          :key="item.id">
          <!--弹出的内容-->
          <img :src="item.url" style="width:250px" alt="">
          <!--展示的内容，slot="reference"具名插槽-->
          <template #reference>
            <img style="width:40px;height:40px" :src="item.url" alt="">
          </template>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const tableData = [
      {
        id: '1',
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        image: [
          { url: 'https://img2.baidu.com/it/u=1249099614,3534836312&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=448' },
          { url: 'https://img2.baidu.com/it/u=4122738859,2522601053&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' }
        ]
      }
    ]

    return {
      tableData
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