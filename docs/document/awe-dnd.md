# 基本使用
## 安装
```md:no-line-numbers
npm install awe-dnd --save
```
## 使用
```js:no-line-numbers
引入到项目的main.js中，使用Vue.use引入
import VueDND from 'awe-dnd'
Vue.use(VueDND)

API Vue指令的方式调用
    v-dragging="{ item: color, list: colors, group: 'color' }"
```

> 这个库的特点是封装了 v-dragging 全局指令，然后通过全局指令去数据绑定等。
相比及 vuedraggable 来说， awe-dnd 是没有双向绑定（这里没有双向绑定并不是很严谨，准确的来说没有暴露双向绑定的方式），因此提供了事件，在拖拽结束的时候用来更新列表（不需要手动更新列表，其实内部是实现了双向绑定的）或者是去触发父组件监听的事件。
```js
<script>
export default {
  data () {
    return {
        colors: [{
            text: "Aquamarine"
        }, {
            text: "Hotpink"
        }, {
            text: "Gold"
        }, {
            text: "Crimson"
        }, {
            text: "Blueviolet"
        }, {
            text: "Lightblue"
        }, {
            text: "Cornflowerblue"
        }, {
            text: "Skyblue"
        }, {
            text: "Burlywood"
        }]
    }
  },
  /* if your need multi drag
  mounted: function() {
      this.colors.forEach((item) => {
          Vue.set(item, 'isComb', false)
      })
  } */
}
</script>

<template>
  <div class="color-list">
      <div
          class="color-item"
          v-for="color in colors" v-dragging="{ item: color, list: colors, group: 'color' }"
          :key="color.text"
      >{{color.text}}</div>
  </div>
</template>
```

> 可以发现绑定的时候 v-dragging="{ item: color, list: colors, group: 'color' }" 这种形式进行指令绑定，其中 item 就是单个对象，而 list 则是数据列表，group 则是用来声明一个组，来保证可以在一个页面中进行多个数据源的操作。
而提供的两个事件方法如下：
```js
export default {
  mounted () {
    this.$dragging.$on('dragged', ({ value }) => {
      console.log(value.item)
      console.log(value.list)
      console.log(value.otherData)
    })
    this.$dragging.$on('dragend', (res) => {
        console.error(res);
    })
  }
}

一般使用的方法就是：
this.$dragging.$on('dragend', (res) => {
   console.error(res);
})
```

![gif](/drag.gif)
