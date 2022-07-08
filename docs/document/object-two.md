# 常见的对象处理

## 对象解构
```js
const obj = { x: 1, y: 2 }

// 不使用解构语法
const x = obj.x
const y = obj.y

// 使用解构语法
const { x, y } = obj
x // 1
y // 2

// 你也可以在函数参数中使用解构
// 注意这里函数的参数只有一个
function add({ x, y }) {
  return x + y
}
add({ x: 3, y: 4 }) // 7
```

## 扩展运算符...
- 可合并数组、对象
```js
创建对象或数组时，一种从现有对象或数组的属性创建新属性的方法。
// 定义一个person数组
const person = ['Michael', 'Jackson']
const profile = [...person, 'developer']

profile // ['Michael', 'Jackson', 'developer']

// 对象也可以用 ...展开语法
const person = { first: 'Michael', last: 'Jackson' }
const profile = { ...person, occupation: 'developer' }

profile // { first: 'Michael', last: 'Jackson', occupation: 'developer' }
```

## 对象深拷贝
```js
JSON.parse(JSON.stringify(obj)
```


## 判断是否是对象
```js
Object.prototype.toString.call(obj) == '[object Object]'
```

## 两个含有部分相同属性的对象如何快速给对应的key赋值
```js
obj1 =
{
    "authList": [ ],
    "enabled": 1,
    "id": "b3bae8fcde0d4a50b7fbcbbccf4fe216",
    "lastLogin": 1564363725773,
    "lastLoginStr": "2019-07-29",
    "namePinyin": "chenghua",
    "namePinyinFirst": "c",
    "rowLocked": 0,
    "sex": 2,
    "userAccount": "chenghua",
    "userName": "lomo"
},
obj2 ={
    "sex": '',
    "userAccount": "",
    "userName": ""
}

Object.keys(obj2).forEach(key => { obj2[key] = obj1[key] })
```

## 修改对象的键
- 不需要管顺序 - {}内会自动排序
```js
const obj = {1: "1", 2: "2", a: "a", b: "b"}
Obejct.keys(obj).map(key => { return { [key + 1]: objb[key] } })
// (4) [{…}, {…}, {…}, {…}]
//     0: {11: "1"}
//     1: {21: "2"}
//     2: {a1: "a"}
//     3: {b1: "b"}
```
- 需要管顺序 - 进行上面操作后
```js
// 操作对象时，对象的键值对会进行一次排序
// 需求，按照b数组中的顺序给a的键 赋值对应的中文并排序
var a = {
  "1387733773341724673": Array(1),
  "1387733059395686402": Array(2),
  "1387753470420897793": Array(3)
}
var b = [
  {
    "createTime":"2021-04-29 20:59:46",
    "creatorOrgIds":"",
    "bpmTitle":"品牌入库",
    "flowId":"1387753470420897793"
  },
  {
    "createTime":"2021-04-29 19:41:29",
    "creatorOrgIds":"",
    "bpmTitle":"转入黑名单",
    "flowId":"1387733773341724673"
  },
  {
    "createTime":"2021-04-29 19:38:39",
    "creatorOrgIds":"",
    "bpmTitle":"品牌入库11",
    "flowId":"1387733059395686402"
  }
]

// 用一个空数组接收值
let c = []
b.forEach(i => {
  Object.entries(a).forEach(k => {
    if (i.flowId === k[0]) c.push([i.bpmTitle, k[1]])
  })
})

console.log(c, 'c')
// (3) [Array(2), Array(2), Array(2)]
//  0: (2) ["品牌入库", Array(3)]
//  1: (2) ["转入黑名单", Array(1)]
//  2: (2) ["品牌入库11", Array(2)]
```
