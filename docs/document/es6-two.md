# 用es6简化代码
## 通过条件判断给变量赋值布尔值
```js
// bad
if (a === 'a') {
  b = true
} else {
  b = false
}

// good
b = a === 'a'
```

## 在if中判断数组长度不为零
```js
// bad
if (arr.length !== 0) {
  // todo
}

// good
if (arr.length) {
  // todo
}
```

## 简单的if判断使用三元表达式
```js
// bad
if (a === 'a') {
  b = a
} else {
  b = c
}

// good
b = a === 'a' ? a : c
```
## 使用includes()简化if判断
```js
// bad
if (a === 1 || a === 2 || a === 3 || a === 4) {
  // todo
}

// good
let arr = [1, 2, 3, 4]
if (arr.includes(a)) {
  // todo
}
```

## some()判断是否有满足条件的元素
```js
// bad
let arr = [1, 3, 5, 7]
function isHasNum (n) {
  for (let i = 0; i < arr.length; i ++) {
    if (arr[i] === n) {
      return true
    }
  }
  return false
}

// good
let arr = [1, 3, 5, 7]
let isHasNum = n => arr.some(num => num === n)

// best
let arr = [1, 3, 5, 7]
let isHasNum = (n, arr) => arr.some(num => num === n)
```

## forEach()遍历数组
```js
// bad
for (let i = 0; i < arr.length; i ++) {
  // todo
  arr[i].key = balabala
}

// good
arr.forEach(item => {
  // todo
  item.key = balabala
})
```

## filter()过滤原数组，形成新数组
```js
// bad
let arr = [1, 3, 5, 7],
  newArr = []
for (let i = 0; i < arr.length; i ++) {
  if (arr[i] > 4) {
    newArr.push(arr[i])
  }
}

// good
let arr = [1, 3, 5, 7]
let newArr = arr.filter(n => n > 4) // [5, 7]
```

## map()对数组中所有元素批量处理，形成新数组
```js
// bad
let arr = [1, 3, 5, 7],
  newArr = []
for (let i = 0; i < arr.length; i ++) {
  newArr.push(arr[i] + 1)
}

// good
let arr = [1, 3, 5, 7]
let newArr = arr.map(n => n + 1) // [2, 4, 6, 8]
```

## Object.values()快速获取对象键值
```js
let obj = {
  a: 1,
  b: 2
}
// bad
let values = []
for (key in obj) {
  values.push(obj[key])
}

// good
let values = Object.values(obj) // [1, 2]
```

## Object.keys()快速获取对象键名
```js
let obj = {
  a: 1,
  b: 2
}
// bad
let keys = []
for (value in obj) {
  keys.push(value)
}

// good
let keys = Object.keys(obj) // ['a', 'b']
```

## 解构数组进行变量值的替换
```js
// bad
let a = 1,
    b = 2
let temp = a
a = b
b = temp

// good
let a = 1,
    b = 2
[b, a] = [a, b]
```

## 同时为多个变量赋值
```js
当我们处理多个变量，并且需要对这些变量赋不同的值，这种缩写法很有用。
//Longhand
let test1, test2, test3;
test1 = 1;
test2 = 2;
test3 = 3;
//Shorthand
let [test1, test2, test3] = [1, 2, 3];
```

## || 短路符设置默认值
```js
let person = {
  name: '张三',
  age: 38
}

let name = person.name || '佚名'
```

## &&短路符判断依赖的键是否存在防止报错'xxx of undfined'
```js
let person = {
  name: '张三',
  age: 38,
  children: {
    name: '张小三'
  }
}

let childrenName = person.children && person.childre.name
```

## 字符串拼接使用${}
```js
let person = {
  name: 'LiMing',
  age: 18
}
// bad
function sayHi (obj) {
  console.log('大家好，我叫' + person.name = '，我今年' + person.age + '了')
}

// good
function sayHi (person) {
  console.log(`大家好，我叫${person.name}，我今年${person.age}了`)
}

// best
function sayHi ({name, age}) {
  console.log(`大家好，我叫${name}，我今年${age}了`)
}
```

## 函数使用箭头函数
```js
let arr [18, 19, 20, 21, 22]
// bad
function findStudentByAge (arr, age) {
  return arr.filter(function (num) {
    return num === age
  })
}

// good
let findStudentByAge = (arr, age)=> arr.filter(num => num === age)
```

## 函数参数校验
```js
// bad
let findStudentByAge = (arr, age) => {
  if (!age) throw new Error('参数不能为空')
  return arr.filter(num => num === age)
}

// good
let checkoutType = () => {
  throw new Error('参数不能为空')
}
let findStudentByAge = (arr, age = checkoutType()) =>
  arr.filter(num => num === age)
```

