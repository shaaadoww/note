# 解构赋值

## 默认值
- 默认值生效的条件是，对象的属性值严格等于undefined。
```js
var {x, y = 5, z = 1} = {z = undefined};
x // undefined 解构失败
y // 5 对象的属性值严格等于undefined
z // 1 对象的属性值严格等于undefined
```
> 注意：
	1、默认值生效的条件是，对象的属性值严格等于undefined（如：y与z）。
	2、如果解构失败，变量的值等于undefined（如：x）

## 重命名
- Es6在对象结构时可以同时重命名，如：
```js
let res = {
  data: [1,2,3],
  name: '礼拜',
  age: 23
}
```
- 直接对 res 解构, 可得到name、age、data三个值
![image](https://img-blog.csdnimg.cn/20201101213746709.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1JlZGFUYW8=,size_16,color_FFFFFF,t_70)


- 现在想给data重新命名为 arr 以方便取用s
![image](https://img-blog.csdnimg.cn/20201101213955498.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1JlZGFUYW8=,size_16,color_FFFFFF,t_70)

## 多层解构
```js
const info = {
  person: {
    name: 'xiaobe',
    other: {
      age: 22,
    }
  },
  song: 'rolling',
}
// 解构person的内容
const { person: { name, other: { age } } } = info;
// 解构song
const { song } = info;

console.log(name, 'name') // xiaobe
console.log(age, 'age') // 22
console.log(song, 'song') // rolling
```
> 但请注意, person和other是属于未定义的变量