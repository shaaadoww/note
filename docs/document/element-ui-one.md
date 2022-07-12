# 基本使用

## el-step
### el-steps步骤条点击事件要加.native
```md
@click.native绑定步骤条的点击事件
```

## el-date-picker
## el-time-picker
### picker-options设置禁用日期
- 禁用当前日期之前的日期
- 禁用当前日期之后的日期
```vue
<el-date-picker type="datetime"
  :picker-options="pickerOptions"
  value-format="yyyy-MM-dd HH:mm:ss"
  v-model.trim="dialog.data.returnTime"
  style="width: 100%;"
></el-date-picker>
```
```js
data () {
  return {
    pickerOptions: {
      // 禁用当前日期之前的日期
      disabledDate (time) {
        // Date.now()是javascript中的内置函数，它返回自1970年1月1日00:00:00 UTC以来经过的毫秒数。
        // return time.getTime() < Date.now() - 8.64e7;
        return time.getTime() < new Date().getTime() - (24 * 60 * 60 * 1000)
        // return time.getTime() > Date.now(); // 禁用当前日期之后的日期
      }
    }
  }
}
```

- 选择的时间要大于开始时间，小于结束时间
```vue
<el-date-picker
  v-model="row[contractAdjustField.bookkeepingMonth]"
  type="month"
  value-format="yyyy-MM"
  placeholder="请选择业务年月"
  :picker-options="{
    disabledDate (time) {
      return time.getTime() < (formInline.leaseStartDate && new Date(formInline.leaseStartDate).getTime()) ||
        time.getTime() > (formInline.leaseEndDate && new Date(formInline.leaseEndDate).getTime())
    }
  }"
></el-date-picker>

```

### format可以设置显示的格式
### selectableRange限制选择范围
![image](/picker.png)
```vue
<el-form-item class="time-picker-form-item">
  <el-time-picker
    v-model="formInline[addField.start]"
    value-format="HH:mm"
    format="HH:mm"
    placeholder="开始时间"
  ></el-time-picker>
</el-form-item>
<span>至</span>
<el-form-item  class="time-picker-form-item">
  <el-time-picker
    v-model="formInline[addField.end]"
    :picker-options="{
      selectableRange: `${formInline[addField.start] ? formInline[addField.start] + ':00' : '00:00:00' }-23:59:59`
    }"
    value-format="HH:mm"
    format="HH:mm"
    placeholder="结束时间"
  ></el-time-picker>
</el-form-item>
```

## el-upload
### 阻止上传问题
> el-upload设置disabled为true 即可禁用，如果点击还是会出现弹窗 这时候需要把按钮的slot="trigger" 设置成slot="tip"

```vue
<!--需要选择文件-->
<el-button slot="trigger" class="" @click="showFile">导入</el-button>
 <!--不需要选择文件-->
<el-button slot="tip" class="" @click="downMoadle">下载模板</el-button>
```

### before-unpload事件
- file.type 部分值

| 文件类型  | file.type |
| --- | --- |
| docx  | application/vnd.openxmlformats-officedocument.wordprocessingml.document |
| doc  | application/msword |
| pdf  | application/pdf |

