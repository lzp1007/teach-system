<template>
  <div @click="handleClick" v-show="show" class="to-top-container">
    Top
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    }
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
    this.$bus.$on("hideToTop", this.handleHide);
  },
  destroyed() {
     this.$bus.$off("mainScroll", this.handleScroll);
     this.$bus.$off("hideToTop", this.handleHide);
  },
  methods: {
    handleHide() {
      this.show = false;
    },
    handleScroll(dom) {
      if(!dom) {
        this.show = false;
        return;
      }
      this.show = dom.scrollTop >= 500;
    },
    handleClick() {
      //回到顶部
      this.$bus.$emit("setMainScroll", 0);
    }
  }
}
</script>

<style lang="less" scoped>
  @import "~@/styles/var.less";
  .to-top-container {
    background-color: @primary;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: fixed;
    z-index: 99;
    right: 40px;
    bottom: 40px;
    line-height: 40px;
    cursor: pointer;
    text-align: center;
    color: #fff;
  }
</style>