## 简短的函数调用语句
```js
我们可以使用三元运算符实现如下功能。
// Longhand
function test1() {
  console.log('test1');
};
function test2() {
  console.log('test2');
};
var test3 = 1;
if (test3 == 1) {
  test1();
} else {
  test2();
}
// Shorthand
(test3 === 1? test1:test2)();
```

## switch 对应的缩写法
```js
我们可以把条件值保存在名值对中，
 vbn]基于这个条件使用名值对代替 switch。
// Longhand
switch (data) {
  case 1:
    test1();
  break;

  case 2:
    test2();
  break;

  case 3:
    test();
  break;
  // And so on...
}

// Shorthand
var data = {
  1: test1,
  2: test2,
  3: test
};

data[something] && data[something]();
```

## 隐式返回缩写法
> 使用箭头函数，我们可以直接得到函数执行结果，
不需要写 return 语句。
```js
//longhand
function calculate(diameter) {
  return Math.PI * diameter
}
//shorthand
calculate = diameter => (
  Math.PI * diameter;
)
```

## 字符串转换为数字 - 纯数字转换
```js
//Longhand
let test1 = parseInt('123');
let test2 = parseFloat('12.3');
//Shorthand
let test1 = +'123';
let test2 = +'12.3';
```

## 数组扁平化
> flat()默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将flat()方法的参数写成一个整数，表示想要拉平的层数，默认为1。
```js
[1, 2, [3, [4, 5]]].flat() // [1, 2, 3, [4, 5]]
[1, 2, [3, [4, 5]]].flat(2) // [1, 2, 3, 4, 5]

上面代码中，flat()的参数为2，表示要拉平两层的嵌套数组。
如果不管有多少层嵌套，都要转成一维数组，
可以用Infinity关键字作为参数。

[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]

如果原数组有空位，flat()方法会跳过空位。
[1, 2, , 4, 5].flat()
// [1, 2, 4, 5]
```
## 废弃if else
我们写判断时，都会使用if else但当业务越来越庞大时有好几种状态时，这样代码太冗余了，我们做一下简化。
```js
if(xxx = 1) {
  xxx = "启用"
} else if(xxx = 2) {
  xxx = "停用"
}
// ...省略
// 废除以上写法

let operation = {
  1: "启用",
  2: "停用"
  3: "注销",
  4: "修改"
  5: "详情"
}
xxx = operation[status] // 代码简洁清晰
```

## 快速获取URL地址栏参数
> 有时候我们想获取地址栏上参数，都是手写方法，有一个Api实用的方法来处理 URL 的查询字符串。
```js
let params = new URLSearchParams(location.search);
params.get("xxx") // 获取地址栏参数
```
## 随机打乱数组顺序
> 有时我们场景有需要将一个数组顺序进行打乱。
```js
let list = [1,2,'蛙人', 1, 34, 3, 12]
let res = list.sort(() => Math.random() - 0.5)
console.log(res)
```
## 检测值是否为数组
```js
let arr = []
console.log(Array.isArray(arr)) // true
console.log(Object.toString.call(arr) == ["Object Array"]) // true
```
## 伪数组转换为真数组
> 伪数组不能调用真数组对象上的方法，所以得将伪数组转换为真数组，获取js元素是伪数组。
```js
document.querySelectAll("div") // NodeList[div, div, div, div]
[...document.querySelectorAll('div')] // 转换为真数组
Array.from(document.querySelectorAll('div')) // 转换为真数组
```

## 快速获取时间戳
```js
console.log(+new Date())
console.log(Date.now())
```

## 获取一个值的下标
> 在Es6之前，我们只知道使用indexOf方法去获取下标，Es6之后还有一个方法哦，如果找到该值返回当前值的下标，找不到返回 -1
```js
let colors = ["red", "blue", "green"]
function getIndex(val) {
  return colors.findIndex(i => i == val)
}
getIndex("blue") // 1
```
## 数组转换为对象
> 在有的情况需要将数组转换为对象，可以这样做。
```js
let person = ["蛙人", 24, "male"]
let obj = {}
person.forEach(item => (obj[item] = item))
// obj: {24: 24, 蛙人: "蛙人", male: "male"}
```
## 检测当前页面是否被隐藏
> 监测当前页面是否被隐藏，当切换页面时显示true, false就是打开状态。一般在工作用主要用到用户在页面停留了多长时间。
```
document.addEventListener("visibilitychange", function() {
  console.log(document.hidden);
});
```