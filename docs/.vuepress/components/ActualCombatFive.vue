<template>
  <div style="margin-top: 10px;">距离明日零点还有：{{d}}天{{h}}时:{{m}}分:{{s}}秒</div>
</template>

<script>

export default {
  data () {
    return{
      d:'',
      h:'',
      m:'',
      s:''
    }
  },

  methods: {
    countTime () {
      // 定义结束时间戳
      const end = Date.parse(new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000));
      // 定义当前时间戳
      const now = Date.parse(new Date())
      // 做判断当倒计时结束时都为0
      if (now >= end) {
        this.d = 0
        this.h = 0
        this.m = 0
        this.s = 0
        return
      }

      // 用结束时间减去当前时间获得倒计时时间戳
      const msec = end - now
      let d = parseInt(msec / 1000 / 60 / 60 / 24) // 算出天数
      let h = parseInt(msec / 1000 / 60 / 60 % 24) // 算出小时数
      let m = parseInt(msec / 1000 / 60 % 60) // 算出分钟数
      let s = parseInt(msec / 1000 % 60) // 算出秒数

      // 给数据赋值
      this.d = d
      this.h = h > 9 ? h : '0' + h
      this.m = m > 9 ? m : '0' + m
      this.s = s > 9 ? s : '0' + s

      // 使用定时器 然后使用递归 让每一次函数能调用自己达到倒计时效果
      setTimeout(() => {
        this.countTime()
      }, 1000)
    }
  },

  mounted() {
    this.countTime()
  },

}
</script>

<style>

</style>