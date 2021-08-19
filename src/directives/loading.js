import loadingUrl from "@/assets/loading.svg";
import styles from "./loading.module.less";

// 判断给定元素中是否包含有特定的loadingImg元素
function getLoadingImg(el) {
  return el.querySelector("img[data-role=loading]");
}

//创建一个LoadingImg元素
function createLoadingImg() {
  const img = document.createElement("img");
  img.dataset.role = "loading";
  img.src = loadingUrl;
  img.className = styles.loading;
  return img;
}

export default function(el, binding) {
  //根据binding.value的值来确定是否需要给el元素添加loadingImg
  const curImg = getLoadingImg(el);
  if(binding.value) {
    //需要添加loadingImg
    if(!curImg) {
      //之前没有loadingImg，添加loadingImg
      const img = createLoadingImg();
      el.appendChild(img);
    }
  }else {
    //不需要添加loadingImg
    if(curImg) {
      curImg.remove();
    }
  }
}