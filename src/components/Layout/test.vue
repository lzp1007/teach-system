<template>
  <div class="test-container">
    <Layout>
      <template #left>
        <div class="aside"></div>
      </template>
      <template #default>
        <div class="main-container"></div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "./index"
export default {
  components: {
    Layout
  }
}
</script>

<style lang="less" scoped>
  .test-container {
    width: 1000px;
    height: 600px;
    background-color: #ccc;

    .aside {
      width: 250px;
      height: 100%;
      background-color: #f0f;
    }

    .main-container {
      background-color: #0ff;
      height: 100%;
    }
  }
</style>