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
