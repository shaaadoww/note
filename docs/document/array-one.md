# 数组常用方法

## reduce()
```js
arr.reduce(function(prev,cur,index,arr){
    ...
}, init);

其中：
    arr 表示原数组；
    prev 表示上一次调用回调时的返回值，或者初始值 init;
    cur 表示当前正在处理的数组元素；
    index 表示当前正在处理的数组元素的索引，若提供 init 值，则索引为0，否则索引为1；
    init 表示初始值。

常用的参数有prev和cur
```
### 计算付款金额
```js
let totalMoney = [...].reduce((total, item) => total + (Number(item.money) || 0), 0)
```

### 求和，最小值和最大值
```js
const array  = [5, 4, 7, 8, 9, 2];

// 求和
array.reduce((a,b) => a + b);
// 输出: 35
最大值
array.reduce((a,b) => a > b? a : b);
// 输出: 9
最小值
array.reduce((a,b) => a < b ? a : b);
// 输出: 2
```

## forEach()
用于遍历数组，无返回值
```js
arr.forEach(function (item, index, array) {
  ...
});

其中：
  item 代表数组遍历时的当前元素；
  index 数组遍历时的当前元素的索引;
  array 正在遍历的数组；
```
### forEach循环问题
```js
var arr = [1,-2,3,4,-5];
arr.forEach(function (item, index, array) {
  if (item === 3) {
    // 无法终止循环，forEach里面return false和break 相当于continue
    // 跳出当前循环
    return false // 或者 break
  }
  console.log(array[index] === item);   // true
});
```

## map()
用于遍历数组，返回处理之后的新数组，不会影响到原有数组
### 从一个数组对象中提取出想要的对象属性
```js
let arr = [
  { id: 1,name: "tony",class: 1,arde: 88 },
  { id: 2,name: "Tom",class: 1,grade: 90 },
  { id: 3,name: "Jack",class: 1,grade: 86 }
]
let res = arr.map(({ name, id }) => ({ id, name }))
// let res = arr.map(item => ({ id: item.id, name: item.name })
```

## every()
用于判断数组中的每一项元素是否都满足条件，返回一个布尔值
```js
var arr = [1,-2,3,4,-5];
var isEvery = arr.every(function (item, index, array) {
  return item > 0;
});
console.log(isEvery); // false
```

## some()
用于判断数组中的是否存在满足条件的元素，返回一个布尔值
```js
var arr = [1,-2,3,4,-5];
var isSome = arr.some(function (item, index, array) {
  return item < 0;
});
console.log(isSome); // true
```

## filter()
用于筛选数组中满足条件的元素，返回一个筛选后的新数组
```js
var arr = [1,-2,3,4,-5];
var minus = arr.filter(function (item, index, array) {
  return item < 0;
});
console.log(minus); // [-2, -5]
```

---
> 补充： 以上五大方法除了传递一个匿名函数作为参数之外，还可以传第二个参数，该参数用于指定匿名函数内的this指向，例如：
```js
let arr = [1, -2, 3, 4, -5]

// 只传一个匿名函数
arr.forEach(function(item,index,array){
  console.log(this);  // window
});

// 传两个参数
arr.forEach(function(item,index,array){
  console.log(this);  // [1, -2, 3, 4, -5]
}, arr);
```
---
## 其他
### indexOf()
```js:no-line-numbers
arr.indexOf(item, from) 从索引 from 开始搜索 item，如果找到则返回索引，否则返回 -1。
```

### lastIndexOf()
```js:no-line-numbers
arr.lastIndexOf(item, from) —— 和上面相同，只是从右向左搜索。
```

### includes()
```js:no-line-numbers
arr.includes(item, from) —— 从索引 from 开始搜索 item，如果找到则返回 true（译注：如果没找到，则返回 false）
```

### find()
```js:no-line-numbers
arr.find((item,index,array)=>{...})如果返回 true，则返回 item 并停止迭代;对于假值（falsy）的情况，则返回 undefined
```

### findIndex()
```js:no-line-numbers
arr.findIndex(()=>{}) 同find 凡是返回的是找到元素的索引而不是元素本身，并且在未找到任何内容时返回 -1。
```

### sort()
```js:no-line-numbers
arr.sort(): 对数组进行 原位（in-place） 排序
```

### reverse()
```js:no-line-numbers
arr.reverse() 颠倒数组中的元素，改变原数组，也返回颠倒后的数组
```

### split()
```js:no-line-numbers
str.split(',', 3) 将字符串中逗号处分隔为字符串并取出前三个元素返回新数组
```

### join()
```js:no-line-numbers
arr.join(',')使用逗号连接数组返回一个字符串
```

### Array.isArray()
```js:no-line-numbers
Array.isArray(arr) 检查是否为数组 返回布尔值 可以区别对象和数组
```

### flat()
- arr.flat(depth) / arr.flatMap(fn) 从多维数组创建一个新的扁平数组。
- 展开多维数组，该方法返回一个新数组，对原数据没有影响。
- flat() 方法的参数是一个整数，表示想要拉平的层数，默认为1，表示拉平一层。如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数
```js:no-line-numbers
let list = [1, 2, 3, [4, [5]]];

let res = list.flat(Infinity)
console.log(res) // [1, 2, 3, 4, 5]
```

### splice()
```js:no-line-numbers
arr.splice(start,删除元素个数，添加元素1，元素2) 删除数组元素（并替换 改变原数组）
```

### slice()
```js:no-line-numbers
arr.slice(start，end) 返回一个新数组，将所有从索引 start 到 end（不包括 end）的数组项复制到一个新的数组
```

```js
可以用splice、slic做拷贝数组

splice() 会修改原数组，而 splice(0) 会把原数组清空。
var a = [1,2,3,4,5],
    b = a.splice(0);
//=> a = [], b = [1,2,3,4,5]

var a = [1,2,3,4,5],
    b = a.slice();
//=> a = [1,2,3,4,5], b = [1,2,3,4,5]
```

### concat()
```js:no-line-numbers
arr.concat(arr1, arr2, 1, 2) 拼接数组 生成一个新数组 可以传入数组或者值
```