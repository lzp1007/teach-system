<template>
  <div class="header-container">
    <div class="logo-area"  :style="backgroudImg">
      <img :src="logoUrl" alt="" />
      <h1>合肥工业大学矿床学实习三维实景教学平台</h1>
    </div>
    <div class="login-out" @click="handleClick">
      <Icon type="out" />
      <span>退出</span>
    </div>

    <div v-show="isShow" class="warn-cover">
      <div class="warn">
        <p>您确定要退出吗？</p>
        <button class="btn-one" @click="loginOut">确定</button>
        <button @click="undo">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import logoUrl from "@/assets/hfut.png";
import headerBgdUrl from "@/assets/header.png";
import Icon from "../Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      logoUrl,
      isShow: false,
      backgroudImg: {
        background: `url(${headerBgdUrl}) 100% 0 no-repeat #fff`,
      },
    };
  },
  methods: {
    handleClick() {
      this.isShow = true;
    },
    undo() {
      this.isShow = false;
    },
    loginOut() {
      this.$store.dispatch("loginUser/loginOut");
      //跳转到登录页面
      this.$router.push("/login");
      //让ToTop组件隐藏
      this.$bus.$emit("hideToTop");
    },
  },
};
</script>

<style lang="less">
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";
.header-container {
  width: 100%;
  height: 100%;
  background-color:#2e6dfc;
  color: @dark;
  // border-bottom: 1px solid #000;
  box-shadow: 2px 0 3px @dark;
  position: relative;
  z-index: 99;

  .logo-area {
    width: 550px;
    height: 100%;
    padding: 10px;
    img {
    width: 40px;
    height: 40px;
    }

    h1 {
      position: absolute;
      font-size: 1.5em;
      left: 70px;
      top: calc(50% - 15px);
    }
  }

  .warn-cover {
    .self-fill(fixed);
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.5);

    .warn {
      width: 300px;
      padding: 20px;
      text-align: center;
      height: 200px;
      font-size: 20px;
      font-weight: bold;
      color: @dark;
      border-radius: 5px;
      background-color: #fff;
      .self-center(fixed);

      p {
        margin-top: 40px;
      }

      button {
        font-size: 15px;
        width: 60px;
        height: 30px;
        outline: none;
        border: none;
        background-color: #2e6dfc;
        color: #fff;
        border-radius: 3px;
        margin-top: 40px;

        &:focus {
          background-color: #fff;
        }

        &.btn-one {
          margin-right: 20px;
        }
      }
    }
  }

  .login-out {
    position: absolute;
    font-size: 15px;
    color: #fff;
    font-weight: bold;
    right: 40px;
    top: 20px;

    span {
      margin-left: 15px;
    }
  }
}
</style>