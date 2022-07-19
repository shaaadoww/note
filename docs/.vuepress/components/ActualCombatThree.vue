<template>
  <YDataCard
    v-for="(item, index) of indicatorList"
    :key="index"
    :title="item.title"
    :data="item.data"
    :icon="item.icon"
    :unit="item.unit"
    :color="item.color"
    :size="item.size"
    :opacity="item.opacity"
    :isToLocaleString="item.isToLocaleString"
  ></YDataCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import YDataCard from '../global-components/y-data-card.vue'

export default defineComponent({
  components: {
    YDataCard
  },

  setup () {
    const indicatorList = {
      aaa: {
        title: 'xxx',
        data: '11',
        unit: '(个)',
        color: '#7590F2',
        icon: 'https://img2.baidu.com/it/u=3916833205,2012938924&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=398',
        size: 'small',
        opacity: 'five'
      },
      bbb: {
        title: 'xxx',
        data: '11111',
        unit: '(个)',
        color: '#7590F2',
        icon: 'https://img2.baidu.com/it/u=3916833205,2012938924&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=398',
        isToLocaleString: true
      }
    }

    return {
      indicatorList
    }
  }
})

</script>

<style lang="scss" scoped>
.y-datacard-wrapper {
  margin-top: 10px;
  + .y-datacard-wrapper {
    margin-left: 20px;
  }
}

</style>