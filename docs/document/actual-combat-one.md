# 实践总结
## 对手机号进行脱敏处理

### 方法1
```js
var phone = "13812345678";
var str=phone.substring(0,3) + "****" + phone.substring(7);
```

### 方法2
```js
var phone = "13812345678";
var str=phone.substr(0,3) + "****" + phone.substring(7);
```
> 区别是：
substring第一个参数是开始下标，第二个是结束下标
substr第一个参数是开始下标，第二个是截取几位

### 方法3
```js
var phone = "13812345678"
var pho = /(\d{3})\d*(\d{4})/
var str = phone.replace(pho,'$1****$2');
console.log(str)
```

### 编辑页脱敏
- 在不影响提交参数的同时进行页面上的脱敏处理
```vue
<template>
  <!-- 脱敏了的手机号输入框 -->
  <el-input v-show="formInline.phoneDesensitization"
    v-model.trim="formInline.phoneDesensitization" @input="changePhone"></el-input>
  <!-- 正常手机号输入框 -->
  <el-input v-show="!formInline.phoneDesensitization"
    v-model.trim="formInline.phone"></el-input>
</template>

<script>
  data () {
    return {
      formInline: {
        phoneDesensitization: '', // 从详情接口取值 phoneDesensitization(...)
        phone: ''
      }
    }
  }
  methods: {
      changePhone (pho) {
        // 如果有编辑，脱敏的电话输入框就不再显示并清空未脱敏的输入框
        if (pho !== this.formInline.phone) {
          this.formInline.phoneDesensitization = ''
          this.formInline.phone = ''
        }
      }
  }
</script>
```

## 复制功能

```vue
<template>
  <el-input id="copy" placeholder="请输入链接" v-model="linkUrl" class="input-with-select">
    <el-button slot="append" icon="el-icon-document-copy" @click="copyUrl">复制</el-button>
  </el-input>
</template>
```
```vue
<script>
  async copyUrl () {
    let inputEl = document.getElementById('copy')
    inputEl.select() // HTML事件 --- 当用户选择文本框【text/textarea】中的一个或多个字符触发
    // document.execCommand('copy') --- 该方法已弃用
    try {
      await navigator.clipboard.writeText(inputEl.value)
      this.$message({
          message: '复制成功',
          type: 'success'
        })
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }
</script>
```
[剪贴板操作 Clipboard API 教程](https://www.ruanyifeng.com/blog/2021/01/clipboard-api.html)

## 下载(导出)功能
> 实际上导出功能，导出图片，导出excel表格，都可以通过a标签实现下载的（需要拿到返回下载的链接）

- vue模板中直接使用a链接
```vue
<el-button type="text">
  <a :href="scope.row.url" download="">下载</a>
</el-button>
```
- 点击事件
```js
xxx function () {
  const a = document.createElement('a')
  a.href = 'xxx' // xxx是下载链接
  a.download = ''
  document.body.appendChild(a)
  a.click() // 生成a标签并自点
  a.remove()

  或 window.open(url) // 打开一个新窗口，url是下载链接，窗口打开后下载，然后自动关闭
}
```
### 导出图片
```js
html2canvas(i, { // 使用html2canvas将可视区域转换成图片，
  //i 是 Dom节点，这里需要注意Dom节点的宽度有多少，如果截取出来的图片没有边距，要注意获取的Dom节点有没有加边距
  backgroundColor: 'transparent', // png图片透明
  allowTaint: true, // 显示图片
  useCORS: true // 跨域
}).then((canvas) => {
  let oImg = new Image()
  oImg.src = canvas.toDataURL() // canvas.toDataURL()拿到截图的图片地址
  // document.body.appendChild(oImg); // 将生成的图片添加到body
  var = document.createElement('a')
  a.download = '' // 图片下载的名字
  a.href = oImg.src
  a.click()
  a.remove()
  this.loading = false
})
```

## 监听某个dom元素是否加载完成
```vue
<script>
  mounted () {
    this.timer = null
    this.checkDom()
  }

  methods: {
    checkDom () {
      //  检查dom是否执行完成
      let dom = document.querySelectorAll('.Wrapper .Tabs ul li')
      if (dom) {
        do something ...
        if (this.timer) {
          clearTimeout(this.timer)
        }
      } else {
        //  自我调用
        this.timer = setTimeout(this.checkDom, 1000)
      }
    }
  }
</script>
```

## 判断数据是否编辑过 - 编辑页面
- 该方法不是最优解，顺序问题会影响结果

> 数据是否修改过 - 编辑页面 - 没有改过数据不给提交保存页面操作
```js
judgeEdited (dataSource) {
  if (Object.prototype.toString.call(dataSource) === '[object Object]') {
    // 对象形式
    return Object.keys(dataSource).some(key => {
      if (['[object String]', '[object Number]', '[object Undefined]', '[object Null]'].includes(Object.prototype.toString.call(dataSource[key]))) {
        // 如果对象的某一项是非数组或非对象，那么直接判断是否相同
        return dataSource[key] !== this.oldData[key]
      } else if (Object.prototype.toString.call(dataSource[key]) === '[object Array]') {
        // 如果对象的某一项是数组，转为JSON字符串，判断是否全部一样，一样说明没有修改
        return JSON.stringify(dataSource[key]) !== JSON.stringify(this.oldData[key])
      }
    })
  } else {
    // 数组形式
    return JSON.stringify(dataSource) !== JSON.stringify(this.oldTableData)
  }
}
```
- 使用
```js
judgeEdited(this.tableData)
// 返回true跟false，如果为false就是数据没改变过
```
```js
if (!this.judgeEdited(this.tableData)) {
  this.$message.error('数据未更改，不能提交申请变更审批！')
  return // 不执行下面的所有操作
}
```

## 倒计时
<ActualCombatFive />

```vue
<template>
  <div>距离明日零点还有：{{d}}天{{h}}时:{{m}}分:{{s}}秒</div>
</template>

<script>

export default {
  data () {
    return{
      d:'',
      h:'',
      m:'',
      s:''
    }
  },

  methods: {
    countTime () {
      // 定义结束时间戳
      const end = Date.parse(new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000));
      // 定义当前时间戳
      const now = Date.parse(new Date())
      // 做判断当倒计时结束时都为0
      if (now >= end) {
        this.d = 0
        this.h = 0
        this.m = 0
        this.s = 0
        return
      }

      // 用结束时间减去当前时间获得倒计时时间戳
      const msec = end - now
      let d = parseInt(msec / 1000 / 60 / 60 / 24) // 算出天数
      let h = parseInt(msec / 1000 / 60 / 60 % 24) // 算出小时数
      let m = parseInt(msec / 1000 / 60 % 60) // 算出分钟数
      let s = parseInt(msec / 1000 % 60) // 算出秒数

      // 给数据赋值
      this.d = d
      this.h = h > 9 ? h : '0' + h
      this.m = m > 9 ? m : '0' + m
      this.s = s > 9 ? s : '0' + s

      // 使用定时器 然后使用递归 让每一次函数能调用自己达到倒计时效果
      setTimeout(() => {
        this.countTime()
      }, 1000)
    }
  },

  mounted() {
    this.countTime()
  }
}
</script>
```