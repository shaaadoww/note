# 基本使用
## 安装
```md:no-line-numbers
npm install qrcode --save
```
## 使用
```vue:no-line-numbers
<template>
    <canvas id="qrcode"></canvas>
</template>
```

```vue
<script>
import QRCode from 'qrcode' // 引入生成二维码插件
export default {
    mounted () {
        this.mobileUrl = `
            ${apiServer.api.mobileHost}/#/views/apps/training-task/components/inputTrainInfo?examinationPaperId=${this.codeLinkInfo.testPaperId}&examMode=${this.codeLinkInfo.examMode}&tenantId=${this.codeLinkInfo.tenantId}&isShare=1
        `
        this.$nextTick(() => {
        let opts = {
            errorCorrectionLevel: 'H', // 容错级别
            type: 'image/png', // 生成的二维码类型
            quality: 0.3, // 二维码质量
            margin: 8, // 二维码留白边距
            width: 200, // 宽
            height: 200, // 高
            text: this.mobileUrl, // 二维码内容 -- 链接
            color: {
                dark: '#333333', // 前景色
                light: '#fff' // 背景色
            }
        }
        let msg = document.getElementById('qrcode')
        QRCode.toCanvas(msg, this.mobileUrl, opts, function (error) {
            console.log(error)
        })
      })
    }
}
</script>
```
