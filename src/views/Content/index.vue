<template>
  <div class="content-container">
    <div class="header">
      <Header/>
    </div>
    <div class="main">
      <Layout>
        <template #left>
          <NavBar/>
        </template>

        <template #default>
          <div class="card-area" ref="cardContainer">
            <div 
              :style="backgroundImg"
              class="card" 
              v-for="(item, index) in data" 
              :key="index">
              <h3 class="time">{{item.time}}</h3>
              <div class="plan" v-html="item.content">
              </div>
            </div>

          </div>
        </template>

        <template #right>
          <div class="resource-area">
            <h2 class="title">资料下载</h2>
            <div class="source-link">
              <p><a href="http://localhost:12306/download/book.pdf">铜陵实习指导书</a></p>
              <p><a href="http://localhost:12306/download/power.ppt">铜陵-马鞍山矿产地质综合实习</a></p>
            </div>
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
import { getPlan } from "@/api/plan"
import cardUrl from "@/assets/card.png"

export default {
  mixins:[fetchData({}), mainScroll("cardContainer")],
  data() {
    return {
      backgroundImg: {
        background: `url(${cardUrl}) no-repeat left top/cover`,
      }
    }
  },
  components: {
    Layout,
    Header,
    NavBar
  },
  methods: {
    async fetchData() {
      return await getPlan();
    },
  },
  beforeDestroy() {
    this.$bus.$emit("hideToTop");
  },
}
</script>

<style lang="less" scoped>
  @import "~@/styles/var.less";
  .content-container {
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

    .card-area {
      width: 100%;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
      overflow-y: scroll;
      scroll-behavior: smooth;
      flex-wrap: wrap;
      display: flex;
      justify-content: space-around;

      .card{
        width: 24%;
        min-width: 150px;
        padding: 5px 15px;
        background-color: @gray;
        border-radius: 5px;
        box-shadow: 0 0 5px;
        margin-bottom: 20px;

        .time {
          font-size: 2em;
        }

        .plan {
          color: #fff;
        }
      }
    }

    .resource-area {
      width: 250px;
      height: 100%;
      padding: 20px;
      overflow: auto;

      h2{
        font-size: 1.2em;
      }

      .source-link {
        margin-top: 20px;
      }
    }
  }
</style>