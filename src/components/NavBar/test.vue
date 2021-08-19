<template>
  <div class="test-container">
    <NavBar :titles="titles"/>
  </div>
</template>

<script>
import NavBar from "./index"
export default {
  components: {
    NavBar
  },
  data() {
    return {
      titles: [
        {name: "张三", id: 1},
        {name: "李四", id: 2},
        {name: "王五", id: 3},
        {name: "赵六", id: 4}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .test-container {
    width: 100%;
    height: 60px;
  }
</style>