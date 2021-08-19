<template>
  <div class="layout-container">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="main">
      <slot></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  @import "~@/styles/var.less";
  .layout-container {
    width: 100%;
    height: 100%;
    display: flex;

    .left, .right {
      flex: 0 0 auto;
      overflow-y: hidden;
    }

    .left {
      box-shadow: 0 2px 3px @dark;
    }

    .main {
      flex: 1 1 auto;
      overflow: hidden;
    }
  }
</style>