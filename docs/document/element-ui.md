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