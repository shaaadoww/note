# 常见的数组处理

## 解构数组
```js
const arr = ['michael', 'jackson']
const [first, last] = arr
console.log(first) // michael
console.log(last) // jackson
```

## 伪数组转真数组
```js
1. [].slice.call(obj) 这个等于Array.protype.slice.call(obj)
  slice会把通过索引位置获取新的数组，该方法不会修改原数组，
  只是返回一个新的子数组.call会把this的指向改为传进去的obj
  var newArr = [].slice.call(obj)

2. Array.form(obj),ES6的新语法
  var newArr = Array.from(obj)

3. 使用扩展运算符,也是ES6的语法
  var newArr = [...obj]
```

## 获取数组下标
- 拿到某一数组在另一数组的位置下标
```js
var a = '1 2 3'
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
var arr1 = a.split(' ') // [1, 2, 3]
var arr2 = arr1.map(i => arr.indexOf(i))
console.log(arr2) // [0, 1, 2]

获取指定数组在某一数组下的下标数组
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var arr1 = [2, 5, 7]
arr1.map => (i => i.indexOf(arr)) // [1, 4, 6]
```

## 判断是否是数组
- Object.prototype.toString.call(obj) == '[object Array]'
- Array.isArray()
```js
Array.isArray([1, 2, 3]);
// true
Array.isArray({foo: 123});
// false
Array.isArray("foobar");
// false
Array.isArray(undefined);
// false
```

## map()的替换方法Array.from()
也许每个人都知道数组的map()方法，但是有一个不同的解决方案，它可以用来获得类似的效果和非常干净的代码。我们可以使用.from()方法。
```js
var friends = [
  { name: "John", age: 22 },
  { name: "Peter", age: 23 },
  { name: "Mark", age: 24 },
  { name: "Maria", age: 22 },
  { name: "Monica", age: 21 },
  { name: "Martha", age: 19 },
]
var friendsNames = Array.from(friends, ({name}) => name);
console.log(friendsNames);
// returns ["John", "Peter", "Mark", "Maria", "Monica", "Martha"]
```

## 替换数组中的特定值splice()
需要替换数组中的特定值，我们可以使用```.splice(start、valueToRemove、valueToAdd)```，并将所有三个参数传递给它，这些参数可以指定我们希望从哪里开始修改、希望修改多少值和新值。
```js
参数：
  start —— 必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
  valueToRemove —— 必需。要删除的项目数量。如果设置为 0，则不会删除项目。
  valueToAdd —— 可选。向数组添加的新项目。
```
```js
var fruits = ["banana", "apple", "orange", "watermelon"];
fruits.splice(0, 2, "potato", "tomato");
console.log(fruits); // ["potato", "tomato", "orange", "watermelon"]
```

## 获取两个数组的交并补差集
```js
const arr1 = [1, 2, 3, 4, 5],
      arr2 = [5, 6, 7, 8, 9],
      _arr1Set = new Set(arr1),
      _arr2Set = new Set(arr2);
```
### 交集
```js
let intersection = arr1.filter(item => _arr2Set.has(item))
console.log('交集', intersection); // [5]
```

### 并集
```js
let union = Array.from(new Set([...arr1, ...arr2]))
console.log('并集', union); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
### 补集
- 两个数组各自没有的集合
```js
let complement = [...arr1.filter(item => !_arr2Set.has(item)), ...arr2.filter(item => !_arr1Set.has(item))]
console.log('补集', complement); // [1, 2, 3, 4, 6, 7, 8, 9]
```

### 差集
- 数组arr1相对于arr2所没有的
```js
let diff = arr1.filter(item => !_arr2Set.has(item))
console.log('差集', diff); // [1, 2, 3, 4]
```

## 计算数组元素出现的次数
- vue版本
```js
data () {
  return {
    arr: [
      { cycle: 1 },
      { cycle: 7 },
      { cycle: 30 },
      { cycle: 1 },
      { cycle: 30 },
      { cycle: 1 },
      { cycle: 30 },
      { cycle: 1 }
    ]
  }
}

computed: {
  // cycleObj ---- {1: 4, 7: 1, 30: 3}
  cycleObj () {
    return this.arr.filter(i => i.cycle).reduce((obj, item) => {
      if (item.cycle in obj) {
        obj[item.cycle]++
      } else {
        obj[item.cycle] = 1
      }
      return obj
    }, {})
  }
}
```

## 数组拷贝
### 浅拷贝
```js
扩展运算符 var newArr = [...arr]

利用concat方法，不写参数 var newArr = arr.concat();

利用数组截取 var newArr = arr.slice(0)
```
### 深拷贝
- 先转json字符串再转回js
```js
JSON.parse(JSON.stringify(...))
```
- 递归实现
```js
//定义函数 获取对象的构造函数（类）名
function getObjectClass(obj) {
  return Object.prototype.toString.call(obj).slice(8,-1)
}

//深拷贝的函数
function deepClone(obj) {
  //判断obj是对象是数组还是其他
  if (getObjectClass(obj) === 'Object') {
    var res = {};   //创建空的对象
  } else if (getObjectClass(obj) === 'Array') {
    var res = [];   //创建空数组
  } else {
    return obj;  //直接把参数返回
  }
  //对传入的对象(遍历)进行遍历
  for (let i in obj) {
    res[i] = deepClone(obj[i]);
  }
  //返回新数组或对象
  return res;
}
```

## 数组去重
### 数组去重
```js
let arr = [100, 234, 2342,1112, 100, 300, '100', 'hello', 'hello', NaN, NaN];
```
- 使用Set
```js
let newArr = [...new Set(arr)];
// [100, 234, 2342, 1112, 300, '100', 'hello', NaN]
```
- 使用reduce + includes 封装方法
```js
function unique(arr) {
  return arr.reduce((prev,cur) => prev.includes(cur) ? prev : [...prev,cur], [])
}

unique(arr) // [100, 234, 2342, 1112, 300, '100', 'hello', NaN]
```

### 数组对象去重
- 封装方法
```js
closePointDialog (arr) {
  // arr是选中的数组对象[{...}, {...}, {...}]
  // xxx是表格数据[{...}, {...}, {...}]
  if (arr) {
    // 去重
    var obj = {}
    arr = [...xxx, ...arr]
    const filterArr = arr.reduce(function (data, item) {
      if (!obj[item.id]) {
        obj[item.id] = true
        data.push(item)
      }
      return data
    }, [])

    xxx = filterArr
  }
},
```