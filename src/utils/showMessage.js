import getComponentRootDom from "./getComponentRootDom";
import Icon from "@/components/Icon";
import styles from "./showMessage.module.less";


/**
 * 弹出消息 
 * @param {String} content 消息内容
 * @param {String} type info error success warn 
 * @param {Number} duration 弹窗多久后消失
 * @param {HTMLElement} container 消息显示到容器正中，如果不传，则显示到body正中 
 */
 export default function (options = {}) {
  const content = options.content || "";
  const type = options.type || "info";
  const duration = options.duration || 2000;
  const container = options.container || document.body;

  //创建一个元素
  const div = document.createElement("div");
  const iconDom = getComponentRootDom(Icon, {
    type,
  })
  div.innerHTML = `<span class=${styles.icon}>${iconDom.outerHTML}</span><div>${content}</div>`;
  //设置样式
  const typeClassName = styles[`message-${type}`]
  div.className = `${styles.message} ${typeClassName}`;
  //将div添加到容器中


  //容器的position是否为非静态定位
  if(!options.container) {
    if (getComputedStyle(container).position === "static") {
      container.style.position = "relative";
    }
  }


  container.appendChild(div);

  //浏览器强行渲染  
  div.clientHeight; //导致强行渲染  

  //回归到正常位置
  div.style.opacity = 1;
  div.style.transform = `translate(-50%, -50%)`;

  //等待duration时间后消失
  setTimeout(() => {
    div.style.opacity = 0;
    div.style.transform = `translate(-50%, -50%) translateY(-25px)`;
    div.addEventListener("transitionend", function () {
      div.remove();
      options.callback && options.callback();
    },
      { once: true }
    )
  }, duration)

}