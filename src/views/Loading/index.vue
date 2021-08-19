<template>
  <div class="loading-container">
    <div class="loading-img">
      <img :src="loadingUrl" alt="">
    </div>
  </div>
</template>

<script>
import loadingUrl from "@/assets/loading.gif"
export default {
  data() {
    return {
      loadingUrl
    }
  },
  created() {
    this.unWatch = this.$watch(() => this.$store.getters["loginUser/status"], (status)=>{
      if(status !== "loading") {
        this.$router.push(this.$route.query.returnurl||"system/home").catch(()=>{});
      }
    },
    {
      immediate: true,
    })
  },
  destroyed() {
    this.unWatch();
  }
}
</script>

<style lang="less" style="scoped">
  @import "~@/styles/mixin.less";
  .loading-container {
    width: 100%;
    height: 100%;

    .loading-img{
      .self-center();
    }
  }
</style>