# 常用JS代码片段
## camelize
- 横线转驼峰命名
```js
let camelizeRE = /-(\w)/g;
function camelize(str) {
  return str.replace(camelizeRE, function(_, c) {
    return c ? c.toUpperCase() : '';
  })
}
//ab-cd-ef ==> abCdEf
//使用记忆函数
let _camelize = cached(camelize)
```

## hyphenate
- 驼峰命名转横线命名：拆分字符串，使用-相连，并且转换为小写
```js
let hyphenateRE = /\B([A-Z])/g;
function hyphenate(str){
  return str.replace(hyphenateRE, '-$1').toLowerCase()
}
//abCd ==> ab-cd
//使用记忆函数
let _hyphenate = cached(hyphenate);
```

## capitalize：字符串首位大写
```js
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
// abc ==> Abc
//使用记忆函数
let _capitalize = cached(capitalize)
```

## extend
- 将属性混合到目标对象中
```js
function extend(to, _form) {
  for(let key in _form) {
    to[key] = _form[key];
  }
  return to
}
```

## 识别各种浏览器及平台
```js
//运行环境是浏览器
let inBrowser = typeof window !== 'undefined';
//运行环境是微信
let inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
let weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
//浏览器 UA 判断
let UA = inBrowser && window.navigator.userAgent.toLowerCase();
let isIE = UA && /msie|trident/.test(UA);
let isIE9 = UA && UA.indexOf('msie 9.0') > 0;
let isEdge = UA && UA.indexOf('edge/') > 0;
let isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
let isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
let isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
```

## getExplorerInfo
- 获取浏览器信息
```js
function getExplorerInfo() {
  let t = navigator.userAgent.toLowerCase();
  return 0 <= t.indexOf("msie") ? { //ie < 11
    type: "IE",
    version: Number(t.match(/msie ([\d]+)/)[1])
  } : !!t.match(/trident\/.+?rv:(([\d.]+))/) ? { // ie 11
    type: "IE",
    version: 11
  } : 0 <= t.indexOf("edge") ? {
    type: "Edge",
    version: Number(t.match(/edge\/([\d]+)/)[1])
  } : 0 <= t.indexOf("firefox") ? {
    type: "Firefox",
    version: Number(t.match(/firefox\/([\d]+)/)[1])
  } : 0 <= t.indexOf("chrome") ? {
    type: "Chrome",
    version: Number(t.match(/chrome\/([\d]+)/)[1])
  } : 0 <= t.indexOf("opera") ? {
    type: "Opera",
    version: Number(t.match(/opera.([\d]+)/)[1])
  } : 0 <= t.indexOf("Safari") ? {
    type: "Safari",
    version: Number(t.match(/version\/([\d]+)/)[1])
  } : {
    type: t,
    version: -1
  }
}
```
## 禁止某些键盘事件
```js
document.addEventListener('keydown', function(event) {
  return !(
    112 == event.keyCode ||        //禁止F1
    123 == event.keyCode ||        //禁止F12
    event.ctrlKey && 82 == event.keyCode ||        //禁止ctrl+R
    event.ctrlKey && 18 == event.keyCode ||        //禁止ctrl+N
    event.shiftKey && 121 == event.keyCode ||          //禁止shift+F10
    event.altKey && 115 == event.keyCode ||        //禁止alt+F4
    "A" == event.srcElement.tagName && event.shiftKey        //禁止shift+点击a标签
  ) || （event.returnValue = false）
});
```
## 禁止右键、选择、复制
```js
['contextmenu', 'selectstart', 'copy'].forEach(function(ev) {
  document.addEventListener(ev, function(event) {
    return event.returnValue = false;
  })
});
```

## 获取js语言的实际类型
```js
const trueTypeOf = (obj) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
```
```js
Object.prototype.toString.call(null)
// "[object Null]"
```
```js
console.log(trueTypeOf(  ));
// string
console.log(trueTypeOf(0));
// number
console.log(trueTypeOf());
// undefined
console.log(trueTypeOf(null));
// null
console.log(trueTypeOf({}));
// object
console.log(trueTypeOf([]));
// array
console.log(trueTypeOf(0));
// number
console.log(trueTypeOf(() => {}));
// function
```

## 复制到剪贴板
在Web应用程序中，复制到剪贴板因其对用户的便利性而迅速流行起来。
```js
const copyToClipboard = (text) =>
  navigator.clipboard?.writeText && navigator.clipboard.writeText（text）。
// 测试
copyToClipboard("Hello World!")。
```

## try..catch..finally
```js
const getData = async () => {
  try {
    setLoading(true);
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.log(error);
    setToastMessage(error);
  } finally {
    setLoading(false); // 不管是否报错，最后都会执行
  }
};

getData();
```
