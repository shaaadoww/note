# 总结
## 对手机号进行脱敏处理

### 方法1
```js
var phone="13812345678";
var str=phone.substring(0,3)+"****"+phone.substring(7);
```

### 方法2
```js
var phone="13812345678";
var str=phone.substr(0,3)+"****"+phone.substring(7);
```
> 区别是：
substring第一个参数是开始下标，第二个是结束下标
substr第一个参数是开始下标，第二个是截取几位

### 方法3
```js
var phone="13812345678"
var pho=/(\d{3})\d*(\d{4})/
var str=phone.replace(pho,'$1****$2');
console.log(str)
```

### 封装方法
- iphone-desensitization/index.js
```js
function phoneDesensitization (str = '') {
  if (typeof str !== 'string') return ''
  const pho = /(\d{3})\d*(\d{4})/
  return str.replace(pho, '$1****$2')
}

export default phoneDesensitization
```


### 编辑页脱敏
- 在不影响提交参数的同时进行页面上的脱敏处理
```vue
<template>
    <!-- 脱敏了的手机号输入框 -->
    <el-input v-show="formInline.phoneDesensitization" v-model.trim="formInline.phoneDesensitization" @input="changePhone"></el-input>
    <!-- 正常手机号输入框 -->
    <el-input v-show="!formInline.phoneDesensitization" v-model.trim="formInline.phone"></el-input>
</template>

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

### 导出PDF
- 封装方法
- 先用html2Canvas 将页面截图再用jspdf转成pdf
```js
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export default function (dom, title, scale = 4, s= 1.1) {
  // scale 定义截取的图片的放大倍数
  // calc 拉长转pdf的高度
  return new Promise((resolve, reject) => {
    html2Canvas(document.querySelector(dom), {
      allowTaint: true,
      scale,
      backgroundColor: "#fff",
      useCORS: true
    }).then(function (canvas) {
      let contentWidth = canvas.width
      let contentHeight = canvas.height
      let pageHeight = contentWidth / 592.28 * 841.89
      let leftHeight = contentHeight
      let position = 0
      let imgWidth = 595.28
      let imgHeight = 592.28 / contentWidth * contentHeight * calc
      let pageData = canvas.toDataURL('image/jpeg', 1.0)
      let PDF = new JsPDF('', 'pt', 'a4')
      if (leftHeight < pageHeight) {
        PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
      } else {
        while (leftHeight > 0) {
          PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
          leftHeight -= pageHeight
          position -= 841.89
          if (leftHeight > 0) {
            PDF.addPage()
          }
        }
      }
      PDF.save(title + '.pdf')
      resolve()
    })
  })
}
```
