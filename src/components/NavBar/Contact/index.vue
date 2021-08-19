<template>
  <div class="contact-container">
    <ul>
    <li>
      <a>
        <div class="icon">
          <Icon type="letter"/>
        </div>
        <span>邮编：230009</span>
      </a>
    </li>
    <li>
      <a>
        <div class="icon">
          <Icon type="site"/>
        </div>
        <span>合工大资环学院官网</span>
      </a>
      <div class="pop">
        <img src="~@/assets/webSite.png" alt="">
      </div>
    </li>
    <li>
      <a>
        <div class="icon">
          <Icon type="location"/>
        </div>
        <span>合肥市包河区屯溪路193号</span>
      </a>
      <div class="pop">
        <img src="~@/assets/location.png" alt="">
      </div>
    </li>
  </ul>
  </div>
</template>

<script>
import Icon from "@/components/Icon";

export default {
  components: {
    Icon
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
  ul{
    list-style: none;
    padding: 20px;
    margin: 0;
    color: @dark;
    @itemHeight: 30px;
    li{
      height: 30px;
      line-height: 30px;
      margin: 14px 0;
      cursor: pointer;
      position: relative;
      &:hover{
        .pop {
          transform: scaleY(1);
        }
      }
    }
    a{
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 12px;
      color: @dark;
    }
    .icon {
      font-size: 15px;
      width: 36px;
    }
    .pop{
      position: absolute;
      left: 0;
      bottom: @itemHeight + 5px;
      padding: 10px;
      background-color: #fff;
      border-radius: 5px;
      transform: scaleY(0);
      transform-origin: center bottom;
      transition: .3s;

      img{
        width: 100px;
        height: 100px;
        display: block;
      }

      &::after{
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        width: 8px;
        height: 8px;
        background-color: #fff;
        bottom: -4px;
      }
    }
  }
</style>