- 在beforeAvatarUpload里限制上传类型
```js
beforeAvatarUpload (file) {
  var fileType = ['dwg', 'dxf', 'dwt', 'zip', 'rar', '7z']

  for (const i in fileType) {
    const reg = RegExp(`${fileType[i]}$`)
    if (!reg.test(file.name.toLocaleLowerCase()) && (Number.parseInt(i, 10) === fileType.length - 1)) {
      this.$message.error(`上传格式只能为${fileType.join(',')}`)
      return false
    } else if (reg.test(file.name)) {
      return true
    }
  }
},
```
### 服务器上传接口里报错了
```vue
<el-upload>
  ...
  :on-success="onSuccess"
  ref="elUpload"
</el-upload>
```
```js
onSuccess (res, file, fileList) {
  ...
  const field = this.getField(this.imgData.method)
  if (res[field].code !== '10000') {
      // 上传成功的钩子函数res返回值的code返回40004说明 上传接口报错了
      this.btnLoading = false
      let uploadFiles = this.$refs.elUpload.uploadFiles
      // 重置该文件上传的状态
      file.status = 'ready'
      // 截取掉上传失败的文件
      uploadFiles.splice(uploadFiles.indexOf(uploadFiles), 1)
      this.$message.error(res[field].sub_msg)
      return
  }
  ...
},
```
1. 当我们点击el-upload打开本地文件选择框后，那一条File数据会有个status的状态标志，值为'ready'
2. 选完文件开始自动上传，当得到服务器接口响应后，el-upload会进入success回调，这里会把status置为'success'
如果服务器上传接口里报错了，文件其实没成功也会给响应到el-upload，所以这个文件其实是上传失败了

> https://blog.csdn.net/weixin_39918588/article/details/110813682

## el-select
### 下拉框不显示下拉，触发一个弹窗
```vue
<el-select
  ref="merchantName"
  v-model="formInline[args.merchantName]"
  @click.native="showMerchantDialog = true"
  @focus="$refs.merchantName.blur()"
>
</el-select>
```

### 下拉框多选时可能有出现抖动
> 给el-select下的el-select__tags添加一个上下外边距2px

### 获取整个选中item
- 需要注意的是：value-key="id"这里的 id 需要和 el-option 的 key 绑定的属性一致，而且 value 绑定整个整个 item 对象，一定要加
- 如果 Select 的绑定值为对象类型，请务必指定 value-key 作为它的唯一性标识。
```vue
<template>
  <el-select v-model="formatsName" @change="getDetail" value-key="id">
    <!-- v-model绑定的formatsName的值为el-option中value绑定的值 -->
    <el-option label="全部" value=""></el-option>
    <el-option
      v-for="item in formatsList"
      :key="item.id"
      :label="item.formatsName"
      :value="item"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  methods: {
    getDetail (val) {
      console.log(val) // 输出的就是选中的el-option的for循环，循环出来的整个item对象
    }
  }
}
</script>
```

## el-table
### fixed固定列后出现的问题
- 滚动可以看到应该被遮住的内容
```css
.el-table__fixed {
  background #fff
}
```

- 滚动条滚动到最下面，表格会错位
```css
.el-table__fixed-body-wrapper {
  overflow: scroll !important;
}
```

### show-summary合计行不显示问题
- 给table加了一个固定高度话，就不显示了，其实这个合计是存在的

```
解决办法：
1.不设置固定高度
2.在vue的生命周期updated调用一下doLayout就可以了
```
```vue
updated () {
　　this.$nextTick(() => {
　　　　this.$refs.table.doLayout()
　　})
}
```

