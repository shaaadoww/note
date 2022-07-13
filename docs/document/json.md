# JSON的两个方法
- JSON 是用于存储和传输数据的格式
- JSON 通常用于服务端向网页传递数据
- JSON是一种轻量级数据格式，可以方便地表示复杂数据结构。
<!-- > JSON是一种轻量级数据格式，可以方便地表示复杂数据结构。JSON对象有两个方法：stringify()和parse()。在简单的情况下，这两个方法分别可以将JSON.stringify() 可以将 JavaScript序列化为JSON字符串，以及将JSON解析为原生JavaScript值。 -->

## JSON.stringify()
### 基本用法
- JSON.stringify()可以把一个JavaScript对象序列化为一个JSON字符串。
```js
let json1 = {
  title: "Json.stringify",
  author: [
    "浪里行舟"
  ],
  year: 2021
};
let jsonText = JSON.stringify(json1);
```
默认情况下，JSON.stringify()会输出不包含空格或缩进的JSON字符串，因此jsonText的值是这样的：
```json:no-line-numbers
"{"title":"Json.stringify","author":["浪里行舟"],"year":2021}"
```
> 在序列化JavaScript对象时，所有函数和原型成员都会有意地在结果中省略。此外，值为undefined的任何属性也会被跳过。最终得到的就是所有实例属性均为有效JSON数据类型的表示。

```js
在JSON.stringify()方法一共能接受3个参数，
  其中两个可选的参数（分别是第二、第三个参数）。
  这两个可选参数可以用于指定其他序列化JavaScript对象的方式。

  **第二个参数是过滤器**，可以是数组或函数；
  **第三个参数是用于缩进结果JSON字符串的选项**。
  单独或组合使用这些参数可以更好地控制JSON序列化。
```
- JSON.stringify()第二个参数 --- 过滤器
> 如果第二个参数是一个数组，那么JSON.stringify()返回的结果只会包含该数组中列出的对象属性。比如下面的例子：

```js
let json1 = {
  title: "Json.stringify",
  author: [
    "浪里行舟"
  ],
  year: 2021,
  like: 'frontend',
  weixin: 'frontJS'
};
let jsonText = JSON.stringify(json1, ['weixin']);
```
> 在这个例子中，JSON.stringify()方法的第二个参数是一个包含一个字符串的数组："weixin"。它对应着要序列化的对象中的属性，因此结果JSON字符串中只会包含这个属性：
```json:no-line-numbers
"{"weixin":"frontJS"}"
```
> 如果第二个参数是一个函数，则行为又有不同。提供的函数接收两个参数：属性名（key）和属性值（value）。可以根据这个key决定要对相应属性执行什么操作。这个key始终是字符串，只是在值不属于某个键/值对时会是空字符串。
```js
const students = [
  {
    name: 'james',
    score: 100,
  }, {
    name: 'jordon',
    score: 60,
  }, {
    name: 'kobe',
    score: 90,
  }
];

function replacer (key, value) {
  if (key === 'score') {
    if (value === 100) {
      return 'S';
    } else if (value >= 90) {
      return 'A';
    } else if (value >= 70) {
      return 'B';
    } else if (value >= 50) {
      return 'C';
    } else {
      return 'E';
    }
  }
  return value;
}
console.log(JSON.stringify(students, replacer, 4))
// [
//     {
//         "name": "james",
//         "score": "S"
//     },
//     {
//         "name": "jordon",
//         "score": "C"
//     },
//     {
//         "name": "kobe",
//         "score": "A"
//     }
// ]
```
> 上面的代码，我们通过replacer将成绩从百分制替换为成绩等级。

> 值得注意的是，如果stringify的第二个参数为函数那么它的**返回值如果是undefined**，那么对应的属性不会被序列化，如果返回其他的值，那么用返回的值替代原来的值进行序列化。

- JSON.stringify()第三个参数--字符串缩进
> JSON.stringify()方法的第三个参数控制缩进和空格。在这个参数是数值时，表示每一级缩进的空格数。例如，每级缩进4个空格，可以这样：
```js
let json1 = {
  title: "Json.stringify",
  author: [
    "浪里行舟"
  ],
  year: 2021
};
let jsonText = JSON.stringify(json1, null, 4);

//  这样得到的jsonText格式如下：
//  {
//      "title": "Json.stringify",
//      "author": [
//          "浪里行舟"
//      ],
//      "year": 2021
//  }
```
> JSON.stringify()在处理数据的时候同时考虑了数据转换和方便阅读，只不过，方便阅读这一点，常常被人忽略。

> toJSON()方法--自定义JSON序列化
- 有时候，对象需要在JSON.stringify()之上自定义JSON序列化。此时，可以在要序列化的对象中添加toJSON()方法，序列化时会基于这个方法返回适当的JSON表示。

```js
// 下面的对象为自定义序列化而添加了一个toJSON()方法：
let json1 = {
  title: "Json.stringify",
  author: [
    "浪里行舟"
  ],
  year: 2021,
  like: 'frontend',
  weixin: 'frontJS',
  toJSON: function () {
    return this.author
  }
};
console.log(JSON.stringify(json1)); // ["浪里行舟"]
```
> 注意，箭头函数不能用来定义toJSON()方法。主要原因是箭头函数的词法作用域是全局作用域，在这种情况下不合适。

