<template>
  <div class="home-container">
    <div class="header">
      <Header/>
    </div>
    <div class="main">
      <Layout>
        <template #left>
          <NavBar/>
        </template>

        <template #default>   
          <div 
            class="desp-area" 
            v-loading="isLoading" 
            ref="container" 
            @wheel="handleWheel"
          >
            <ul class="carousel-container" 
              :style="{marginTop}"
              @transitionend="handleTransitionEnd">
              <li v-for="item in data" :key="item.id">
                <Carouselitem :carousel="item"/>
              </li>
            </ul>
            <div 
              v-show="index >=1" 
              class="icon icon-up"
              @click="switchTo(index - 1)">
              <Icon type="arrowUp"/>
            </div>
            <div 
              v-show="index < data.length - 1" 
              @click="switchTo(index + 1)"
              class="icon icon-down"
              >
              <Icon type="arrowDown"/>
            </div>
            <ul class="indicator">
              <li 
                :class="{active: i === index}" 
                @click="switchTo(i)"
                v-for="(item, i) in data" 
                :key="item.id">
              </li>
            </ul>
          </div>
        </template>
      </Layout>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header"
import NavBar from "@/components/NavBar"
import Layout from "@/components/Layout"
import  Icon from "@/components/Icon";
import fetchData from "@/mixins/fetchData"
import Carouselitem from "./Carouselitem";
import { getDesp } from "@/api/desp"
export default {
  mixins: [fetchData({})],
  components: {
    Layout,
    Header,
    NavBar,
    Icon,
    Carouselitem,
  },
  data() {
    return {
      index: 0,    //表示当前显示第几张轮播图
      containerHeight: 0,   //容器高度
      switching: false   //是否正在切换中
    }
  },
  mounted(){
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
    beforeDestroy() {
      this.$bus.$emit("hideToTop");
    },
  },
  methods: {
    async fetchData() {
      return await getDesp();
    },
    switchTo(index) {
      this.index = index;
    },
    handleWheel(e) {
      if(this.switching) {
        return;
      }
      if(e.deltaY < -5 && this.index > 0) {
          this.switching = true;
          this.index--;
      }else if(e.deltaY > 5 && this.index < this.data.length - 1) {
          this.switching = true;
          this.index++;
      }
    },
    handleResize() {
      this.containerHeight = this.$refs.container.clientHeight;
    },
    handleTransitionEnd() {
      this.switching = false;
    },
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
  .home-container {
    width: 100%;
    height: 100%;
    font-size: #000;
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

    .desp-area {
      width: 100%;
      height: 100%;
      overflow: hidden;
      scroll-behavior: smooth;
      position: relative;

      ul {
        margin: 0;
        list-style: none;
        padding: 0;
      }
    }

  }

  .carousel-container {
    width: 100%;
    height: 100%;
    transition: 500ms;

    li{
      width: 100%;
      height: 100%;
    }
  }

  .icon {
    .self-center();
    font-size: 30px;
    font-weight: bold;
    color: @primary;
    transform: translateX(-50%);
    @gap: 20px;
    &.icon-up {
      top: @gap;
      animation: jump-up 2s infinite;
    }
    &.icon-down {
      bottom: @gap;
      top: auto;
      animation: jump-down 2s infinite;
    }

    @jump: 5px;
    @keyframes jump-up {
      0% {
        transform: translate(-50%, @jump);
      }
      50% {
        transform: translate(-50%, -@jump);
      }
      100% {
        transform: translate(-50%, @jump);
      }
    }

    @keyframes jump-down {
      0% {
        transform: translate(-50%, -@jump);
      }
      50% {
        transform: translate(-50%, @jump);
      }
      100% {
        transform: translate(-50%, -@jump);
      }
    }
  }

  .indicator {
    .self-center();
    transform: translateY(-50%);
    left: auto;
    right: 20px;
    li {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: @words;
      cursor: pointer;
      margin-bottom: 10px;
      border: 1px solid #fff;
      box-sizing: border-box;
      transition: 0.5s;
      &.active {
        background-color: #fff;
      }
    }
  }

</style>