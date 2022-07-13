# 基本使用

## 入门
###### 通过 npm 获取 echarts
```md:no-line-numbers
npm install echarts --save
```

###### 引入 ECharts
- 通过标签方式直接引入构建好的 echarts 文件
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <!-- 引入 ECharts 文件 -->
    <script src="echarts.min.js"></script>
</head>
</html>
```

###### 绘制一个简单的图表
- 在绘图前我们需要为 ECharts 准备一个具备高宽的 DOM 容器。
```html
<body>
  <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
  <div id="main" style="width: 600px;height:400px;"></div>
</body>
```

- 然后就可以通过 echarts.init 方法初始化一个 echarts 实例并通过 setOption 方法生成一个简单的柱状图，下面是完整代码。
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>ECharts</title>
        <!-- 引入 echarts.js -->
        <script src="echarts.min.js"></script>
    </head>
    <body>
        <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
        <div id="main" style="width: 600px;height:400px;"></div>
        <script type="text/javascript">
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        </script>
    </body>
</html>
```

## ECharts 基础概念概览

### echars实例
- 一个网页中可以创建多个 echarts 实例。每个 echarts 实例 中可以创建多个图表和坐标系等等（用 option 来描述）。准备一个 DOM 节点（作为 echarts 的渲染容器），就可以在上面创建一个 echarts 实例。每个 echarts 实例独占一个 DOM 节点。
![image](/clipboard.png)

### 系列（series）
- 系列（series）是指：一组数值以及他们映射成的图。“所以，一个 系列 包含的要素至少有：一组数值、图表类型（series.type）、以及其他的关于这些数据如何映射成图的参数。
```md
echarts 里系列类型（series.type）就是图表类型。系列类型（series.type）至少有：
    line（折线图）、
    bar（柱状图）、
    pie（饼图）、
    scatter（散点图）、
    graph（关系图）、
    tree（树图）、
```

如下图，右侧的 option 中声明了三个 系列（series）：pie（饼图系列）、line（折线图系列）、bar（柱状图系列），每个系列中有他所需要的数据（series.data）。
![image](/clipboard-two.png)
![image](/clipboard-three.png)



### 组件（component）
```
在系列之上，echarts 中各种内容，被抽象为“组件”。
    echarts 中至少有这些组件：
    xAxis（直角坐标系 X 轴）、
    yAxis（直角坐标系 Y 轴）、
    grid（直角坐标系底板）、
    angleAxis（极坐标系角度轴）、
    radiusAxis（极坐标系半径轴）、
    polar（极坐标系底板）、
    geo（地理坐标系）、
    dataZoom（数据区缩放组件）、
    visualMap（视觉映射组件）、
    tooltip（提示框组件）、
    toolbox（工具栏组件）、
    series（系列）
```
我们注意到，其实系列（series）也是一种组件，可以理解为：系列是专门绘制“图”的组件。
如下图，右侧的 option 中声明了各个组件（包括系列），各个组件就出现在图中。
![image](/clipboard-four.png)

- option 表述了：数据、数据如何映射成图形、交互行为
```js
// 创建 echarts 实例。
var dom = document.getElementById('dom-id');
var chart = echarts.init(dom);

// 用 option 描述 `数据`、`数据如何映射成图形`、`交互行为` 等。
// option 是个大的 JavaScript 对象。
var option = {
    // option 每个属性是一类组件。
    legend: {...},
    grid: {...},
    tooltip: {...},
    toolbox: {...},
    dataZoom: {...},
    visualMap: {...},
    // 如果有多个同类组件，那么就是个数组。例如这里有三个 X 轴。
    xAxis: [
        // 数组每项表示一个组件实例，用 type 描述“子类型”。
        {type: 'category', ...},
        {type: 'category', ...},
        {type: 'value', ...}
    ],
    yAxis: [{...}, {...}],
    // 这里有多个系列，也是构成一个数组。
    series: [
        // 每个系列，也有 type 描述“子类型”，即“图表类型”。
        {type: 'line', data: [['AA', 332], ['CC', 124], ['FF', 412], ... ]},
        {type: 'line', data: [2231, 1234, 552, ... ]},
        {type: 'line', data: [[4, 51], [8, 12], ... ]}
    }]
};

// 调用 setOption 将 option 输入 echarts，然后 echarts 渲染图表。
chart.setOption(option);
```

