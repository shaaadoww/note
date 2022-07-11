# 基本使用
## $forceUpdate()
> 官方文档解释vm.$forceUpdate() -  迫使vue实例重新渲染，注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件

> this.$set更新值，v-if控制的dom没有实时更新，需要随意操作页面的值才更新页面，在更新数据的代码后面添加**this.$forceUpdate()**进行强制渲染，效果实现。因为数据层次太多，render函数没有自动更新，需手动强制刷新

## 跨组件通信
### provide和inject

> 以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。一言而蔽之：祖先组件中通过 provider 来提供变量，然后在子孙组件中通过 inject 来注入变量。

> provide / inject API 主要解决了跨级组件间的通信问题，不过它的使用场景，主要是子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系。

###### provide是父级组件需要传递给子孙组件的属性/方法。选项有以下几种：

```js
//选项一
// 一个对象。
provide: {
  content: 'hello world'
}

//选项二
// 返回一个对象的函数。
provide () {
  return {
    content: 'hello world'
  }
}
```

###### inject是子孙组件用来接收父级组件属性/方法。选项有以下几种：
```js
//选项一
// 一个字符串数组。
inject: ['content']

//选项二
// 一个对象，对象的key是本地的绑定名，value是provide定义的名字。
inject: {
  content: 'content'
}

//选项三
// 一个对象，区分上一种方式是为了设置默认值。对象的key是本地的绑定名，value也是一个对象。该对象有两个键，一个是from（provide定义的名字），另一个是default（默认值）。
inject: {
  content: {
    from:'content',
    default:'hello world'
  }
}
```

###### 例子
- 某组件提供数据
```js
data () {},
provide () {
  return {
    // 向子组件中注入方法
    submitApproval: this.submitApproval,
    submitApprovalSuccess: this.submitApprovalSuccess,
    whichApproval: 'brandApproval'
  }
},
```

- 某组件接收祖先组件的数据
```js
// 接收注入的数据 - 注意给默认值，要不然可能公用组件有的传了过来有的没传导致报错
data () {},
inject: {
  // 品牌审批注入 新增、编辑、变更时先保存数据的方法
  submitApproval: {
    default: () => {}
  },
  // 品牌审批注入 - 新增、编辑、变更时侧滑提交审批，工单提交成功后，关闭所有弹出层
  submitApprovalSuccess: {
    default: () => {}
  },
  // 品牌审批注入 - '品牌审批'
  whichApproval: {
    default: ''
  }
}
```

### $emit和$on
> 1、vm.$on( event, callback )
监听当前实例上的自定义事件。事件可以由vm.$emit触发。回调函数会接收所有传入事件触发函数的额外参数。

> 2、vm.$emit( event, […args] )
触发当前实例上的事件。附加参数都会传给监听器回调，如果没有参数，形式为vm.$emit(event)

> 3、vm.$off( [event, callback] )
移除自定义事件监听器。
如果没有提供参数，则移除所有的事件监听器；
如果只提供了事件，则移除该事件所有的监听器；
如果同时提供了事件与回调，则只移除这个回调的监听器。

###### event-bus/index.js
```js
import Vue from 'vue'
const EventBus = new Vue()

export const event = {
  goToDetail ({id}) {
    return EventBus.$emit('goToDetail', {id})
  }
}

export const on = {
  goToDetail (callback) {
    return EventBus.$on('goToDetail', callback)
  }
}

export const off = {
  goToDetail () {
    EventBus.$off('goToDetail')
  }
}

export default EventBus

```
###### 某组件触发
```js
import {event} from './event-bus'

goToDetail () {
  const id = this.name.controls.value
  if (this.$route.name === 'MERCHANTSBRAND') {
    event.goToDetail({id})
  } else {
    this.$router.push({name: 'MERCHANTSBRAND', params: {id}})
  }
}
```
###### 某组件监听
```js
mounted () {
  this.init()
    on.goToDetail((id) => {
      this.toggeleYApproval = false
      this.DetailShowClick(id, 'new')
    })
  }
}
```