###### 自定义合计方法
```vue
<el-table
  :summary-method="getSummaries"
  show-summary
></el-table>
```
```js
getSummaries ({ columns, data }) {
  const sums = [];
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '总价'
      return
    } else {
      const values = data.map(item => item[column.property] && Number(item[column.property].replace(/,/g, '')))
      if (!values.every(value => isNaN(value))) {
        const total = values.reduce((prev, curr) => {
          const value = Number(curr)
          if (!isNaN(value)) {
            return prev + curr
          } else {
            return prev
          }
        }, 0)
        sums[index] = total.toLocaleString()
      }
    }
  })
  return sums
}
```
[el-table自定义合计](https://www.jianshu.com/p/d855fae439f8)

### 切换分页的时候选项不清空
1. 添加row-key
2. type="selection"的那一行添加一个 reserve-selection 属性，保留之前选中的数据
3. 添加 @selection-change="handleSelectionChange" 这一个方法，把之前选中的数据存在一个数组中

### 宽度一直在增大变化
- flex布局下出现表格宽度一直在增大变化的问题解决方案
```md:no-line-numbers
el-tabel外层设置一个 min-width: 0;
```

### 当某个单元格被点击时做某些操作
- 当表格某一列或某一行需要添加事件名时可以使用cell-click
```vue
<template>
  <el-table
    @cell-click="openDetail"
  ></el-table>
</template>

<script>
methods () {
  openDetail (row, column, cell, event) {
    if ((![21, 23, 27, 28, 29].includes(row.order) && row.currentValue !== '-' && column.label.slice(0, 3) === '当期值') || (![21, 23, 27, 28, 29].includes(row.order) && row.lastValue !== '-' && column.label.slice(0, 3) === '上期值')) {
      this.dialogVisible = true
      this.date = column.label.replace(/[^\d-]/g, '') + '-01'
      this.openTypeOrder = row.openTypeOrder
    }
  }
}
</script>
```

### 当某个单元格需要添加特殊样式
```vue
<template>
  <el-table
    :cell-style="specialStyle"
  ></el-table>
</template>

<script>
methods () {
  specialStyle ({row, columnIndex}) {
    if ((![21, 23, 27, 28, 29].includes(row.order) && row.currentValue !== '-' && columnIndex === 2) || (![21, 23, 27, 28, 29].includes(row.order) && row.lastValue !== '-' && columnIndex === 3)) {
      return 'color: #169bd5;text-decoration: underline;cursor: pointer'
    }
  }
}
</script>
```

### 表格数据文字过长显示提示框
- 在全局下添加，在组件里的样式中开启scope加载不到，但不加scope可能污染全局样式
```md
<style lang="stylus">
  .el-tooltip__popper
    max-width 50% // 表格内容过多文字提示弹出框最大宽度50%
</style>
```

### 多选 - 不可选中项
```vue
<template>
  <el-table @selection-change="handleSelectionChange">
    <el-table-column
      type="selection" width="40" align="center" :selectable="checkSelectable"
    ></el-table-column>
  </el-table>
</template>

<script>
  data () {
    return {
      multipleSelection: [], //  选中的表格数据
    }
  },

  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    checkSelectable (row, index) {
      // 多选可选项 - 返回false不可选中
      // row是行数据，index是数组下标
      if (...) {
        return false
      } else {
        return true
      }
    }
  }
</script>
```

### 有多选列但是只给选一个
- 有提示信息
```vue
<template>
  <el-table
    ref="table"
    v-loading="loading"
    :data="tableData"
    height="100%"
    border
    @selection-change="handleSelectionChange"
  ></el-table>
</template>

<script>
  handleSelectionChange (val) {
    if (val.length > 1) {
      this.$refs.table.clearSelection() // 用于多选表格，清空用户的选择
      this.$message.error('只能选中一行数据查看详情！')
    } else {
      this.lineNo = val.map((item) => item.lineNo)[0] || '' // 从当前行数据中拿到它的行号lineNo
    }
  }
</script>
```

### 解决表格错位问题
> 起因是表头动态，然后使用el-table的:height实现表格高度自适应，在页面动态新增列后出现错位问题；
找了很多解决办法都没有解决，最后发现其实官网有个doLayout方法可以对table进行重新布局
```md
this.$nextTick(() => {
  this.$refs.table.doLayout();
  // 先给el-table添加一个ref然后调用doLayout方法，解决表格错位
})
```

### 有多选栏但是不需要全选按钮
- 表格禁止全选功能
```vue
<el-table-column type="selection" width="55"></el-table-column>
```

- 第一种：更改样式，直接不显示，就不涉及其他操作了
```css
>>>.el-table__header .el-checkbox // 找到表头那一行，然后把里面的复选框隐藏掉
  display:none !important
```


- 第二种：可以点击操作，把选中状态清除
```md
<!-- 绑定事件 -->
@select-all="selectAll"

selectAll() {
  this.$refs.refTable.clearSelection()
  //用于多选表格，清空用户的选择
}
```


image.png