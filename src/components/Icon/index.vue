<template>
  <i class="iconfont icon-container" :class="fontClass"></i>
</template>

<script>
const classMap = {
  mine: "icon-kuangshan",
  arrowUp: "icon-shangjiantou",
  arrowDown: "icon-xiajiantou_huaban",
  empty: "icon-kong",
  qq: "icon-icon",
  wx: "icon-wechat-fill",
  phone: "icon-phone-channel",
  email: "icon-youxiang",
  about: "icon-guanyu",
  chat: "icon-liuyan",
  success: "icon-chenggongtishi",
  info: "icon-info",
  warn: "icon-tixing",
  error: "icon-error",
  rock: "icon-yanshi",
  desp: "icon-shixi",
  work: "icon-icon-kaoshijilu",
  blog: "icon-dizhi1",
  user: "icon-subscriber-square",
  site: "icon-web",
  letter: "icon-youbian",
  location: "icon-dizhi",
  route: "icon-luxian",
  out: "icon-tuichu2",
  score: "icon-chengji"
}

export const types = Object.keys(classMap);

export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    fontClass() {
      return classMap[this.type];
    }
  }
}
</script>

<style scoped>
 @import "//at.alicdn.com/t/font_2491226_bb8414qqxao.css";

 .iconfont {
   color: inherit;
   font-size: inherit;
 }
</style>