- 系列里的 series.data 是本系列的数据。而另一种描述方式，系列数据从 dataset 中取：
```js
var option = {
    dataset: {
        source: [
            [121, 'XX', 442, 43.11],
            [663, 'ZZ', 311, 91.14],
            [913, 'ZZ', 312, 92.12],
            ...
        ]
    },
    xAxis: {},
    yAxis: {},
    series: [
        // 数据从 dataset 中取，encode 中的数值是 dataset.source 的维度 index （即第几列）
        {type: 'bar', encode: {x: 1, y: 0}},
        {type: 'bar', encode: {x: 1, y: 2}},
        {type: 'scatter', encode: {x: 1, y: 3}},
        ...
    ]
};
```

### 组件的定位

![image](/clipboard-five.png)
- 我们可以注意到，left right width 是一组（横向）、top bottom height 是另一组（纵向）。这两组没有什么关联。每组中，至多设置两项就可以了，第三项会被自动算出。例如，设置了 left 和 right 就可以了，width 会被自动算出。
> 少数圆形的组件或系列，可以使用“中心半径定位”，例如，pie（饼图）、sunburst（旭日图）、polar（极坐标系）。
中心半径定位，往往依据 center（中心）、radius（半径）来决定位置。


### 坐标系
```
很多系列，例如
    line（折线图）、
    bar（柱状图）、
    scatter（散点图）、
    heatmap（热力图）等等，
```
> 需要运行在 “坐标系” 上。坐标系用于布局这些图，以及显示数据的刻度等等。例如 echarts 中至少支持这些坐标系：直角坐标系、极坐标系、地理坐标系（GEO）、单轴坐标系、日历坐标系 等。其他一些系列，例如 pie（饼图）、tree（树图）等等，并不依赖坐标系，能独立存在。还有一些图，例如 graph（关系图）等，既能独立存在，也能布局在坐标系中，依据用户的设定而来。

> 一个坐标系，可能由多个组件协作而成。我们以最常见的直角坐标系来举例。直角坐标系中，包括有 xAxis（直角坐标系 X 轴）、yAxis（直角坐标系 Y 轴）、grid（直角坐标系底板）三种组件。xAxis、yAxis 被 grid 自动引用并组织起来，共同工作。

- 这是最简单的使用直角坐标系的方式：只声明了 xAxis、yAxis 和一个 scatter（散点图系列），echarts 暗自为他们创建了 grid 并关联起他们：
![image](/clipboard-six.png)

- 两个 yAxis，共享了一个 xAxis。两个 series，也共享了这个 xAxis，但是分别使用不同的 yAxis，使用 yAxisIndex 来指定它自己使用的是哪个 yAxis：
![image](/clipboard-seven.png)

再来看下图，一个 echarts 实例中，有多个 grid，每个 grid 分别有 xAxis、yAxis，他们使用 xAxisIndex、yAxisIndex、gridIndex 来指定引用关系：
![image](/clipboard-eight.png)

> 另外，一个系列，往往能运行在不同的坐标系中。例如，一个 scatter（散点图）能运行在 直角坐标系、极坐标系 、地理坐标系（GEO） 等各种坐标系中。同样，一个坐标系，也能承载不同的系列，如上面出现的各种例子，直角坐标系 里承载了 line（折线图）、bar（柱状图）等等。


### 异步数据加载和更新
- 在图表初始化后不管任何时候只要通过 jQuery 等工具异步获取数据后通过 setOption 填入数据和配置项就行。
```js
var myChart = echarts.init(document.getElementById('main'));

$.get('data.json').done(function (data) {
    myChart.setOption({
        title: {
            text: '异步数据加载示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    });
});

```
或者先设置完其它的样式，显示一个空的直角坐标轴，然后获取数据后填入数据。
```js
var myChart = echarts.init(document.getElementById('main'));
// 显示标题，图例和空的坐标轴
myChart.setOption({
    title: {
        text: '异步数据加载示例'
    },
    tooltip: {},
    legend: {
        data:['销量']
    },
    xAxis: {
        data: []
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: []
    }]
});

// 异步加载数据
// done():执行成功时执行
$.get('data.json').done(function (data) {
    // 填入数据
    myChart.setOption({
        xAxis: {
            data: data.categories
        },
        series: [{
            // 根据名字对应到相应的系列
            name: '销量',
            data: data.data
        }]
    });
});
```

