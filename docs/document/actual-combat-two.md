# 组件封装/方法封装
## 对手机号进行脱敏处理

- iphone-desensitization/index.js
```js
function phoneDesensitization (str = '') {
  if (typeof str !== 'string') return ''
  const pho = /(\d{3})\d*(\d{4})/
  return str.replace(pho, '$1****$2')
}

export default phoneDesensitization
```

## 导出PDF
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

## 数字输入框 - 可限制小数
- 封装组件y-input-number和el-form的form表单校验配合使用
<ActualCombatOne />

```vue
<template>
  ...
  <el-form-item label="媒体面积" prop="mediaArea" :rules="[
    { required: true, message: '请输入媒体面积', trigger: ['blur', 'change'] }
  ]">
    <y-input-number
      v-model="basicInfo.data.formParams.mediaArea"
      :min="0"
      :max="99999999.99"
      :bind="{
        placeholder: isDetailPage ? ' ' : '请输入媒体面积或体积，若无则输入/',
        isAllowChar: '/'
      }"
    ></y-input-number>
  </el-form-item>
</template>
```

- 封装组件y-input-number
:::: code-group
::: code-group-item Vue2
```vue
<template>
  <div class="y-input-number-wrapper">
    <el-input
      :class="{'is-error': errorMsg && !validateState}"
      :value="value"
      v-bind="bind"
      @input="handleInput"
      @blur="handleBlur"
      @change="$emit('change', $event)"
    >
      <template #append><slot name="append"></slot></template>
      <template #prefix><slot name="prefix"></slot></template>
      <template #prepend><slot name="prepend"></slot></template>
      <template #suffix><slot name="suffix"></slot></template>
    </el-input>
    <span class="error-msg" v-if="!validateState">{{errorMsg}}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [],
      required: true
    },
    max: {
      type: Number
    },
    min: {
      type: Number
    },
    precision: {
      type: Number,
      default: 0.01
    },
    bind: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      errorMsg: ''
    }
  },
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  computed: {
    validateState () {
      const validateState = this.elFormItem ? this.elFormItem.validateState : 'success'
      return validateState && validateState !== 'success'
    }
  },
  methods: {
    handleInput (val) {
      if (!val) {
        this.$emit('input', val)
        return void 0
      }
      const {max, min, precision} = this
      let result = Number(val)
      if (val && val.length === 1 && val === '-') {
        this.$set(this, 'errorMsg', '')
        this.$emit('input', val)
        return void 0
      }
      if (Number.isNaN(result)) {
        this.$set(this, 'errorMsg', '请输入数字')
        this.$emit('input', this.value)
        return void 0
      }
      if (typeof max === 'number' && max < result) {
        this.$set(this, 'errorMsg', `请输入小于${max}的数字`)
        this.$emit('input', this.value)
        return void 0
      }
      if (typeof min === 'number' && min > result) {
        this.$set(this, 'errorMsg', `请输入大于${min}的数字`)
        this.$emit('input', this.value)
        return void 0
      }
      if (!precision && !Number.isInteger(result)) {
        this.$set(this, 'errorMsg', `请输入整数`)
        this.$emit('input', this.value)
        return void 0
      }
      const strPrecision = `${precision}`
      const precisionSplit = strPrecision.split('.')
      let precisionSpotLen = 0
      if (precisionSplit[1]) {
        precisionSpotLen = precisionSplit[1].length
      }
      const valSplit = val.split('.')
      let valSpotLen = 0
      if (valSplit[1]) {
        valSpotLen = valSplit[1].length
      }
      if (valSpotLen > precisionSpotLen) {
        this.$set(this, 'errorMsg', `只支持输入小数点后${precisionSpotLen}位数字`)
        this.$emit('input', this.value)
        return void 0
      }
      this.errorMsg = ''
      this.$emit('input', val)
    },
    handleBlur () {
      if (!this.value) {
        this.errorMsg = ''
        return void 0
      }
      const willChangeValue = Number(this.value || '0')
      if (Number.isNaN(willChangeValue)) {
        this.$emit('input', `0`)
      } else {
        this.$emit('input', `${willChangeValue}`)
      }
      this.errorMsg = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.y-input-number-wrapper
  position relative
  display inline-block
  width 100%
  .error-msg
    display inline-block
    height 14px
    line-height 14px
    position absolute
    bottom -16px
    left 0
    color red
  .is-error
    >>>.el-input__inner
      border-color red
</style>
```
:::
::: code-group-item Vue3
```vue
// vue2和vue3混合
<template>
  <div class="y-input-number-wrapper">
    <el-input
      ref="input"
      :class="{'is-error': errorMsg}"
      :model-value="modelValue"
      v-bind="bind"
      @update:modelValue="handleInput"
      @blur="handleBlur"
      @change="$emit('change', $event)"
    >
      <template v-if="$slots.append" #append><slot name="append"></slot></template>
      <template v-if="$slots.prefix" #prefix><slot name="prefix"></slot></template>
      <template v-if="$slots.prepend" #prepend><slot name="prepend"></slot></template>
      <template v-if="$slots.suffix" #suffix><slot name="suffix"></slot></template>
    </el-input>
    <!--
      modelValue.length判断输入框是否有值，有值才显示errorMsg，
      如果不要这个条件，errorMsg提示会和el-form-item校验空值时的提示语重合
    -->
    <span v-if="errorMsg && modelValue.length" class="error-msg">{{errorMsg}}</span>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
      required: true
    },
    max: {
      type: Number
    },
    min: {
      type: Number
    },
    precision: {
      type: Number,
      default: 0.01
    },
    bind: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:modelValue', 'change'],
  data () {
    return {
      errorMsg: ''
    }
  },
  methods: {
    handleInput (val) {
      if (this.bind.isAllowChar && val.indexOf('/') !== -1) {
        // 兼容可以输入 / 的情况
        this.$emit('update:modelValue', '/')
        return
      }
      if (!val) {
        this.$emit('update:modelValue', val)
        return void 0
      }
      const {max, min, precision} = this
      let result = Number(val)
      if (val && val.length === 1 && val === '-') {
        this.errorMsg = ''
        this.$emit('update:modelValue', val)
        return void 0
      }
      if (Number.isNaN(result)) {
        this.errorMsg = '请输入数字'
        this.$emit('update:modelValue', this.modelValue)
        return void 0
      }
      if (typeof max === 'number' && max < result) {
        this.errorMsg = `请输入小于${max}的数字`
        this.$emit('update:modelValue', this.modelValue)
        return void 0
      }
      if (typeof min === 'number' && min > result) {
        this.errorMsg = `请输入大于${min}的数字`
        this.$emit('update:modelValue', this.modelValue)
        return void 0
      }
      if (!precision && !Number.isInteger(result)) {
        this.errorMsg = `请输入整数`
        this.$emit('update:modelValue', this.modelValue)
        return void 0
      }
      const strPrecision = `${precision}`
      const precisionSplit = strPrecision.split('.')
      let precisionSpotLen = 0
      if (precisionSplit[1]) {
        precisionSpotLen = precisionSplit[1].length
      }
      const valSplit = val.split('.')
      let valSpotLen = 0
      if (valSplit[1]) {
        valSpotLen = valSplit[1].length
      }
      if (valSpotLen > precisionSpotLen) {
        this.errorMsg = `只支持输入小数点后${precisionSpotLen}位数字`
        this.$emit('update:modelValue', this.modelValue)
        return void 0
      }
      this.errorMsg = ''
      this.$emit('update:modelValue', val)
    },
    handleBlur () {
      if (this.bind.isAllowChar && /\//.test(this.modelValue)) {
        // 兼容可以输入 / 的情况
        this.$emit('update:modelValue', this.modelValue)
        this.errorMsg = ''
        return
      }
      if (this.modelValue === '') return void 0
      if (this.modelValue === '-') {
        // 如果是输入 - , 兼容输入值大于0的情况，失焦清空
        this.$emit('update:modelValue', '')
        return void 0
      }
      const willChangeValue = Number(this.modelValue || '0')
      if (Number.isNaN(willChangeValue)) {
        this.$emit('update:modelValue', '0')
      } else {
        this.$emit('update:modelValue', `${willChangeValue}`)
      }
      this.errorMsg = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.y-input-number-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
  .error-msg {
    display: inline-block;
    height: 14px;
    line-height: 14px;
    position: absolute;
    bottom: -16px;
    left: 0;
    color: red;
  }
  .is-error :deep(.el-input__inner) {
    border-color: red;
  }
}
</style>
```
:::
::::

