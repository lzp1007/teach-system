<template>
  <div class="blog-container">
    <div class="header">
      <Header/>
    </div>
    <div class="main">
      <Layout>
        <template #left>
          <NavBar/>
        </template>

         <template #default>
         <BlogList/>
        </template>

        <template #right>
          <div class="right">
            <BlogCategory/>
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
import BlogList from "./components/BlogList"
import BlogCategory from "./components/BlogCategory"

export default {
  components: {
    Layout,
    Header,
    NavBar,
    BlogList,
    BlogCategory
  },
  beforeDestroy() {
    this.$bus.$emit("hideToTop");
  }
}
</script>

<style lang="less" scoped>
  .blog-container {
    width: 100%;
    height: 100%;
    position: relative;
    font-size: #000;
    
    .header {
      width: 100%;
      height: 60px;
    }

    .main {
      width: 100%;
      height: calc(100% - 60px);
    }

    .navbar-container {
      width: 250px;
    }

    .header {
      width: 100%;
      height: 60px;
    }

    .main {
      width: 100%;
      height: calc(100% - 60px);
    }
  }

  .left, .right {
    width: 250px;
    height: 100%;
  }
</style>