<template>
  <div class="test-container" v-loading="isLoading">
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      isLoading:true
    }
  }
}
</script>

<style lang="less" scoped>
  .test-container {
    width: 500px;
    height: 500px;
    margin: 0 auto;
    position: relative;
    border: 1px solid #f40;
  }
  

</style>