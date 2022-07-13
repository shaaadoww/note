# 实战
## el-table
### 前端自己做分页
<ElTableOne></ElTableOne>

:::: code-group
::: code-group-item Vue2
```vue
<template>
  <el-table
    :data="merchantList"
    :height="`${380 / 192}rem`"
    :header-cell-style="{'background':'#f5f7fa'}"
    border
  >
    <el-table-column
      v-for="(item, index) in TableTitles"
      :key="index" align="center"
      :prop="item.prop"
      :label="item.label"
      show-overflow-tooltip
    ></el-table-column>
  </el-table>
  <YPagination
    <!-- YPagination是对el-pagination 的封装-->
    :pageNum="pageTag.pageNum"
    :pageSize="pageTag.pageSize"
    :Total="total"
    @SizeChange="sizeChange"
    @CurrentChange="currentChange"
  ></YPagination>
</template>

<script>
  data: {
    return {
      formInline: {
        merchantList: [
          // 后端返回的所有数据
        ]
      },
      pageTag: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },

  methods: {
    // 每页多少个
    sizeChange (val) {
      this.pageTag.pageSize = val
      this.pageTag.pageNum = 1
    },
    // 第几页
    currentChange (val) {
      this.pageTag.pageNum = val
    }
  },

  computed: {
    merchantList () {
      const pageSize = this.pageTag.pageSize
      const pageNum = this.pageTag.pageNum
      return this.formInline.merchantList.slice((pageNum - 1) * pageSize, pageNum * pageSize)
    },
    total () {
      reutrn this.formInline.merchantList.length
    }
  }
</script>
```
:::
::: code-group-item Vue3
```vue
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
```
:::
::::

### 表格单选按钮选中
- el-radio和el-table联用
<ElTableThree />

:::: code-group
::: code-group-item Vue2
```vue
<template>
  <el-table
    :data="demoClassPage.list"
    :height="`${ 380 / 192 }rem`"
    :header-cell-style="{ background: '#f5f7fa' }"
  >
    <el-table-column
      v-for="(item, index) in tableTitle"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      show-overflow-tooltip
      align="center"
    ></el-table-column>
    <el-table-column label="操作" align="center">
      <template #default="{ row }">
        <!--
          注意:
            1.&nbsp; 为空，不加这个radio的label会显示index数字，注意从0开始的；radio会全选的问题是label相同导致的
            2.如果你发现点击一个radio结果选中全部,那就看看你的lable的设置,建议默认为索引:label="scope.$index"
            3.如果无法选中可能是因为没有设置label
        -->
        <el-radio :value="radioSelect" :label="row.personnelId" @change="changeItem(row)">&nbsp;</el-radio>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data () {
    return {
      radioSelect: '',
      radioSelectObj: {}
    }
  },

  methods: {
    changeItem (val) {
      this.radioSelect = val.personnelId
      this.radioSelectObj = { id: val.personnelId, name: val.personnelName }
    }
  }
}
</script>
```
:::
::: code-group-item Vue3
```vue
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
```
:::
::::

