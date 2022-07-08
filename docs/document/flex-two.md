# flex布局填坑

## 设置宽度被压缩的问题
- flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
当子元素设置固定宽度，如果整体宽度不足时，会把固定宽度给压缩

```js
解决方法: 给固定宽度的元素添加flex-shrink:0。
```
> flex-shrink
指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，
其收缩的大小是依据 flex-shrink 的值。

## 设置文本一行显示且用了flex布局
- 设置了white-space: nowrap不换行，内容会将盒子撑开，要加上overflow: hidden截取掉
```css
.album {
  ...
  overflow: hidden;
}
.album .album_desc {
  ...
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
```