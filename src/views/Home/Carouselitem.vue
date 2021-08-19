<template>
  <div
    class="carousel-item-container"
    ref="container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="carousel-img" ref="image" :style="imagePosition">
      <ImgLoader
        @load="this.showWords"
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
      />
    </div>
    <div class="article-area">
      <div 
        class="desc"
        :class="item.divRef" 
        v-for="(item, index) in despObj" 
        :ref="item.divRef" 
        :key="index"
      >
        {{ item.paragrah }}
      </div>
    </div>
  </div>
</template>

<script>
import ImgLoader from "@/components/ImageLoader";

export default {
  components: {
    ImgLoader,
  },
  props: ["carousel"],
  data() {
    return {
      descWidth: [],     //每个段落的宽度
      containerSize: null, //外层容器的尺寸
      innerSize: null, //里层图片尺寸
      mouseX: 0, //鼠标横坐标
      mouseY: 0, //鼠标纵坐标
    };
  },
  computed: {
    despObj() {
      const paragraphs = this.carousel.article.split("，"); 
      const msgs = [];
      for(let i = 0; i < paragraphs.length; i++) {
        msgs.push({
          divRef: `desc${i}`,
          paragrah: paragraphs[i],
        })
      }
      return msgs;
    },
    //得到图片坐标
    imagePosition() {
      if (!this.innerSize || !this.containerSize) {
        return;
      }

    const extraWidth = this.innerSize.width - this.containerSize.width;
    const extraHeight = this.innerSize.height - this.containerSize.height;
    const left = (-extraWidth / this.containerSize.width) * this.mouseX;
    const top = (-extraHeight / this.containerSize.height) * this.mouseY;
    return {
      transform: `translate(${left}px, ${top}px`,
    };
    },
    center() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  mounted() {
    for(let i = 0; i < this.despObj.length; i++) {
      this.descWidth.push(this.$refs["desc"+i][0].clientWidth);
      this.$refs["desc"+i][0].style.top;
    }
    this.showWords();
    this.setSize();
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;
    window.addEventListener("resize", this.setSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.setSize);
  },
  methods: {
    showWords() {
      //设置desc的动画
      //强制渲染
      for(let i = 0; i < this.despObj.length; i++) {
        this.$refs["desc"+i][0].style.opacity = 1;
        this.$refs["desc"+i][0].style.width = 0;
        this.$refs["desc"+i][0].clientWidth;
        this.$refs["desc"+i][0].style.transition = "2s 1s";
        this.$refs["desc"+i][0].style.width = this.descWidth[i] + "px";
      }
    },
    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };

      this.innerSize = {
        width: this.$refs.image.clientWidth,
        height: this.$refs.image.clientHeight,
      };
    },
    handleMouseMove(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    handleMouseLeave() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.carousel-item-container {
  background-color: @dark;
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  overflow: hidden;
}

.carousel-img {
  width: 110%;
  height: 110%;
  position: absolute;
  left: 0;
  top: 0;
  transition: 0.3s;
}

.article-area {
  position: absolute;
  left: 30px;
  top: calc(50%);
  transform: translateY(-50%);
}
.desc {
  color: #fff;
  text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
  letter-spacing: 3px;
  white-space: nowrap;
  overflow: hidden;
  opacity: 0;
  font-size: 1.5em;
}
</style>