### 在表格里做el-form必填和格式校验
```vue
<template>
  <el-form :model="formInline" :rules="rules" ref="tableDataRef">
    <el-table
      :data="formInline.tableData"
      :header-cell-style="{ background:'#f5f7fa' }"
      border
      class="tableStyle"
    >
      <el-table-column
        v-for="(item, index) in tableTitle"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        show-overflow-tooltip
        align="center"
      >
        <template #default="{ row, $index }">
          <el-form-item v-if="
            item.prop === adjustTableField.statisticalDate"
            :prop="`tableData.${$index}.${adjustTableField.statisticalDate}`"
            :rules="rules[adjustTableField.statisticalDate]"
          >
            <el-date-picker
              v-model="row[adjustTableField.statisticalDate]"
              type="date"
              placeholder="请选择统计日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            v-else-if="item.prop === adjustTableField.transactionAmount"
            :prop="`tableData.${$index}.${adjustTableField.transactionAmount}`"
            :rules="rules[adjustTableField.transactionAmount]"
          >
            <el-input
              v-model="row[adjustTableField.transactionAmount]"
              placeholder="请输入交易金额"
              @change="val => !(/[^\d\\.]/g.test(val)) && !['', undefined].includes(val) && (row[adjustTableField.transactionAmount] = +val)"
            ></el-input>
          </el-form-item>
          <span v-else>{{row[item.prop]}}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>
<script>
import { adjustTableField } from '../field-config'

export default {
  data () {
    const amountRule = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback()
        return
      }
      if (!(/^[-|+]?(([0-9]|([1-9][0-9]{0,8}))((\.(0[1-9]|[1-9]{1,2}))?))$/.test(value))) {
        callback(new Error('只能输入小于1亿元大于负1亿的数字且最多保留两位小数'))
      }
      if (Number(value) > 100000000 || Number(value) < -100000000) {
        callback(new Error(`不能超过1亿元或小于负1亿元`))
      }
      callback()
    }

    return {
      adjustTableField,
      formInline: {
        tableData: [{}]
      },
      tableTitle: [
        { prop: adjustTableField.statisticalDate, label: '统计日期', width: '180' },
        { prop: adjustTableField.resourceCode, label: '资源编号' },
        { prop: adjustTableField.storeCode, label: '商铺编号' },
        { prop: adjustTableField.operatorCode, label: '运营商编号' },
        { prop: adjustTableField.operatorName, label: '运营商名称' },
        { prop: adjustTableField.transactionAmount, label: '交易金额' },
        { prop: adjustTableField.totalTransactions, label: '交易笔数' }
      ],
      rules: {
        [adjustTableField.statisticalDate]: [
          { required: true, message: '请选择统计日期', trigger: 'change' }
        ],
        [adjustTableField.transactionAmount]: [
          { required: true, message: '请输入交易金额', trigger: 'blur' },
          { validator: amountRule, trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    toApproval () {
      this.$refs.tableDataRef.validate(valid => {
        if (valid) {
          console.log('12312323')
        } else {
          this.$message.error('请检查营业额明细各项值的有效性')
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.tableStyle
  .el-form-item
    margin-bottom 0
  .el-date-editor.el-input
    width 100%
  >>>.el-form-item__error
    position static
    white-space normal !important
</style>
```

### 复选框选中
- el-checkbox和el-table联用 --- 左边树选中时选中右边表格，右边选中时也选中左边树
<ElTableFour />