## 自定义日期选择器
<ActualCombatTwo />

```vue
<template>
  <div class="Date_Select_Wrapper">
    <el-button
      class="Date_Btn"
      v-for="item in getButtonList"
      :key="item.value"
      :type="select === item.value ? 'primary' : ''"
      @click="select = item.value">
      {{item.label}}
    </el-button>
    <el-date-picker
      v-if="select === diyValue"
      v-model="daterange"
      type="daterange"
      value-format="YYYY-MM-DD"
      :disabled="select !== diyValue"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    options: {
      type: Array,
      default: () => [
        {
          value: 6,
          label: '7天'
        }, {
          value: 14,
          label: '15天'
        }, {
          value: 29,
          label: '30天'
        }
      ]
    }
  },
  data () {
    const diyValue = Symbol('自定义的value值')
    return {
      select: '',
      diyValue,
      button_group: [{
        value: diyValue,
        label: '自定义'
      }],
      daterange: []
    }
  },
  computed: {
    getButtonList () {
      return this.options.concat(this.button_group)
    },
    getValue () {
      const startFormat = 'yyyy-MM-DD 00:00:00'
      const endFormat = 'yyyy-MM-DD 23:59:59'
      if (this.select === this.diyValue) {
        console.log(this.daterange, 'daterange')
        try {
          return [
            moment(this.daterange[0]).format('yyyy-MM-DD HH:mm:ss'),
            moment(this.daterange[1]).format('yyyy-MM-DD 23:59:59')
          ]
        } catch (err) {
          return null
        }
      } else {
        return [
          moment(Date.now()).subtract(this.select, 'days').format(startFormat),
          moment(Date.now()).format(endFormat)
        ]
      }
    }
  },
  created () {
    this.$emit('input', this.getValue)
    this.getDate()
  },
  methods: {
    getDate () {
      this.select = this.getButtonList[0].value
    }
  },
  watch: {
    getValue (val) {
      console.log(val, 'val')
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.Date_Select_Wrapper {
  display: flex;
  .Date_Btn {
    margin-left: 0;
    margin-right: 20px;
    width: 100px;
    border-radius: 4px;
    border-color: #00A8FF;
    color: #00A8FF;
  }
  :deep(.el-button--primary) {
    color: white;
  }
}
</style>
```

