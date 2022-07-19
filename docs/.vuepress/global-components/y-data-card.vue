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
