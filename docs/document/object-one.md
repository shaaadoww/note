# 对象常用方法

## Object.assign()
- 用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。
- 当对象中只有一级属性，没有二级属性的时候，此方法为深拷贝，
- 但是对象中有对象的时候，此方法，在二级属性以后就是浅拷贝。
```js
Object.assign(target, source)

清空对象里的数值
for (let key in this.FilterQuery) {
  this.FilterQuery[key] = ''
}
或者
Object.keys(this.FilterQuery).forEach(key => (this.FilterQuery[key] = ''))
```

## Object.entries()
Object.entries() 方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环也枚举原型链中的属性）。

通俗点就是 Object.entries() 可以把一个对象的键值以数组的形式遍历出来，结果和 for...in 一致，但不会遍历原型属性

###### 传入对象
```js
const obj = { foo: 'bar', baz: 'abc' };
console.log(Object.entries(obj));  // [['foo', 'bar'], ['baz', 'abc']]
```

###### 数组

```js
const arr = [1, 2, 3];
console.log(Object.entries(arr));  // [['0', 1], ['1', '2'], ['2', '3']]

const arr1 = [{ a: 1 }, 2, 3];
console.log(Object.entries(arr1));  // [['0', { a: 1 }], ['1', '2'], ['2', '3']]

const arr2 = [{ a: 1 }, { b: 2 }, { c: 3 }];
console.log(Object.entries(arr2));  // [['0', { a: 1 }], ['1', { b: 2 }], ['2', { c: 3 }]]
```
###### 字符串
```js
const str = '123';
console.log(Object.entries(str));  // [['0', '1'], ['1', '2'], ['2', '3']]
```

###### 数字、浮点数
```js
const num = 123;
console.log(Object.entries(num));  // []

const float1 = 12.3;
console.log(Object.entries(float1));  // []
```

###### 将 Object 转化为 Map
- new Map() 构造函数接受一个可迭代的 entries 。 借助 Object.entries 方法你可以很容易的将 Object 转换为 Map:

```js
const obj2 = { foo: 'bar', baz: 'abc' };
console.log(Object.entries(obj2));  // [['foo', 'bar'], ['baz', 'abc']]
const map = new Map(Object.entries(obj2));
console.log(map); // Map {'foo' => 'bar', 'baz' => 'abc'}
```
## Object.keys()
- ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键名。
```js
var obj = { foo: "bar", baz: 42 };
Object.keys(obj)
// ["foo", "baz"]
```
- 处理数组时，返回数组各元素的索引值:
```js
let arr = ['a', 'b', 'c'];
Object.keys(arr); // ['0', '1', '2']

let brr = [1, 3, 4];
Object.keys(brr); // ['0', '1', '2']
```
- 可自动排序：
```js
let arr = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(arr)); // console: ['2', '7', '100']
```

## Object.values()
Value 用于根据 Object 中的值创建数组。传递一个对象到 Object.values，它将返回一个值数组

```js
const stock = {
  meat: 5,
  fruit: 10,
  cheese: 6,
}
const valueArray = Object.values(stock)
// [ 5, 10, 6 ]
```

- 返回数组的成员顺序。

```js
var obj = { 100: 'a', 2: 'b', 7: 'c' };
Object.values(obj) // ["b", "c", "a"]
```

> 上面代码中，属性名为数值的属性，是按照数值大小，从小到大遍历的，因此返回的顺序是b、c、a。
Object.values只返回对象自身的可遍历属性。


```js
var obj = Object.create({}, {p: {value: 42}});
Object.values(obj) // []
```

> 上面代码中，Object.create方法的第二个参数添加的对象属性（属性p），如果不显式声明，默认是不可遍历的。Object.values不会返回这个属性。
Object.values会过滤属性名为 Symbol 值的属性。

## 其他
### Object.getOwnPropertyNames(obj)
- 返回一个数组,包含对象自身的所有属性(不含Symbol属性,但是包括不可枚举属性)
```js
var obj = {'0':'a','1':'b','2':'c'};

Object.getOwnPropertyNames(obj).forEach(function (key ){
  console.log(key, obj[key]);
  // 0 a
  // 1 b
  // 2 c
});
```

### Reflect.ownKeys(obj)
- 返回一个数组,包含对象自身的所有属性,不管属性名是Symbol或字符串,也不管是否可枚举. \
```js
var obj = {'0':'a','1':'b','2':'c'};

Reflect.ownKeys(obj).forEach(function(key){
  console.log(key,obj[key]);
  // 0 a
  // 1 b
  // 2 c
});
```