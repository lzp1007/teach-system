<template>
  <div class="exam-container">
    <div class="header">
      <Header/>
    </div>
    <div class="main">
      <Layout>
        <template #left>
          <NavBar/>
        </template>

        <template #default>
          <div class="paper-container" ref="paperContainer">
            <div class="cover" v-if="isShow"> 
              <div class="desp">
                <h2>请同学们在规定时间内完成测试题，答题时请不要切换页面!</h2>
                <div class="sub"><button @click.prevent="handleClick">开始</button></div>
              </div>
            </div>

            <div class="paper-area" v-show="!isShow">
              <div class="paper-item" v-for="(item, index) in sorted" :key="item.id">
                <h3 class="title">{{index+1+ "、" + item.title}}</h3>
                <div @click.once="handleNum">
                    <label v-for="(option, i) in item.options" :key="i">
                    <input type="radio" :disabled="isDisabled" v-model="choices[index]" :value="getOptionName(option)">
                    {{option}}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #right>
          <div class="aside-area">
            <p>剩余时间</p>
            <p class="time" ref="time">60:00</p>
            <p>题目总数：{{data.length}}</p>
            <p>已答题目：{{ answeredNum }}</p>
            <p>未答题目：{{ unAnsweredNum }} </p>

            <div class="score-area" v-show="isScoreShow">
              <p>你的成绩为</p>
              <p class="score" ref="score">0</p>
            </div>

            <button ref="subBtn" :disabled="isSubmitDisabled" @click.prevent="submitScore()" class="submit-btn" v-show="!isShow">提交</button>
          </div>
        </template>
      </Layout>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Layout from "@/components/Layout"
import Header from "@/components/Header"
import NavBar from "@/components/NavBar"
import getExam from "@/api/exam"
import fetchData from "@/mixins/fetchData.js"
import mainScroll from "@/mixins/mainScroll.js"
import { postScore } from "@/api/score"
export default {
  mixins: [fetchData([]), mainScroll("paperContainer")],
  components: {
    Layout,
    Header,
    NavBar
  },
  data() {
    return {
      isShow: true,
      isScoreShow: false,
      isSubmitDisabled: false,
      answeredNum: 0,
      timer: null,
      minutes: 60,
      seconds: 0,
      isDisabled: false,
      //同学们选择的选项
      choices: []
    }
  },
  computed: {
    unAnsweredNum() {
      return this.data.length - this.answeredNum;
    },
    sorted() {
      return this.data.sort(() => {
        return Math.random() - 0.5;
      })
    },
    ...mapState("loginUser", ["user"])
  },
  beforeDestroy() {
    this.$bus.$emit("hideToTop");
  },
  methods: {
    //获取远程数据
    async fetchData(){
      return await getExam();
    },
    //点击使已达题目数加1
    handleNum(){
      this.answeredNum++;
    },
    //得到每个选项名（A、B、C、D）
    getOptionName(option) {
      return option.split("：")[0];
    },
    submitScore(){
      //禁用提交按钮
      this.isSubmitDisabled = true;
      this.$refs.subBtn.innerText = "已提交";
      //清空计时器
      clearInterval(this.timer);
      //设置按钮不可点击
      this.isDisabled = true;
      //统计考试成绩
      let score = 0;
      let currentNum = 0;
      let perScore = 100 / this.sorted.length;
      if(this.choices.length !== 0) {
        for(let index in this.choices) {
          if(this.choices[index] === this.sorted[index].answer){
            currentNum++;
          }
        }
      } 
      score = perScore * currentNum;
      if(score >= 60) {
        this.$refs.score.style.color = "#7ebf50";
      } else {
        this.$refs.score.style.color = "#f40";
      }   
      //将分数插入页面
      this.$refs.score.innerText = score;
      //设置分数可见
      this.isScoreShow = true; 
      //将分数存入数据库
      if(this.user.identity !== "学生") {
        this.$showMessage({type: "error", content: `您的身份是${this.user.identity}不需要提交成绩！`, container: this.$refs.paperContainer})
        return;
      }else {
        this.$showMessage({
        content:"考试结束！",
        type: "warn",
        container: this.$refs.paperContainer
      })
      //将学生成绩保存到数据库
      postScore({
        studentName: this.user.name,
        score,
        classId: this.user.classId,
      })
      }
    },
    handleClick() {
      //隐藏蒙层
      this.isShow = false;
      //进入答题页面，开始计时
      let that = this;
      let p = this.$refs.time;
      let seconds = this.seconds;
      let minutes = this.minutes;
      this.timer = setInterval(function(){
        if(seconds === 0 && minutes !== 0) {
          seconds = 59;
          minutes = minutes - 1;
        }else if(seconds === 0 && minutes === 0) { 
          //提交成绩
          that.submitScore();
        }else{
          seconds--;
        }
        p.innerText = `${(minutes+"").toString().padStart(2, 0)}:${(seconds+"").toString().padStart(2, 0)}`       
      }, 1000)

    }
  },
}
</script>

<style lang="less" scoped>
  @import "~@/styles/mixin.less";
  @import "~@/styles/var.less";
  .exam-container {
    width: 100%;
    height: 100%;
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

    button {
      width: 80px;
      height: 40px;
      outline: none;
      border: none;
      position: absolute;
      font-weight: bold;
      letter-spacing: 2px;
    }

    .paper-container {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      scroll-behavior: smooth;
      position: relative;
      height: 100%;

      .cover {
        width: 100%;
        height: 100%;
        position: absolute;
        text-align: center;
        background-color: @lightWords;
      }

      .desp {
        .self-center();
        width: 30%;
        min-width: 150px;
        min-height: 150px;
        border-radius: 5px;
        padding: 20px;
        box-sizing: border-box;
        background-color: #fff;

        .sub {
          margin: 0 auto;
          margin-top: 20px;
          button {
          border-radius: 3px;
          color: #fff;
          position: static;
          background-color: #2e6dfc;
        }
        }
      }

      .paper-area {
        padding: 20px;
        h3 {
          font-size: 1.5em;
          margin-bottom: 15px;
        }
        label{
          display: flex;
          font-size: 15px;
          padding-left: 20px;
          margin-bottom: 20px;
          input {
            margin-right: 20px;
            margin-top: 6px;
            vertical-align: middle;
          }
        }
      }
    }

    .aside-area {
      width: 250px;
      height: 100%;
      position: relative;
      padding-top: 20px;

      p {
        font-size: 20px;
        text-align: center;
        margin: 10px;

        &.time {
          font-size: 30px;
          font-weight: bold;
          color: #f40;
        }
      }

      .score-area {
        .self-center();

        .score {
            font-size: 30px;
            font-weight: bold;
        }
      }

      .submit-btn {
        background-color: @success;
        position: absolute;
        left: calc(50% - 40px);
        bottom: 100px;
      }
    }
  }
</style>