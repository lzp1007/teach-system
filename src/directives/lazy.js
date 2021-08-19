import eventBus from "@/eventBus";
import {debounce} from "@/utils";
import defaultGif from "@/assets/default.gif";


let imgs = [];

function setImage(img) {
  //使用默认图片
  img.dom.src = defaultGif;
  //判断图片是否在视口范围内
  const clientHeight = document.documentElement.clientHeight;
  const rect = img.dom.getBoundingClientRect();
  const height = rect.height || 150;
  if(rect.top >= -height && rect.top <= clientHeight) {
    //在视口范围内
    img.dom.src = img.src;
    //处理完成后删除当前图片
    imgs = imgs.filter((i) => i !== img);
  }
}

//设置哪些图片需要加载
function setImages() {
  for(const img of imgs) {
    setImage(img);
  }
};

function handleScroll() {
  setImages();
};

eventBus.$on("mainScroll", debounce(handleScroll, 50))

export default {
  inserted(el, binding) {
    const img = {
      dom: el,
      src: binding.value,
    }
    imgs.push(img);
    //刚开始先图片为默认图片
    setImage(img);
  },
  unbind(el) {
    imgs = imgs.filter((img) => img.dom !== el);
  }
}