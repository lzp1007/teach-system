<template>
  <div class="test-container">
    <div>test</div>
    <Contact/>
  </div>
</template>

<script>
import Contact from "./";
import "@/styles/global.less";
export default {
  components: {
    Contact
  },
}
</script>

<style scoped lang="less">

  .test-container {
    width: 400px;
    height: 600px;
    background: #000;
    margin: 0 auto;
    border: 2px solid #f40;

    div{
      height: 300px;
    }
  }
</style>