# vue实战技巧
## minxin 让组件复用灵活化
> Vue提供了minxin这种在组件内插入组件属性的方法，个人建议这货能少用就少用，但是有个场景则非常建议使用minxin：当某段代码重复出现在多个组件中，并且这个重复的代码块很大的时候，将其作为一个minxin常常能给后期的维护带来很大的方便。

## 自定义指令directive
- 高精度权限控制
> 我们通常给一个元素添加v-if / v-show，来判断该用户是否有权限，但如果判断条件繁琐且多个地方需要判断，这种方式的代码不仅不优雅而且冗余。针对这种情况，我们可以封装了一个指令权限，能简单快速的实现按钮级别的权限判断。我们先在新建个array.js文件，用于存放与权限相关的全局函数
```js
// array.js
export function checkArray (key) {
  let arr = ['admin', 'editor']
  let index = arr.indexOf(key)
  if (index > -1) {
    return true // 有权限
  } else {
    return false // 无权限
  }
}
然后在将array文件挂载到全局中

// main.js
import { checkArray } from "./common/array";
Vue.config.productionTip = false;
Vue.directive("permission", {
  inserted (el, binding) {
    let permission = binding.value; // 获取到 v-permission的值
    if (permission) {
      let hasPermission = checkArray(permission);
      if (!hasPermission) { // 没有权限 移除Dom元素
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  }
});
```
最后我们在页面中就可以通过自定义指令 v-permission来判断：
```js
<div class="btns">
  <button v-permission="'admin'">权限按钮1</button>  // 会显示
  <button v-permission="'visitor'">权限按钮2</button> //无显示
  <button v-permission="'editor'">权限按钮3</button> // 会显示
</div>
```

## 过滤器让数据处理更便利
理解过滤器
> 功能：对要显示的数据进行特定格式化后再显示。
注意：过滤器并没有改变原本的数据，需要对展现的数据进行包装。
> 使用场景：双花括号插值和 v-bind 表达式 (后者从 2.1.0+ 开始支持)。
2.定义过滤器
可以在一个组件的选项中定义本地的过滤器：
```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```
也可以在创建 Vue 实例之前全局定义过滤器：
```js
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```
使用过滤器
使用方法也简单，即在双花括号中使用管道符(pipeline) |隔开
```js
<!-- 在双花括号中 -->
<div>{{ myData| filterName}}</div>
<div>{{ myData| filterName(arg)}}</div>
<!-- 在 v-bind 中 -->
<div v-bind:id="rawId | formatId"></div>
过滤器可以串联：

{{ message | filterA | filterB }}
在这个例子中，filterA 被定义为接收单个参数的过滤器函数，表达式 message 的值将作为参数传入到函数中。然后继续调用同样被定义为接收单个参数的过滤器函数 filterB，将 filterA 的结果传递到 filterB 中。
```
接下来我们看个如何使用过滤器格式化日期的例子：
```js
<div>
  <h2>显示格式化的日期时间</h2>
  <p>{{ date }}</p>
  <p>{{ date | filterDate }}</p>
  <p>年月日: {{ date | filterDate("YYYY-MM-DD") }}</p>
</div>
 ......
  filters: {
    filterDate(value, format = "YYYY-MM-DD HH:mm:ss") {
      console.log(this)//undefined 过滤器没有this指向的
      return moment(value).format(format);
    }
  },
  data() {
    return {
      date: new Date()
    };
  }
 ```

## 动态指令参数
> Vue 2.6的最酷功能之一是可以将指令参数动态传递给组件。我们可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：
```js
<a v-bind:[attributeName]="url"> 这是个链接 </a>
这里的 attributeName 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。同样地，你可以使用动态参数为一个动态的事件名绑定处理函数：

<a v-on:[eventName]="doSomething"> 这是个链接 </a>
```
接下来我们看个例子：假设你有一个按钮，在某些情况下想监听单击事件，在某些情况下想监听双击事件。这时动态指令参数派上用场：
```js
<template>
  <div>
    <aButton @[someEvent]="handleSomeEvent()" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      someEvent: someCondition ? "click" : "dbclick"
    }
  },
  methods: {
    handleSomeEvent () {
      // handle some event
    }
  }
}
</script>
```
## 简单暴力的router key
> 我们在项目开发时，可能会遇到这样问题:当页面切换到同一个路由但不同参数地址时，比如/detail/1，跳转到/detail/2，页面跳转后数据竟然没更新？路由配置如下：
```js
{
  path: "/detail/:id",
  name:"detail",
  component: Detail
}
```
这是因为vue-router会识别出两个路由使用的是同一个组件从而进行复用，并不会重新创建组件，而且组件的生命周期钩子自然也不会被触发，导致跳转后数据没有更新。那我们如何解决这个问题呢？我们可以为router-view组件添加属性key,例子如下：
```js
<router-view :key="$route.fullpath"></router-view>
```
这种办法主要是利用虚拟DOM在渲染时候通过key来对比两个节点是否相同，如果key不相同，就会判定router-view组件是一个新节点，从而先销毁组件，然后再重新创建新组件，这样组件内的生命周期会重新触发。

## 对象新属性无法更新视图，删除属性无法更新视图，为什么？怎么办？
> 原因：Object.defineProperty没有对对象的新属性进行属性劫持,对象新属性无法更新视图

> 使用Vue.$set(obj, key, value)，组件中this.$set(obj, key, value)

> 删除属性无法更新视图：使用Vue.$delete(obj, key)，组件中this.$delete(obj, key)
###arr[index] = xxx无法更新视图怎么办？为什么？怎么办？
> 原因：Vue没有对数组进行Object.defineProperty的属性劫持，所以直接arr[index] = xxx是无法更新视图的

> 使用数组的splice方法，arr.splice(index, 1, item)

>使用Vue.$set(arr, index, value)

## 模式
策略模式的使用，避免过多的if else判断，也可以替代简单逻辑的switch
```js
const formatDemandItemType = (value) => {
  switch (value) {
    case 1:
      return  基础
    case 2:
      return  高级
    case 3:
      return  VIP
  }
}
```
```js
// 策略模式
const formatDemandItemType2 = (value) => {
  const obj = {
    1:  基础 ,
    2:  高级 ,
    3:  VIP ,
  }

  return obj[value]
}
```
