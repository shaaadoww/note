<template>
  <div id="pie" style="width: 100%;"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  data () {
    return {
      myCircle: null
    }
  },

  mounted () {
    this.getCircle()

    this.storeFun = this.debounce(this.updateEcharts, 500)
    window.addEventListener('resize', this.storeFun)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.storeFun)
  },

  methods: {
    // 饼状图形
    getCircle () {
      this.myCircle = echarts.init(document.getElementById('pie'))
      this.myCircle.resize({height: 300}) // 重新计算高度
      var echartData = [
        {value: 335, name: '待审批'},
        {value: 310, name: '审批中'},
        {value: 234, name: '已完结'},
        {value: 135, name: '已延期'}
      ]
      let total = echartData.reduce((a, b) => {
        return a + b.value
      }, 0)
      var totalNum = total

      var option = {
        color: ['rgb(73, 169, 238)', 'rgb(152, 216, 125)', 'rgb(255, 216, 110)', 'rgb(243, 133, 123)'],
        title: [
          {
            show: true,
            text: totalNum,
            subtext: '工单总数',
            left: '34%',
            top: '40%',
            textAlign: 'center',
            z: 0,
            zlevel: 100,
            textStyle: {
              fontWeight: 'normal',
              fontSize: 30
            },
            itemGap: 10
          },
          {
            subtext: '饼状图',
            subtextStyle: {
              fontSize: 14,
              fontWeight: 'bolder',
              color: 'rgba(0, 0, 0, 1)'
            },
            left: '11%'
          }
        ],
        // 图例
        legend: {
          orient: 'vertical',
          left: '60%',
          top: '28%',
          itemGap: 15,
          icon: 'pin',
          formatter: function (name) {
            let res = echartData.filter(v => v.name === name)
            let percent = ((res[0].value * 100) / total).toFixed(2) // toFixed(2)保留两位小数
            return `${name}     ${res[0].value}     ${percent}%`
          },
          selected: {
              '已延期': false // 默认置灰
          },
          // selectedMode: false // 不可点击
        },
        series: [
          {
            name: '企业数量',
            type: 'pie',
            right: '30%',
            radius: ['50%', '60%'], // 饼图大小
            avoidLabelOverlap: false,
            // 显示在中间
            label: {
              norlegendHoverLink: false,
              show: true,
              position: 'center', // 文字显示在中间
              align: 'center',
              verticalAlign: 'middle',
              textStyle: {
                // 设置文字样式
                fontSize: '0'
              }
            },
            emphasis: {
              show: true, // 文字至于中间时，这里需为true
              formatter: function (data) {
                // 此处重点，其中定义的 b,c,d 是用于下面的 rich来单独设置样式，因为这里不支持 HTML标签
                let html = `{b| ${data.name}} \n {c|${data.value}} \n {d|${data.percent}%}`
                return html
              },
              // 样式设置
              rich: {
                b: {
                  // name 文字样式
                  lineHeight: 20,
                  fontSize: 20,
                  textAlign: 'center',
                  color: 'black'
                },
                c: {
                  // value 文字样式
                  lineHeight: 36,
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#000'
                },
                d: {
                  // 百分比样式
                  fontSize: 12,
                  color: '#000'
                }
              }
            },
            data: echartData,
            labelLine: {
              show: false
            }
          }
        ]
      }
      this.myCircle.setOption(option)

      // 自定义事件
      this.myCircle.on('mouseover', params => {
        this.myCircle.setOption({
          title: {
            show: false // 当鼠标移动上时，则设置 title 不显示
          }
        })
      })
      this.myCircle.on('mouseout', params => {
        this.myCircle.setOption({
          title: {
            show: true // 当鼠标移出 饼图区域时，则打开 title显示
          }
        })
      })
    },

    updateEcharts () {
      this.myCircle.resize({height: 300}) // 重新计算高度
    },

    debounce (fn, wait = 1000) {
      var timer = null
      return function () {
        if (timer !== null) {
          clearTimeout(timer)
        }
        timer = setTimeout(fn, wait)
      }
    }
  }
}
</script>

<style>

</style>