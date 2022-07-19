<template>
  <div class="Date_Select_Wrapper">
    <el-button
      class="Date_Btn"
      v-for="item in getButtonList"
      :key="item.value"
      :type="select === item.value?'primary':''"
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