:::: code-group
::: code-group-item Vue2
```vue
<template>
  <div class="table-wrapper">
    <div class="tree">
      <el-tree
        ref="tree"
        :data="treeData"
        :props="{
          label: 'resourceName'
        }"
        node-key="id"
        highlight-current
        show-checkbox
        accordion
        @check="handleCheck"
      ></el-tree>
    </div>
    <div class="table Yml16" v-loading="loading">
      <el-table :data="tableData" height="400px" border :header-cell-style="{ background: '#f5f7fa' }">
        <el-table-column
          type="index"
          width="50"
          label="序号"
          align="center"
        ></el-table-column>
        <el-table-column
          v-for="item in tableColumns"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row, $index }">
            <!-- value为true则选中 -->
            <el-checkbox :value="!!checkedMap[row.id]" @input="changeCheck(row, $event)"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>

      <div style="text-align: center">
        <YPagination
          class="Ymt24"
          :pageNum="pageTag.pageNum"
          :pageSize="pageTag.pageSize"
          :Total="total"
          @SizeChange="sizeChange"
          @CurrentChange="currentChange"
        ></YPagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageTag: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },

      tableColumns: [
        {label: '商铺号', prop: 'shopNum'},
        {label: '商铺名称', prop: 'shopName'},
        {label: '运营商名称', prop: 'merchant'}
      ],
      // 添加时用的
      checkedMap: {},
      treeData: []
    }
  },

  methods: {
    async getTreeData (arr) {
      // 获取树和表格数据，同一个接口
      this.loading = true
      let params = {
        method: api.intelligentPatrol.storeList
      }
      if (arr) params['groupIds'] = this.formInline.groupIds
      const field = this.$getField(params.method)
      const { code, result } = await this.axios.post(params).then(res => res.data[field])
      if (code !== '10000') return
      this.loading = false
      this.originTreeData = result
      this.treeData = arrayToTree(result, 'id', 'pid')
      if (this.treeData.length > 0) {
        this.$nextTick(() => {
          // 设置树默认选中
          this.$refs.tree && this.$refs.tree.setCheckedKeys(this.selectedList.map(item => item.id))
          // 设置表格默认选中
          this.handleCheck()
        })
      }
    },

    changeCheck (row, e) {
      this.$set(this.checkedMap, row.id, e ? row : null)
      this.$refs.tree.setChecked(row.id, e) // 选中复选框的同时选中树的数据
    },

    handleCheck () {
      // 树点击复选框触发的事件，对选中的数据进行对应操作，以便选中复选框数据
      this.checkedMap = {}
      this.$nextTick(() => {
        const checkedNodes = this.$refs.tree.getCheckedNodes()
        this.checkedMap = checkedNodes.filter(item => item.type.type === 5).reduce((current, item) => {
          current[item.id] = item
          return current
        }, {})
      })
    },

    // 每页多少个
    sizeChange (val) {
      this.pageTag.pageSize = val
      this.pageTag.pageNum = 1
    },

    // 第几页
    currentChange (val) {
      this.pageTag.pageNum = val
    }
  },

  computed: {
    tableData () {
      const pageSize = this.pageTag.pageSize
      const pageNum = this.pageTag.pageNum
      return this.treeData
        .slice((pageNum - 1) * pageSize, pageNum * pageSize) // 前端自己做分页
    }
  },
}
</script>

<style lang="stylus" scoped>
.add-position-wrapper
  .table-wrapper
    display flex
    .tree
      flex 0 0 240px
      max-height 500px
      overflow auto
    .table
      flex 1
      min-width 0 // 如果不设置这个，el-table的宽度可能会一直增大造成页面错乱
</style>
```
:::
::: code-group-item Vue3
```vue
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
```
:::
::::

### 操作项防抖删除
```vue
<template>
  <el-table
    :data="shopTableData"
    :height="`${380 / 192}rem`"
    :header-cell-style="{ background: '#f5f7fa' }"
    border
  >
    <el-table-column label="操作" align="center">
      <template #default="{ $index }">
        <el-button type="text" size="small" @click="delPatrolPoint($index)">移除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  data () {
    return {
      timer: '',
      shopTableData: [], // 表格绑定的数据
      shopAllTableData: [] // 表格所有的数据
    }
  }
  methods: {
    // 移除一项后就需要调后端的接口
    delPatrolPoint ($index) {
      this.shopAllTableData = this.shopAllTableData.filter((item, index) => $index !== index)
      debounce(this)

      function debounce(that) {
        that.timeout && clearTimeout(that.timeout)
        that.timeout = setTimeout(() => {
          that.getPatrolItemAllTableData() // 请求后端数据的接口
          ...
        }, 1000)
      }
    }
  }
</script>
```

### 表格图片放大功能
- 实现 - el-popover弹出框
<ElTableTwo />

:::: code-group
::: code-group-item Vue2
```vue
<el-table-column label="电子版" align="center">
  <template slot-scope="scope">
    <el-popover trigger="hover"
      placement="top"
      v-for="item in scope.row.electronicCertificates"
      :key="item.uid">
      <!--弹出的内容-->
      <img :src="item.url" style="width:250px" alt="">
      <!--展示的内容，slot="reference"具名插槽-->
      <img slot="reference" style="width:40px;height:40px" :src="item.url" alt="">
    </el-popover>
  </template>
</el-table-column>
```
:::
::: code-group-item Vue3
```vue
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
```
:::
::::