## 指标卡
<ActualCombatThree />

```vue
<template>
  <div
    class="y-datacard-wrapper"
    :class="[size, opacity]"
    :style="{backgroundColor: color}"
    @click="$emit('on-click')"
    ref="yDatacard"
  >
    <div class="y-datacard-title">
      {{title}}
    </div>
    <div class="y-datacard-data">
      <el-tooltip effect="dark" :content="data + ''" placement="top-start" :disabled="istooltip">
        <span v-if="!isToLocaleString" class="y-datacard-data-value" ref="yDatacardDataValue">{{data}}</span>
        <!-- v-locale-string指令代码见 数字千分符化 -->
        <span v-else class="y-datacard-data-value" ref="yDatacardDataValue" v-locale-string="{ value: data, empty: '0' }"></span>
      </el-tooltip>
      <span class="y-datacard-data-unit">{{unit}}</span>
    </div>
    <div class="y-datacard-icon" v-if="icon">
      <img style="width: 100%; height: 100%;" :src="icon" alt="" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'YDataCard',
  props: {
    color: {
      type: String,
      default: '#7590F2'
    },
    size: {
      type: String,
      default: 'normal'
    },
    title: {
      type: String,
      default: ''
    },
    data: {
      type: [String, Number],
      default: ''
    },
    unit: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    opacity: {
      type: String,  // 有跳转时悬浮透明度
      default: ''
    },
    isToLocaleString: {
      // 是否需要格式化千分符
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      istooltip: true // 为true时没有提示信息
    }
  },

  updated () {
    this.getTooltip()
  },

  methods: {
     getTooltip() {
      let cardDataValue = this.$refs.yDatacardDataValue
      let scrollWidth = cardDataValue && cardDataValue.scrollWidth // 可视区域宽度+被隐藏区域宽度
      let offsetWidth = cardDataValue && cardDataValue.offsetWidth // width + 左右padding + 左右boder
      this.istooltip = !(scrollWidth > offsetWidth) // tooltip为true提示信息tooltip不显示（:disabled="true"）
    }
  },
}
</script>

<style lang="scss" scoped>
@function sizeStyle($type, $t) {
  @if $t == 'small' {
    @if $type == 'public-padding' {
      @return 20px
    }
    @else if $type == 'padding' {
      @return 20px 20px 16px
    }
    @else if $type == 'height' {
      @return 98px
    }
    @else if $type == 'width' {
      @return 277px
    }
    @else if $type == 'title' {
      @return 13px
    }
    @else if $type == 'data' {
      @return 22px
    }
    @else if $type == 'unit' {
      @return 14px
    }
    @else if $type == 'icon' {
      @return 24px
    }
  }

  @else if $t =='normal' {
    @if $type == 'public-padding' {
      @return 28px
    }
    @else if $type == 'padding' {
      @return 28px 28px 23px
    }
    @else if $type == 'height' {
      @return 140px
    }
    @else if $type == 'width' {
      @return 395px
    }
    @else if $type == 'title' {
      @return 18px
    }
    @else if $type == 'data' {
      @return 32px
    }
    @else if $type == 'unit' {
      @return 20px
    }
    @else if $type == 'icon' {
      @return 34px
    }
  }
}

@function multiplication($opacity) {
  @if $opacity == 'one' {
    @return 0.1
  }
  @else if $opacity == 'two' {
    @return 0.2
  }
  @else if $opacity == 'three' {
    @return 0.3
  }
  @else if $opacity == 'four' {
    @return 0.4
  }
  @else if $opacity == 'five' {
    @return 0.5
  }
  @else if $opacity == 'six' {
    @return 0.6
  }
  @else if $opacity == 'seven' {
    @return 0.7
  }
  @else if $opacity == 'eight' {
    @return 0.8
  }
  @else if $opacity == 'nine' {
    @return 0.9
  }
}

.y-datacard-wrapper {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  color: white;
  background-color: white;
  cursor: pointer;
  user-select: none;
  @each $i in 'small', 'normal' {
    &.#{$i} {
      padding: sizeStyle('padding', $i);
      height: sizeStyle('height', $i);
      width: sizeStyle('width', $i);
      .y-datacard-title {
        font-size: sizeStyle('title', $i);
      }
      .y-datacard-data {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        .y-datacard-data-value {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: sizeStyle('data', $i);
        }
        .y-datacard-data-unit {
          flex-shrink: 0;
          padding-right: 4px;
          width: 36px;
          text-align: right;
          font-size: sizeStyle('unit', $i);
        }
      }
      .y-datacard-icon {
        position: absolute;
        right: sizeStyle('public-padding', $i);
        top: sizeStyle('public-padding', $i);
        width: sizeStyle('icon', $i);
        height: sizeStyle('icon', $i);
      }
    }
  }
  @each $opacity in 'one' 'two' 'three' 'four' 'five' 'six' 'seven' 'eight' 'nine' {
    &.#{$opacity} {
      &:hover {
        opacity: multiplication($opacity) !important;
      }
    }
  }
}
</style>
```

