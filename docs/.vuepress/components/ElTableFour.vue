<template>
  <div class="table-wrapper">
    <div class="tree">
      <el-tree
        ref="treeRef"
        :data="treeData"
        :props="{
          label: 'name'
        }"
        node-key="id"
        highlight-current
        show-checkbox
        accordion
        @check="handleCheck"
      ></el-tree>
    </div>
    <div class="table">
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
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <!-- value为true则选中 -->
            <el-checkbox :model-value="!!checkedMap[row.id]" @change="changeCheck(row, $event)"></el-checkbox>
          </template>
        </el-table-column>
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue'
import Mock from 'mockjs'

interface List {
  name: string
  id: string
  age: number
  birthday: string
  city: string
  children: any[]
}

export default defineComponent({
  setup () {
    const treeRef = ref(null)
    const treeData: List[] = Mock.mock({
      "list": [{
        'name': '全部',
        'id': '@id',
        'children': Mock.mock({
          "list": [{
            'name': '事业部',
            'id': '@id',
            'age|10-60': 0,    // 10-60以内的随机数，0用来确定类型
            'birthday': '@date("yyyy-MM-dd")',    // 年月日
            'city': '@city(true)',    // 中国城市
            'children': Mock.mock({
              "list|1-30": [{
                'filter': true,
                'name': '@cname',
                'id': '@id',
                'age|10-60': 0,    // 10-60以内的随机数，0用来确定类型
                'birthday': '@date("yyyy-MM-dd")',    // 年月日
                'city': '@city(true)',    // 中国城市
              }]
            }).list
          }]
        }).list
      }]
    }).list
    let checkedMap = ref<object>({})

    const handleCheck = () => {
      checkedMap.value = {}
      nextTick(() => {
        const checkedNodes = treeRef.value.getCheckedNodes()
        checkedMap.value = checkedNodes.filter(i => i.filter).reduce((current, item) => {
          current[item.id] = item
          item.isSelected = true
          return current
        }, {})
      })
    }


    const allTableData: object[] = treeData[0].children[0].children
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

    const changeCheck = (row: any, e: boolean) => {
      checkedMap.value[row.id] = e ? row : null
      treeRef.value.setChecked(row.id, e) // 选中复选框的同时选中树的数据
    }

    const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`)
    }

    const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`)
    }

    return {
      treeData,
      treeRef,
      handleCheck,

      tableData,
      tableTitles,
      pageSize,
      currentPage,
      total,
      checkedMap,
      changeCheck,
      handleSizeChange,
      handleCurrentChange
    }
  }
})

</script>

<style scoped>
.table-wrapper {
  display: flex;
}
.table-wrapper .tree {
  flex: 0 0 200px;
  max-height: 500px;
  overflow: auto;
}
.table-wrapper .table {
  flex: 1;
  min-width: 0; /* 如果不设置这个，el-table的宽度可能会一直增大造成页面错乱 */
}

.el-table {
  margin: 10px 0;
}

.el-table :deep(table) {
  margin: 0;
}
</style>