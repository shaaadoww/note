<template>
  <div id="bar" style="padding-top: 20px; width: 100%;"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  data () {
    return {
    }
  },

  mounted () {
    this.getChart()
  },

  methods: {
    // 加载表格的函数，在mounted中调用
    getChart () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('bar'))
      myChart.resize({ height: 300 }) // 重新计算高度
      // 指定图表的配置项和数据
      const dataset = {
        dimensions: ['product', '工单总数', '待审批', '审批中', '已完结', '已评分', '已延期'],
        source: [
          {product: 'test1申请', '工单总数': 43.3, '待审批': 85.8, '审批中': 93.7, '已完结': 10, '已评分': 20, '已延期': 30},
          {product: 'test2申请', '工单总数': 83.1, '待审批': 73.4, '审批中': 55.1, '已完结': 10, '已评分': 20, '已延期': 30},
          {product: 'test3申请', '工单总数': 183.1, '待审批': 22.4, '审批中': 55.1, '已完结': 9, '已评分': 10, '已延期': 30},
          {product: 'test4申请', '工单总数': 66.1, '待审批': 20.4, '审批中': 51.1, '已完结': 11, '已评分': 20, '已延期': 41},
          {product: 'test5申请', '工单总数': 28.4, '待审批': 61.2, '审批中': 54.5, '已完结': 6, '已评分': 30, '已延期': 10}
        ]
      }
      var option = {
        title: {
          text: '柱状图',
          left: '5%',
          textStyle: {
            fontSize: 14
          }
        },
        legend: {
          bottom: '13%',
          itemGap: 30,
          icon: 'pin'
        },
        tooltip: {},
        color: ['#36cfcf', '#b9d901', '#ff8a15', '#7ebafa', '#9c2089', '#6c5ac9'],
        // 数据
        dataset: dataset,
        xAxis: {
          type: 'category'
        },
        yAxis: {
          name: '工\n单\n数',
          nameLocation: 'left',
          splitLine: {
            show: false
          },
          nameTextStyle: {
            fontSize: 14,
            padding: [200, 80, -10, 0]
          }
        },
        series: [
          {type: 'bar'}, {type: 'bar'}, {type: 'bar'}, {type: 'bar'}, {type: 'bar'}, {type: 'bar'}
        ],
        dataZoom: [
          {
            show: dataset.source.length > 3,
            type: 'slider',
            xAxisIndex: [0],
            start: 0,
            end: (3 / dataset.source.length) * 100
          }
        ],
        grid: {
          bottom: '30%'
        }
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

<style>

</style>