## 数字千分符化

:::: code-group
::: code-group-item Vue2
```js
const Empty = Symbol('空数据')
const toLocalString = val => typeof val === 'number' ? val.toLocaleString() : Number(val).toLocaleString()
const parseBinding = (binding) => {
  const value = binding.value
  const defaultOption = {
    toLocalString,
    value,
    empty: ''
  }
  if (typeof value === 'object') {
    return {
      ...defaultOption,
      ...value
    }
  } else {
    return {
      ...defaultOption
    }
  }
}
const formatValue = (val) => {
  return (val !== '0' && val !== 0 && !val) || Number.isNaN(Number(val)) ? Empty : Number(val)
}

export default {
  inserted (el, binding) {
    const { toLocalString, value, empty } = parseBinding(binding)
    const getFormatValue = formatValue(value)
    el.innerText = getFormatValue === Empty ? empty : toLocalString(value)
  },

  // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
  componentUpdated (el, binding) {
    const { toLocalString, value, empty } = parseBinding(binding)
    const getFormatValue = formatValue(value)
    el.innerText = getFormatValue === Empty ? empty : toLocalString(value)
  },

  // 指令与元素解绑时
  unbind () {
  }
}
```
:::
::: code-group-item Vue3
```js
const Empty = Symbol('空数据')
const toLocalString = val => typeof val === 'number' ? val.toLocaleString() : Number(val).toLocaleString()
const parseBinding = (binding) => {
  const value = binding.value
  const defaultOption = {
    toLocalString,
    value,
    empty: ''
  }
  if (typeof value === 'object') {
    return {
      ...defaultOption,
      ...value
    }
  } else {
    return {
      ...defaultOption
    }
  }
}
const formatValue = (val) => {
  return (val !== '0' && val !== 0 && !val) || Number.isNaN(Number(val)) ? Empty : Number(val)
}

export default {
  mounted (el, binding) {
    const { toLocalString, value, empty } = parseBinding(binding)
    const getFormatValue = formatValue(value)
    el.innerText = getFormatValue === Empty ? empty : toLocalString(value)
  },

  // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
  updated (el, binding) {
    const { toLocalString, value, empty } = parseBinding(binding)
    const getFormatValue = formatValue(value)
    el.innerText = getFormatValue === Empty ? empty : toLocalString(value)
  },

  // 指令与元素解绑时
  unmounted () {
  }
}
```
:::
::::

