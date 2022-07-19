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
      console.log(this.modelValue, 'modelValue')
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