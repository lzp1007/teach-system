<template>
  <div class="score-container">
    <div class="header">
      <Header />
    </div>
    <div class="main">
      <Layout>
        <template #left>
          <NavBar />
        </template>

        <template #default>
          <div class="fix-container" v-loading="isLoading">
            <div class="score-area" ref="scoreArea">
              <div
                class="score-item"
                v-for="(item, index) in data"
                :key="index"
              >
                <h3>{{ item.name }}专业学生成绩</h3>
                <div class="chart-area">
                  <div class="left">
                    <la-cartesian
                      :data="item.rows"
                      :narrow="20"
                      :bound="bound"
                      text-color="#000"
                    >
                      <la-bar
                        prop="score"
                        :animated="animated"
                        color="#a0a7e6"
                      ></la-bar>
                      <la-y-axis :tickSize="3"></la-y-axis>
                      <la-x-axis prop="studentName" :tickSize="3"></la-x-axis>
                      <la-tooltip></la-tooltip>
                    </la-cartesian>
                  </div>
                  <div class="right">
                    <p>及格人数: {{ passNumber(item.rows) }}</p>
                    <p>
                      不及格人数：{{ item.rows.length - passNumber(item.rows) }}
                    </p>
                    <p>平均分： {{ getAvg(item.rows) }}</p>
                    <p>最高分：{{ getFirst(item.rows) }}</p>
                    <p>最低分：{{ getLast(item.rows) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Layout>
    </div>
  </div>
</template>

<script>
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import mainScroll from "@/mixins/mainScroll.js";
import fetchData from "@/mixins/fetchData.js";
import { getScore } from "@/api/score";
import { Cartesian, Bar, XAxis, YAxis, Tooltip } from "laue";

export default {
  mixins: [fetchData([]), mainScroll("scoreArea")],
  components: {
    Layout,
    Header,
    NavBar,
    LaCartesian: Cartesian,
    LaBar: Bar,
    LaXAxis: XAxis,
    LaYAxis: YAxis,
    LaTooltip: Tooltip,
  },
  data() {
    return {
      bound: [0, 100],
      animated: true,
      values: [
        { name: "stuA", score: 99 },
        { name: "stuB", score: 60 },
        { name: "stuC", score: 40 },
      ],
    };
  },
  methods: {
    async fetchData() {
      return await getScore();
    },
    passNumber(scoreArr) {
      let passNum = 0;
      for (let i = 0; i < scoreArr.length; i++) {
        if (scoreArr[i].score > 60) {
          passNum++;
        }
      }
      return passNum;
    },
    getAvg(scoreArr) {
      let sum = 0;
      for (let i = 0; i < scoreArr.length; i++) {
        sum += scoreArr[i].score;
      }
      return (sum / scoreArr.length).toFixed(2);
    },
    getFirst(scoreArr) {
      let first = scoreArr[0].score;
      for (let i = 1; i < scoreArr.length; i++) {
        if (scoreArr[i].score > first) {
          first = scoreArr[i].score;
        }
      }
      return first;
    },
    getLast(scoreArr) {
      let last = scoreArr[0].score;
      for (let i = 1; i < scoreArr.length; i++) {
        if (scoreArr[i].score < last) {
          last = scoreArr[i].score;
        }
      }
      return last;
    },
  },
};
</script>

<style lang="less" scoped>
.score-container {
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
    
    .fix-container {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
    }

    .score-area {
      width: 100%;
      height: 100%;
      padding: 20px;
      overflow-y: scroll;
      scroll-behavior: smooth;

      .score-item {
        width: 100%;
        border-bottom: 1px solid #ccc;
        padding-bottom: 20px;
        margin-bottom: 20px;
        box-sizing: border-box;
        h3 {
          margin-bottom: 5px;
        }
        .chart-area {
          display: flex;
        }

        .left {
          width: 70%;
        }

        .right {
          width: 30%;
          min-width: 200px;
          padding: 20px;
          font-size: 1.5em;
          text-align: center;
        }
      }
    }
  }

  .navbar-container {
    width: 250px;
  }
}
</style>