## 倒计时
<ActualCombatFour />

```vue
<template>
  <div style="margin-top: 10px;">当前时间{{now}}</div>
  <div style="margin-top: 10px;">结束时间{{end}}</div>
  <div style="margin-top: 10px;">{{bbb}}</div>
</template>

<script>
import moment from 'moment'
import downTime from 'xxx/downTime'

export default {
  data () {
    return {
      bbb: '',
      now: '',
      end: ''
    }
  },

  mounted () {
    this.aaa()
  },

  methods: {
    aaa () {
      // 当前时间
			const nowTime = new Date().getTime()
			// 第二天零点的时间
      const endTime = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000
      const time = endTime - nowTime;

      // 开启倒计时， 传值进去 设置当前的时间
      this.bbb = downTime("demo", time / 1000);

      setInterval(() => {
      // 获取倒计时对象
        this.bbb = JSON.stringify(downTime("demo"))
        this.now = moment(new Date()).format('yyyy-MM-DD HH:mm:ss')
        this.end = moment(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000).format('yyyy-MM-DD HH:mm:ss')
      }, 1000);
    }
  }
}
</script>
```
- 封装方法
```js
/**
 * 传value是设置时间，不传value是返回当前倒计时时间对象，通过setInterval调用即可实现倒计时更新。
 * 返回{end, day, hour, minute, second}，end可用于即时检查倒计时是否结束。
 * @param {String} key 计时器唯一的key
 * @param {Number} value 服务器返回离倒计时结束的时间戳（单位：秒）
 */
export default function downTime(key, value) {
  console.log(key, value, 'key, value')
  if (!key || typeof key != 'string') {
    throw Error('downTime key fail');
  } else if (!sessionStorage) {
    throw Error('Not support sessionStorage');
  }

  const keyPrefix = '_down_time_';
  key = keyPrefix + key;

  if (typeof value != 'undefined') {
    //设置时间
    if (isNaN(value)) {
      throw Error('downTime value must be number');
    } else {
      value = parseInt(value);
      sessionStorage.setItem(key, JSON.stringify([value, Math.round(new Date().getTime() / 1000)]));
    }
  } else {
    //取出倒计时
    const data = sessionStorage.getItem(key);
    if (data && /\[\d+,\d+\]/.test(data)) {
      const arr = JSON.parse(data);

      //剩余秒数 = 服务器返回时间 - (当前系统时间 - 服务器响应时间点)
      const seconds = Math.max(0, Math.round(arr[0] - (new Date().getTime() / 1000 - new Date(arr[1] * 1000).getTime() / 1000)));

      const end = seconds <= 0;
      if (end) {
        return { end, seconds, day: '00', hour: '00', minute: '00', second: '00' };
      }

      let s = seconds;
      let day = Math.floor(s / 86400); s -= day * 86400;
      let hour = Math.floor(s / 3600); s -= hour * 3600;
      let minute = Math.floor(s / 60); s -= minute * 60;
      let second = Math.floor(s);
      day = day < 10 ? '0' + day : day.toString();
      hour = hour < 10 ? '0' + hour : hour.toString();
      minute = minute < 10 ? '0' + minute : minute.toString();
      second = second < 10 ? '0' + second : second.toString();

      return { end, seconds, day, hour, minute, second };
    }
    return null;
  }
}
```
