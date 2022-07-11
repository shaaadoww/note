<template>
  <div class="detail">
    <div class="detail-header">
      我是头部
    </div>
    <div class="detail-wrapper">
      我是内容
      <br/> 我是内容
      <br/> 我是内容
      <br/> 我是内容
      <br/> 我是内容
      <br/> 我是内容
      <br/> 我是内容
      <br/> 我是内容
      <br/> 我是内容
      <br/> 我是内容
      <br/>
    </div>
    <div class="detail-bottom">
      我是底部
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },

  methods: {
  }
}
</script>

<style>
.detail {
  /*必须 */
  display: flex;
  /* 必须，规定元素的排列方向 */
  flex-direction: column;
  /* 必须占满屏 */
  height: 1000px;
  /* 没有这个就不能滚动了 */
  overflow: auto;
}

.detail-header {
  text-align: center;
}

.detail-wrapper {
  width: 100%;
  /* 占了百分百-flex:0的占位 */
  flex: 1;
  font-size: 40px;
  text-align: center;
}

.detail-bottom {
  /* 占位用，可以不加 */
  flex: 0;
  margin: 20px auto;
  /* background: #555555; */
}
</style>