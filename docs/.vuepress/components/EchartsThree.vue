<template>
  <div id="line" style="width: 100%;"></div>
</template>

<script>
import echarts from 'echarts'
import moment from 'moment'

export default {
  data () {
    return {
    }
  },

  mounted () {
    this.getLine()
  },

  methods: {
    getLine () {
      var myCircle = echarts.init(document.getElementById('line'))
      myCircle.resize({height: 300}) // 重新计算高度

      this.getTimeArr() // 获取准备好的时间段数组

      var option = {
        title: {
          text: '折线图',
          top: '3%',
          textStyle: {
            fontSize: 14,
            fontWeight: 'bolder'
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#fff',
          textStyle: {
            color: '#000',
            lineHeight: 26
          },
          padding: [10, 20, 10, 10],
          extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            formatter: function (value) {
              // 对x轴显示的数据 2021-1-25 17:30:10 进行处理，最后显示 17:30
              var time = value.split(' ')[1]
              time = time.substr(0, time.length - 3)
              return time
            }
          },
          data: this.arrTime // 准备一个时间序列数组
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: '已发起',
            type: 'line',
            itemStyle: {
              color: 'rgba(73, 169, 238, 1)'
            },
            symbolSize: 8,
            data: [11, 11, 15, 13, 12, 13, 30, 10, 10, 10, 20, 30, 25]
          },
          {
            name: '已完结',
            type: 'line',
            itemStyle: {
              color: 'rgba(152, 216, 125, 1)'
            },
            symbol: 'rect',
            symbolSize: 8,
            data: [1, 2, 2, 5, 3, 2, 0, 1, 10, 1, 2, 3, 4]
          }
        ]
      }
      myCircle.setOption(option)
    },

    // 拿到当前时间的半个小时时间间隔的时间序列
    // 例如当前是 16点02分
    // 拿到的数组是 [13:00, 13:30, 14:00, 14:30, 15:00, 15:30, 16:00, 16:30, 17:00, 17:30, 18:00, 18:30: 19:00]
    getTimeArr () {
      // 准备时间段数组
      var arrTime = []
      // 拿到当前的年月日
      var date = moment().format('yyyy-MM-DD')
      // 拿到当前的小时数
      var nowHour = new Date().getHours()
      // 半个小时时间间隔
      var interval = 30 * 60 * 1000
      var timestamp
      if (new Date().getTime() >= new Date(`${date} ${nowHour}:30:00`).getTime()) {
        // 拿到当前小时整点的时间戳(15:46拿到的是当天15:30的时间戳)
        timestamp = new Date(`${date} ${nowHour}:30:00`).getTime()
      } else {
        // 拿到当前小时整点的时间戳(15:26拿到的是当天15:00的时间戳)
        timestamp = new Date(`${date} ${nowHour}:00:00`).getTime()
      }
      arrTime.push(timestamp)
      console.log(arrTime, 'arrTime')
      // console.log(timestamp, 'timestamp')
      var addTimeStamp, decreaseTimeStamp
      addTimeStamp = decreaseTimeStamp = timestamp // for循环操作timestamp会改变上面timestamp的值
      for (let i = 0; i < 6; i++) {
        addTimeStamp += interval
        arrTime.push(addTimeStamp)
      }
      for (let i = 0; i < 6; i++) {
        decreaseTimeStamp -= interval
        arrTime.unshift(decreaseTimeStamp)
      }
      // 赋值准备的时间数组
      this.arrTime = arrTime.map(item => moment(item).format('yyyy-MM-DD HH:mm:ss'))
    }
  }
}
</script>

<style>

</style>