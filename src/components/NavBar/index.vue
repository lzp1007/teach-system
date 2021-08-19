<template>
  <div class="navbar-container">
    <router-link 
      class="nav" 
      :to="{name: item.name}" 
      v-for="item in titles" 
      :key="item.id"
      :exact="item.exact"
      active-class="selected"
      exact-active-class="">
      <div class="nav-icon">
        <Icon :type="item.icon"/>
      </div>
      <span>{{ item.title }}</span>
    </router-link>

    <Contact/>
  </div>
</template>

<script>
import Icon from "@/components/Icon"
import Contact from "./Contact"

export default {
  components: {
    Icon,
    Contact
  },
  data() {
    return {
      titles: [
        {name: "Home", title: "实习简介", exact: true, icon: "desp", id: 1},
        {name: "Blog", title: "地质背景", exact: false, icon: "blog", id: 2},
        {name: "Character", title: "矿床特征", exact: false, icon: "rock", id: 3},
        {name: "Route", title: "实习路线", exact: true, icon: "route", id: 4},
        {name: "Mine", title: "三维实景", exact: true, icon: "mine", id: 5},
        {name: "Content", title: "实习安排", exact: true, icon: "user", id: 6},
        {name: "Exam", title: "自测答题", exact: true, icon: "work", id: 7},
        {name: "Score", title: "成绩排行", exact: true, icon: "score", id: 8},
      ],
    }
  }
  
}
</script>

<style lang="less" scoped>
  @import "~@/styles/var.less";

  .navbar-container {
    width: 100%;
    height: 100%;
    font-size: 1.2em;
    font-weight: bold;
    box-shadow: 2px 2px 2px @dark;
    background-color: #fff;
    overflow-y: auto;
    box-sizing: border-box;

    .nav {
      padding: 10px 0 10px 20px;
      display: flex;
      color: @dark;
      cursor: pointer;
      user-select: none;
      letter-spacing: 5px;
      &:hover{
        color:#2e6dfc;
      }

      &.selected{
        color:#fff;
        background: #2e6dfc;
      }

      .nav-icon {
        padding-right: 10px;
      }
    }
  }

  .contact-container {
    position: absolute;
    left: 0;
    bottom: 0;
  }
</style>