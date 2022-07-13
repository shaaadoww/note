# 实战
## el-table
### 前端自己做分页
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

### 表格单选按钮选中
- el-radio和el-table联用
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
````

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