# 基本使用
## 安装
```md:no-line-numbers
npm install wangeditor --save
```
## 使用
```vue
<template>
    <!-- 绑定value值即可 -->
    <y-wang-editor v-model="xxx"></y-wang-editor>
</template>
```

- 封装YWangEditor.vue
```vue
<template>
  <div class='YWangEditor'>
    <div ref="editorElem"></div>
  </div>
</template>

<script>
import E from 'wangeditor'
import api from 'shared/api/auth'
import Params from 'shared/utils/Params' // 服务器所需参数
import apiUrl from 'shared/config/api' // 服务器所需参数
export default {
  name: 'YWangEditor',

  props: {
    value: {
      type: String,
      default: ''
    },

    // 是否禁用内容编辑
    enable: {
      type: Boolean,
      default: false
    },

    menus: {
      type: Array,
      default () {
        return [
          // 'head', // 标题
          'bold', // 粗体
          'fontSize', // 字号
          'fontName', // 字体
          'italic', // 斜体
          'underline', // 下划线
          'strikeThrough', // 删除线
          'foreColor', // 文字颜色
          'backColor', // 背景颜色
          'link', // 插入链接
          // 'list', // 列表
          'justify', // 对齐方式
          'quote', // 引用
          'image', // 插入图片
          'table', // 表格
          // 'video', // 插入视频
          // 'code', // 插入代码
          'undo', // 撤销
          'redo', // 重复
          'fullscreen' // 全屏
        ]
      }
    }
  },

  data () {
    return {
      editor: ''
    }
  },

  watch: {
    value (val) {
      if (val === this.editor.txt.html()) return
      this.editor.txt.html(val)
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      this.editor = new E(this.$refs.editorElem)

      // 富文本菜单配置
      this.editor.customConfig.menus = this.menus

      // 设置图片上传方式
      this.imgOption()

      this.editor.customConfig.onchange = (html) => {
        this.$emit('input', html)
      }
      this.editor.create()

      this.editor.txt.html(this.value)

      if (this.enable) {
        this.editor.$textElem.attr('contenteditable', false)
      }
    },

    imgOption () {
      // base 64 存储图片
      this.editor.customConfig.uploadImgShowBase64 = false
      // 配置服务器端地址
      const imgUrl = `${apiUrl.api.protocol}://${apiUrl.api.host}:${apiUrl.api.port === '' ? '' : apiUrl.api.port === '80' ? '' : apiUrl.api.port}`
      this.editor.customConfig.uploadImgServer = imgUrl
      // 自定义 header
      this.editor.customConfig.uploadImgHeaders = { Authorization: localStorage.getItem('token') }
      // 自定义上传参数
      this.editor.customConfig.uploadImgParams = this.imgData()
      // 后端接受上传文件的参数名
      this.editor.customConfig.uploadFileName = 'fileName'
      // 将图片大小限制为 2M
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024
      // 限制一次最多上传 3 张图片
      this.editor.customConfig.uploadImgMaxLength = 6
      // 设置超时时间
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000
      // 可使用监听函数在上传图片的不同阶段做相应处理
      this.editor.customConfig.uploadImgHooks = {
        customInsert: (insertImg, result, editor) => {
          const url = result.backend_org_sys_file_upload_response.url
          insertImg(url)
        }
      }
    },

    imgData () {
      return Params({}, api.upload)
    }
  }
}
</script>

<style lang='stylus' scoped>

</style>
```
