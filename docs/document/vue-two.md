# vue部分技巧
## 实现属性透传
- 通过 v-bind="$props" 以及v-bind="$attrs"
> 很多时候，我们会写一些嵌套组件，比如 A 的子组件是 B，B 的子组件是 C。这个时候如果 A 传递 props 给 B，B 又得传递 props 给 C，我们经常在 B 传给 C 的时候这么写

```js
B.vue
<template>
  <child-component
    :someprop1="someprop1"
    :someprop2="someprop2"
    :someprop3="someprop3"
    :someprop4="someprop4"
    ...
  />
</template>
```

###### 这样是很不优雅的，其实你可以直接使用 v-bind: $props
- $props：当前组件接收到的 props 对象。Vue 实例代理了对其 props 对象属性的访问。

```js
<template>
  <child-component v-bind="$props"/>
</template>
```

###### 这里我们利用 v-bind 可以传入一个对象的所有 property，类似 v-bind="Obj"。例如，对于一个给定的对象 post

```js
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```

- 下面的模板：

```js
<blog-post v-bind="post"></blog-post>
```

- 等价于：

```js
<blog-post
  v-bind:id="post.id"
  v-bind:title="post.title"
></blog-post>
```


这个配合 v-bind="$attrs" 在封装一些组件的时候非常有用，比如实现属性透传。
> vm.$attrs 包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。

比如将上面传递进来的 props 全部绑定到 el-input 中,我们可以在子组件中这么写：

```js
<template>
  <div>
    <input type="text" v-bind="$attrs" />
  </div>
</template>
```
页面显示为下

```js
<input type="text" id="1" title="My Journey with Vue" />
```
> https://juejin.im/post/6872128694639394830#heading-8


## 路由参数解耦
- 一般在组件内使用路由参数，大多数人会这样做：
```js
export default {
  methods: {
    getParamsId() {
      return this.$route.params.id
    }
  }
}
```
> 在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。

- 正确的做法是通过 props 解耦
```js
const router = new VueRouter({
  routes: [{
    path:  /user/:id ,
    component: User,
    props: true
  }]
})
```
- 将路由的 props 属性设置为 true 后，组件内可通过 props 接收到 params 参数
```js
export default {
  props: [ id ],
  methods: {
    getParamsId() {
      return this.id
    }
  }
}
```
- 另外还可以通过函数模式来返回 props
```js
const router = new VueRouter({
  routes: [{
    path:  /user/:id ,
    component: User,
    props: (route) => ({
      id: route.query.id
    })
  }]
})
```
## 函数式组件
> 函数式组件是无状态，它无法实例化，没有任何的生命周期和方法。创建函数式组件也很简单，只需要在模板添加 functional 声明即可。一般适合只依赖于外部数据的变化而变化的组件，因其轻量，渲染性能也会有所提高。

- 组件需要的一切都是通过 context 参数传递。它是一个上下文对象，具体属性查看文档。这里 props 是一个包含所有绑定属性的对象。

###### 函数式组件
```js
<template functional>
  <div class="list">
    <div class="item" v-for="item in props.list" :key="item.id" @click="props.itemClick(item)">
      <p>{{item.title}}</p>
      <p>{{item.content}}</p>
    </div>
  </div>
</template>
```
父组件使用
```js
<template>
  <div>
    <List :list="list" :itemClick="item => (currentItem = item)" />
  </div>
</template>
import List from  @/components/List.vue
export default {
  components: {
    List
  },
  data() {
    return {
      list: [
        {
          title:  title ,
          content:  content
        }
      ],
      currentItem:
    }
  }
}
```

# 程序化的事件侦听器
> 比如，在页面挂载时定义计时器，需要在页面销毁时清除定时器。这看起来没什么问题。但仔细一看 this.timer 唯一的作用只是为了能够在 beforeDestroy 内取到计时器序号，除此之外没有任何用处。
```js
export default {
  mounted() {
    this.timer = setInterval(() => {
      console.log(Date.now())
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
```
> 如果可以的话最好只有生命周期钩子可以访问到它。这并不算严重的问题，但是它可以被视为杂物。

- 我们可以通过 $on 或 $once 监听页面生命周期销毁来解决这个问题：
```js
export default {
  mounted() {
    this.creatInterval( hello )
    this.creatInterval( world )
  },
  creatInterval(msg) {
    let timer = setInterval(() => {
      console.log(msg)
    }, 1000)
    this.$once('hook:beforeDestroy', function() {
      clearInterval(timer)
    })
  }
}
```
> 使用这个方法后，即使我们同时创建多个计时器，也不影响效果。因为它们会在页面销毁后程序化的自主清除。