<template>
  <div class="app-container">
      <RouterView/>
      <ToTop/>
  </div>
</template>

<script>
import ToTop from "@/components/ToTop";
export default {
  name: 'App',
  components: {
    ToTop
  },

}
</script>

<style lang="less" scoped>
  @import "~@/styles/var.less";
  @import "~@/styles/mixin.less";
  .app-container {
    .self-fill(fixed);
    color: @dark;
  }

</style>
