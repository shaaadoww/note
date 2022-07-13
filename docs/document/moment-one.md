# 常用操作

## 拿到当前时间并格式化
```js
moment().format('YYYY-MM-DD HH:mm:ss')
```
### 加一个月
```js
subtract(-1, 'months')
```
### 减一个月
```js
subtract(1, 'months')
```
### 减一年
```js
subtract(1, 'years')
```
```js
moment('2021-10').subtract(-1, 'year').format('YYYY-MM-DD') // '2022-10-01'
moment('2021-9').subtract(-1, 'year').format('YYYY-MM-DD') // '2022-09-01'
```

## 获取特定时间
### 本月
```js
this.startEndTime = [
  moment().startOf('month').format('YYYY-MM-DD'),
  moment().endOf('month').format('YYYY-MM-DD')
];
```
### 上个月
```js
this.startEndTime = [
  moment(new Date()).subtract(1,'months').startOf('month').format('YYYY-MM-DD'),
  moment(new Date()).subtract(1,'months').endOf('month').format('YYYY-MM-DD')
];
```
### 近三个月 - 月头（不足3个月）
```js
this.startEndTime = [
  moment(new Date()).subtract(2,'months').startOf('month').format('YYYY-MM-DD'),
  moment().endOf('month').format('YYYY-MM-DD')
];
```
### 近三个月 足3个月
```js:no-line-numbers
moment(new Date()).subtract(3, 'months').format('YYYY-MM-DD')
```
