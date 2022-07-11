# JS的一些巧用
## 转字符串js的技巧
```js
const input = 123;

console.log(input + ''); // '123'
console.log(String(input)); // '123'
console.log(input.toString()); // '123'
```
## 转数字
```js
const input = '123';

console.log(+input); // 123
console.log(Number(input)); // 123
console.log(parseInt(input)); // 123
```
## 转布尔值
```js
const input = 1;

// 方案1 -使用双感叹号(!!)转换为布尔值
console.log(!!input); // true

// 方案2 - 使用 Boolean() 方法
console.log(Boolean(input)); // true
```
## 字符串'false'有问题
```js
const value = 'false';
console.log(Boolean(value)); // true
console.log(!!value); // true

// 最好的检查方法
console.log(value === 'false');
```

## 将 set 转换为数组 - 可以做数组去重
```js
const set = new Set([1, 2, 1, 4, 5, 6, 7, 1, 2, 4]);
console.log(set); // Set(6) {1, 2, 4, 5, 6, 7}

set.map((num) => num * num); // TypeError: set.map is not a function

转换为数组
const arr = [...set]
```
## 检查值是否为数组
```js
const arr = [1, 2, 3];
console.log(typeof arr); // object
console.log(Array.isArray(arr)); // true
```
## 双问号语法 - ES2020
```js
const height = 0;

console.log(height || 100); // 100
console.log(height ?? 100); // 0
复制代码
这个 ?? 的意思是，如果 ?? 左边的值是 null 或者 undefined，那么就返回右边的值。
```

## includes简化if条件判断
- 返回布尔值
- includes也可以用于判断字符串是否包含指定的子字符串
```js
const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
  if (redFruits.includes(fruit)) {
    console.log('red');
  }
```
## Array.isArray(data) 判断是不是数组
```js
let data = [1,2,3,45,5]
Array.isArray(data) // true
```
## vue.filter使用
```js
// 在双花括号中
{{ message | capitalize }}

// 在 `v-bind` 中
<div v-bind:id="rawId | formatId"></div>

// 全局注册
Vue.filter('stampToYYMMDD', (value) =>{
  // 处理逻辑
})

// 局部注册
filters: {
  stampToYYMMDD: (value)=> {
    // 处理逻辑
  }
}

// 多个过滤器全局注册
// /src/common/filters.js
let dateServer = value => value.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
export { dateServer }
// /src/main.js
import * as custom from './common/filters/custom'
Object.keys(custom).forEach(key => Vue.filter(key, custom[key]))
```
## 布尔值
- 当JavaScript遇到预期为布尔值的地方（比如if语句的条件部分），就会将非布尔值的参数自动转换为布尔值。系统内部会自动调用Boolean函数。
```js
因此除了以下六个值，其他都是自动转为true【空数组[]和空对象{}的布尔类型都是true】

undefined
null
-0
0或+0
NaN
''（空字符串）
```

## 判断一个对象是否为空
```js
let summaryDate = {}
// length为0，则对象为空
Object.keys(summaryDate).length
```
## js中在判断条件中为false的几种值
```js
Number类型：0 NaN
String类型：""
Boolean类型：false
Undefined类型：undefined
Null类型：null
```
## 判断是否为对象
```js
var obj = {}；

Object.prototype.toString.call(obj) === '[object Object]'
```

## 函数条件调用
```js
// 冗余
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

// 简单
(test3 === 1? test1:test2)();
```

## switch条件
```js
// 冗余
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
  // so on...
}

// 简洁
var data = {
  1: test1,
  2: test2,
  3: test
};

data[anything] && data[anything]();
```

## 隐式返回
```js
// 冗余
function getArea(diameter) {
  return Math.PI * diameter
}

// 简洁
getArea = diameter => (
  Math.PI * diameter;
)
```

## 重复字符串多次
```js
// 冗余
let test = '';
for(let i = 0; i < 5; i ++) {
  test += 'test ';
}

// 简洁
'test '.repeat(5);
```

## 检查日期是否为周末
- 通过此功能，你将能够检查提供的日期是工作日还是周末。
```js
const isWeekend = (date) => [0, 6].indexOf(date.getDay()) !== -1;

console.log(isWeekend(new Date(2021, 4, 14)));
// false (Friday)
console.log(isWeekend(new Date(2021, 4, 15)));
// true (Saturday)
```

## 在两个数字之间生成一个随机数
这将以两个数字为参数，并将在这两个数字之间生成一个随机数！
```js
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

console.log(random(1, 50));
// could be anything from 1 - 50
```

## 计算两个日期之间的天数
- 要计算两个日期之间的天数，
- 我们首先找到两个日期之间的绝对值，然后将其除以86400000（等于一天中的毫秒数），最后将结果四舍五入并返回。
```js
const daysDiff = (date, date2) => Math.ceil(Math.abs(date - date2) / 86400000);

console.log(daysDiff(new Date( 2021-05-10 ), new Date( 2021-11-25 )));
// 199
```

## 洗牌一个数组 - 数组乱序
- 利用内置的Math.random()方法。
```js
const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
list.sort(() => {
    return Math.random() - 0.5;
});
// 输出
(9) [2, 5, 1, 6, 9, 8, 4, 3, 7]
// 输出
(9) [4, 1, 7, 5, 3, 8, 2, 9, 6]
```

## 生成随机颜色
```js
const generateRandomHexColor = () =>
  \`#${Math.floor(Math.random() \* 0xffffff) .toString(16)}\`
 ```

## 获取月份最后一天
```js
//使用new Date(year,month,0)的方式,可以获取该月的最后一天
var lastDay= new Date(2019,11,0).getDate()
```
```js
new Date(2019,11,0)
 // 2019-11-30 // 默认返回最后一天的日期，然后获取day就ok了
 ```
