<template>
  <div class="detail-container" v-loading="isLoading">
     <div class="header">
      <Header/>
    </div>
    <div class="main">
      <Layout>
        <template #left>
          <NavBar/>
        </template>

        <template #default>
          <div class="detail-area" ref="mainContainer">
            <BlogDetail :blog="data" v-if="data"/>
            <!-- 评论区 -->
            <BlogComment v-if="!isLoading" />
          </div>
        </template>

        <template #right>
          <div class="right-area" v-loading="isLoading">
            <BlogToc :toc="arrayToc" v-if="data"/>
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
import fetchData from "@/mixins/fetchData.js"
import mainScroll from "@/mixins/mainScroll.js"
import { getBlog } from "@/api/blog"
import BlogDetail from "./components/BlogDetail"
import BlogToc from "./components/BlogToc"
import BlogComment from "./components/BlogComment"

export default {
  mixins:[fetchData(null), mainScroll("mainContainer")],
  components:{
    Layout,
    Header,
    NavBar,
    BlogDetail,
    BlogToc,
    BlogComment
  },
  computed: {
    arrayToc() {
      return JSON.parse(this.data.toc);
    }
  },
  methods: {
    async fetchData() {
      let resp = await getBlog(this.$route.params.id);
      if(!resp) {
        //文章不存在
        this.$router.push("/404");
        return;
      }
      document.title = resp.title + "-矿床学实习教学平台";
      return resp;
    },
  },
  updated() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(()=> {
      location.hash = hash;
    }, 50)
  }
}
</script>

<style lang="less" scoped>
  .detail-container {
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
    }

    .navbar-container {
      width: 250px;
    }
  }

  .right-area {
    width: 250px;
    padding: 20px;
    height: 100%;
    position: relative;
    overflow-y: auto;
    box-sizing: border-box;
  }
 
  .detail-area {
    overflow-y: scroll;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    scroll-behavior: smooth;
    box-sizing: border-box;
    padding: 25px 30px;
  }

</style>