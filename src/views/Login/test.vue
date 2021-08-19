<template>
  <div class="test-container">
    <Login/>
  </div>
</template>

<script>
import Login from "./index"
export default {
  components: {
    Login
  }
}
</script>

<style lang="less" scoped> 
  @import "~@/styles/mixin.less";
  .test-container {
    .self-fill(fixed);
    background-color: #ccc;
  }
</style>