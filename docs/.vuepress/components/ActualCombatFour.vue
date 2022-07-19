<template>
  <div style="margin-top: 10px;">当前时间{{now}}</div>
  <div style="margin-top: 10px;">结束时间{{end}}</div>
  <div style="margin-top: 10px;">{{bbb}}</div>
</template>

<script>
import moment from 'moment'
import downTime from '../js-methods/downTime'

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

<style>

</style>