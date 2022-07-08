# echars实例
## 柱状图
<EchartsOne></EchartsOne>

```vue
<template>
  <div id="bar" style="width: 100%;"></div>
</template>
```
```js

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
```

## 饼图

<EchartsTwo></EchartsTwo>

```vue
<template>
  <div id="bie" style="width: 100%;"></div>
</template>
```
```js
// 饼状图形
getCircle () {
  var myCircle = echarts.init(document.getElementById('pie'))
  myCircle.resize({height: 300}) // 重新计算高度
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
        subtext: '工单数据总览',
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
        显示在中间
        label: {
          norlegendHoverLink: false, // 移入leged不mal: {
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
          }
        },
        data: echartData,
        labelLine: {
          show: false
        }
      }
    ]
  }
  myCircle.setOption(option)

  // 自定义事件
  myCircle.on('mouseover', params => {
    myCircle.setOption({
      title: {
        show: false // 当鼠标移动上时，则设置 title 不显示
      }
    })
  })
  myCircle.on('mouseout', params => {
    myCircle.setOption({
      title: {
        show: true // 当鼠标移出 饼图区域时，则打开 title显示
      }
    })
  })
}
```

## 折线图

<EchartsThree></EchartsThree>

```vue
<template>
  <div id="line" style="width: 100%;"></div>
</template>
```
```js
// 折线图
getLine () {
  var myCircle = echarts.init(document.getElementById('line'))
  myCircle.resize({height: 300}) // 重新计算高度

  this.getTimeArr() // 获取准备好的时间段数组

  var option = {
    title: {
      text: '工单处理趋势',
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
}
```

```js
// 拿到当前时间的半个小时时间间隔的时间序列
// 例如当前是 16点02分
// 拿到的数组是 [13:00, 13:30, 14:00, 14:30, 15:00, 15:30, 16:00, 16:30, 17:00, 17:30, 18:00, 18:30: 19:00]
getTimeArr () {
  // 准备时间段数组
  var arrTime = []
  // 拿到当前的年月日
  var date = formatDate(new Date()).split(' ')[0]
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
  this.arrTime = arrTime.map(item => formatDate(item))
}
```