### 使用场景
1. 判断数组是否包含某对象
```js
// 判断数组是否包含某对象
let data = [
  {name:'浪里行舟'},
  {name:'前端工匠'},
  {name:'前端开发'},
],
let val = {name:'浪里行舟'};

console.log(JSON.stringify(data).indexOf(JSON.stringify(val)) !== -1); // true
```

2. 判断两个对象是否相等。
```js
// 判断对象是否相等
let obj1 = {
  a: 1,
  b: 2
}
let obj2 = {
  a: 1,
  b: 2
}

console.log(JSON.stringify(obj1) === JSON.stringify(obj2)) // true
```
- 不过这种方式存在着较大的局限性，对象如果调整了键的顺序，就会判断出错！
```
// 调整对象键的位置后
let obj1 = {
  a: 1,
  b: 2
}
let obj2 = {
  b: 2,
  a: 1
}
console.log(JSON.stringify(obj1) === JSON.stringify(obj2)) // false
```
3. 使用localStorage/sessionStorage时
> localStorage/sessionStorage 默认只能存储字符串，而实际开发中，我们往往需要存储对象类型，那么此时我们需要在存储时利用json.stringify()将对象转为字符串，在取本地缓存时，使用json.parse()转回对象即可。
```js
// 存数据
function setLocalStorage(key,val) {
    window.localStorage.setItem(key, JSON.stringify(val));
};

// 取数据
function getLocalStorage(key) {
    let val = JSON.parse(window.localStorage.getItem(key));
    return val;
};
// 测试
setLocalStorage('Test',['前端工匠','浪里行舟']);
console.log(getLocalStorage('Test'));
```

4. 实现对象深拷贝
开发中，有时候怕影响原数据，我们常深拷贝出一份数据做任意操作，使用JSON.stringify()与JSON.parse()来实现深拷贝是很不错的选择。
```js
let arr1 = [1, 3, {
  username: ' kobe'
}];
let arr2 = JSON.parse(JSON.stringify(arr1));
arr2[2].username = 'duncan';
console.log(arr1);
// 0: 1
// 1: 3
// 2: {username: ' kobe'}
console.log(arr2);
// 0: 1
// 1: 3
// 2: {username: 'duncan'}
```

这是利用`JSON.stringify`将对象转成JSON字符串，再用`JSON.parse`把字符串解析成对象，一去一来，新的对象产生了，新对象会开辟新的栈，实现深拷贝。

这种方法虽然可以实现数组或对象深拷贝,但不能处理函数和正则，因为这两者基于JSON.stringify和JSON.parse处理后，得到的正则就不再是正则（变为空对象），得到的函数就不再是函数（变为null）了。
```js
let arr1 = [1, 3, function () { }, {
  username: ' kobe'
}];
let arr2 = JSON.parse(JSON.stringify(arr1));
arr2[3].username = 'duncan';
console.log(arr1);
// 0: 1
// 1: 3
// 2: ƒ ()
// 3: {username: ' kobe'}
console.log(arr2);
// 0: 1
// 1: 3
// 2: null
// 3: {username: 'duncan'}
```

### 使用注意事项
> JSON.stringify()虽然功能很强大，但是有些属性无法被stringify，所以在开发中需注意以下几种情况，以免产生一些始料未及的BUG。

1. 被转换值中有 NaN 和 Infinity
```js
let myObj = {
  name: "浪里行舟",
  age: Infinity,
  money: NaN,
};
console.log(JSON.stringify(myObj));
// {"name":"浪里行舟","age":null,"money":null}

JSON.stringify([NaN, Infinity])
// [null,null]
```
2. 被转换值中有 undefined、任意的函数以及 symbol 值

- 分为两种情况：

- 数组:undefined、任意的函数以及symbol值在序列化的过程中会被转换成 null
```js
JSON.stringify([undefined, function () { }, Symbol("")]);
// '[null,null,null]'
```
- 非数组:undefined、任意的函数以及symbol值在序列化的过程中会被忽略
```js
JSON.stringify({ x: undefined, y: function () { }, z: Symbol("") });
// '{}'
```
3. 循环引用
如果一个对象的属性值通过某种间接的方式指回该对象本身，那么就是一个循环引用。比如：
```js
let bar = {
  a: {
    c: foo
  }
};
let foo = {
  b: bar
};

JSON.stringify(foo)
这种情况下，序列化会报错的：

// 错误信息
Uncaught ReferenceError: foo is not defined
    at <anonymous>:3:8
```

4. 含有不可枚举的属性值时
不可枚举的属性默认会被忽略：
```
let personObj = Object.create(null, {
  name: { value: "浪里行舟", enumerable: false },
  year: { value: "2021", enumerable: true },
})

console.log(JSON.stringify(personObj)) // {"year":"2021"}
```

## JSON.parse()
- JSON字符串转js --- 可转换转义符
```js
JSON.parse("[\"2021-05-24T16:00:00.000Z\"]")
// ["2021-05-24T16:00:00.000Z"]
```
