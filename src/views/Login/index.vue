<template>
  <div class="login-container" :style="backgroundImg">
    <div class="logo-area">
      <img :src="logoUrl" alt="" />
    </div>
    <p class="title">矿床学实习三维实景教学平台</p>
    <form @submit.prevent.stop="handleSubmit" class="main-area">
      <div class="account">
        <span>账号</span>
        <input type="text" placeholder="请输入学号" v-model="account" />
      </div>
      <div class="password">
        <span>密码</span>
        <input type="password" placeholder="学号后六位" v-model="password" />
      </div>

      <div class="identity">
        <label
          >学生：<input
            type="radio"
            value="学生"
            name="identity"
            v-model="identity"
        /></label>
        <label
          >教师：<input
            type="radio"
            value="教师"
            name="identity"
            v-model="identity"
        /></label>
        <label
          >管理员：<input
            type="radio"
            value="管理员"
            name="identity"
            v-model="identity"
        /></label>
      </div>

      <button :disabled="loading">
        {{ loading ? "loading..." : "登录" }}
      </button>
    </form>
  </div>
</template>

<script>
import logoUrl from "@/assets/logo.png";
import loginUrl from "@/assets/login.jpg";
export default {
  name: "Login",
  data() {
    return {
      logoUrl,
      account: "",
      password: "",
      identity: "学生",
      backgroundImg: {
        background: `url(${loginUrl}) no-repeat left top/cover`,
      },
    };
  },
  computed: {
    loading() {
      return this.$store.state.loginUser.loading;
    },
  },
  methods: {
    async handleSubmit() {
      //处理登录业务
      const resp = await this.$store.dispatch("loginUser/login", {
        loginId: this.account,
        loginPwd: this.password,
        identity: this.identity,
      });

      if (resp) {
        //弹出登录成功
        this.$showMessage({ content: "登录成功！", type: "success" });
        //跳转到首页
        this.$router.push("/home");
      } else {
        //登录失败
        this.$showMessage({ content: "用户名或密码错误！", type: "error" });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.login-container {
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;

  .logo-area {
    width: 500px;
    position: absolute;
    left: 50%;
    top: 80px;
    transform: translateX(-50%);

    img {
      width: 100%;
      height: 100%;
    }
  }

  .title {
    position: absolute;
    left: 50%;
    top: 160px;
    min-width: 280px;
    color: #000;
    font-size: 1.5em;
    font-weight: bold;
    transform: translateX(-50%);
  }
}

.main-area {
  .self-center();
  width: 500px;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.8);
  border: 1px solid #fff;
  border-radius: 5px;
  text-align: center;
}

.account,
.password {
  margin-top: 50px;
  font-size: 18px;
  span {
    display: inline-block;
    margin-right: 30px;
  }

  input {
    outline: none;
    height: 30px;
    border: 1px solid #008c8c;
    outline: none;
    text-indent: 5px;
    border-radius: 5px;
    color: #fff;
    font-size: 15px;
    background-color: transparent;
    vertical-align: bottom;
  }
}

.identity {
  margin: 20px auto;
  font-size: 20px;
  label {
    padding-right: 10px;

    input {
      width: 15px;
      height: 15px;
      vertical-align: middle;
    }
  }
}

button {
  width: 250px;
  height: 35px;
  border-radius: 5px;
  font-size: 18px;
  border: none;
  outline: none;
  color: #fff;
  font-weight: bold;
  background-color: @primary;

  &:focus {
    background-color: @primary;
  }
  &:disabled {
    background-color: @gray;
    cursor: not-allowed;
    color: @dark;
  }
}
</style>