### loading 动画
- 如果数据加载时间较长，一个空的坐标轴放在画布上也会让用户觉得是不是产生 bug 了，因此需要一个 loading 的动画来提示用户数据正在加载。
ECharts 默认有提供了一个简单的加载动画。只需要调用 showLoading 方法显示。数据加载完成后再调用 hideLoading 方法隐藏加载动画。
```js
myChart.showLoading();
// done():执行成功时执行
$.get('data.json').done(function (data) {
    myChart.hideLoading();
    myChart.setOption(...);
});
```

### 数据的动态更新
ECharts 由数据驱动，数据的改变驱动图表展现的改变，因此动态数据的实现也变得异常简单。
所有数据的更新都通过 setOption实现，你只需要定时获取数据，setOption 填入数据，而不用考虑数据到底产生了那些变化，ECharts 会找到两组数据之间的差异然后通过合适的动画去表现数据的变化。
ECharts 3 中移除了 ECharts 2 中的 addData 方法。如果只需要加入单个数据，可以先 data.push(value) 后 setOption

### 在图表中加入交互组件
```js
除了图表外 Apache ECharts (incubating)TM 中，提供了很多交互组件。例如：
    图例组件 legend、
    标题组件 title、
    视觉映射组件 visualMap、
    数据区域缩放组件 dataZoom、
    时间线组件 timeline
```

### 在代码加入 dataZoom 组件
- 先只在对单独一个横轴，加上 dataZoom 组件，代码示例如下：
```js
option = {
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'value'
    },
    dataZoom: [
        {   // 这个dataZoom组件，默认控制x轴。
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 10,      // 左边在 10% 的位置。
            end: 60         // 右边在 60% 的位置。
        }
    ],
    series: [
        {
            type: 'scatter', // 这是个『散点图』
            itemStyle: {
                opacity: 0.8
            },
            symbolSize: function (val) {
                return val[2] * 40;
            },
            data: [["14.616","7.241","0.896"],["3.958","5.701","0.955"],["2.768","8.971","0.669"],["9.051","9.710","0.171"],["14.046","4.182","0.536"],["12.295","1.429","0.962"],["4.417","8.167","0.113"],["0.492","4.771","0.785"],["7.632","2.605","0.645"],["14.242","5.042","0.368"]]
        }
    ]
}
```

- 如果想在坐标系内进行拖动，以及用滚轮（或移动触屏上的两指滑动）进行缩放，那么要再加上一个 inside 型的 dataZoom组件。直接在上面的 option.dataZoom 中增加即可：
```js
option = {
    ...,
    dataZoom: [
        {   // 这个dataZoom组件，默认控制x轴。
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 10,      // 左边在 10% 的位置。
            end: 60         // 右边在 60% 的位置。
        },
        {   // 这个dataZoom组件，也控制x轴。
            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
            start: 10,      // 左边在 10% 的位置。
            end: 60         // 右边在 60% 的位置。
        }
    ],
    ...
}
```


- 如果想 y 轴也能够缩放，那么在 y 轴上也加上 dataZoom 组件：
```js
option = {
    ...,
    dataZoom: [
        {
            type: 'slider',
            xAxisIndex: 0,
            start: 10,
            end: 60
        },
        {
            type: 'inside',
            xAxisIndex: 0,
            start: 10,
            end: 60
        },
        {
            type: 'slider',
            yAxisIndex: 0,
            start: 30,
            end: 80
        },
        {
            type: 'inside',
            yAxisIndex: 0,
            start: 30,
            end: 80
        }
    ],
    ...
}
```

### ECharts 中的事件和行为

- 在开发者可以监听这些事件，然后通过回调函数做相应的处理，比如跳转到一个地址，或者弹出对话框，或者做数据下钻等等。
- 在 ECharts 3 中绑定事件跟 2 一样都是通过 on 方法，但是事件名称比 2 更加简单了。ECharts 3 中，事件名称对应 DOM 事件名称，均为小写的字符串，如下是一个绑定点击操作的示例。
```js
myChart.on('click', function (params) {
    // 控制台打印数据的名称
    console.log(params.name);
});

```

