# echarts实战遇到的问题
## y轴数据过大溢出边界
![image](/428144243139.gif)
当折线或柱子数值过大时，y轴会溢出边界，能不能让y轴随着数值的变化而变化呢？ Yes  Absolutely 能。
我们只需要在grid下把containLabel设置为true就可以了，知道不难，难不知道。
![image](/428144902751.gif)

## 柱状图x轴坐标显示不全
- 刻度间隔全部显示显示-xAxis
```js
xAxis : [
    {
        type : 'category',
        data : xdt,
        axisTick: {
            alignWithLabel: true
        },
        // 解决方法 - 加 interval： 0
        axisLabel:{
            interval: 0
        }
    }
],
```

## 自适应 - 防抖resize
```js
mounted () {
    this.storeFun = this.debounce(this.updateEcharts, 500)
    window.addEventListener('resize', this.storeFun)
},

beforeDestroy () {
    window.removeEventListener('resize', this.storeFun)
},

methods: {
    updateEcharts () {
        this.$refs.stateOverviewChart.chart.resize() // echats的图表刷新方法
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
```
