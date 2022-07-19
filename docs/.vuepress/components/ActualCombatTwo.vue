<template>
  <YDate style="padding-top: 14px;" @input="selectDate = $event"></YDate>
  <p>{{selectDate}}</p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import YDate from '../global-components/y-date.vue'

export default defineComponent({
  components: {
    YDate
  },

  setup () {
    const selectDate = ref<string>('')

    return {
      selectDate
    }
  }
})
</script>
