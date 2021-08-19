<template>
  <div class="mine-container">
      <div class="header">
      <Header/>
    </div>
    <div class="main">
      <Layout>
        <template #left>
          <NavBar/>
        </template>

        <template #default>
          <div class="scene-container" :v-loading="isLoading">
            <Scene/>
          </div>
        </template>
      </Layout>
    </div>
  </div>
</template>

<script>
import Layout from "@/components/Layout"
import Header from "@/components/Header"
import NavBar from "@/components/NavBar"
import Scene from "./Scene"
export default {
  components:{
    Layout,
    Header,
    NavBar,
    Scene
  },
  data() {
    return {
      isLoading: true,
    }
  },
}
</script>

<style lang="less" scoped>
  .mine-container {
    width: 100%;
    height: 100%;
    position: relative;

    .header {
    width: 100%;
    height: 60px;
    }

    .main {
      width: 100%;
      height: calc(100% - 60px);

      .scene-container {
        width: 100%;
        height: 100%;
      }
    }

    .navbar-container {
      width: 250px;
    }
  }
</style>