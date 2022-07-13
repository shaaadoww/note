<template>
  <el-table :data="tableData" :header-cell-style="{'background':'#f5f7fa'}" border style="width: 100%">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="Name" label="名字" />
    <el-table-column prop="age" label="年龄" />
    <el-table-column prop="Date" label="生日" />
    <el-table-column prop="city" label="城市" />
    <el-table-column prop="image" label="单选">
      <template #default="{ row }">
        <el-radio-group v-model="radioSelect" @change="changeItem(row)">
          <el-radio :label="row.id" size="large">&nbsp;</el-radio>
        </el-radio-group>
      </template>
    </el-table-column>
  </el-table>
  我是{{ radioSelectObj.Name || 'xxx' }}, ID: {{ radioSelect || 'xxx' }}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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
    const tableData: List[] = Mock.mock({
      "list|1-5": [{
        'Name': '@cname',
        'id': '@id',
        'age|10-60': 0,    // 10-60以内的随机数，0用来确定类型
        'Date': '@date("yyyy-MM-dd")',    // 年月日
        'city': '@city(true)'    // 中国城市
      }]
    }).list
    let radioSelect = ref<string>('')
    let radioSelectObj = ref<object>({})

    const changeItem = (row: any) => {
      radioSelect.value = row.id
      radioSelectObj.value = row
    }

    return {
      tableData,
      radioSelect,
      radioSelectObj,
      changeItem
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