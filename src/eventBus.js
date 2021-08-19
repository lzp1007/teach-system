// const listeners = {};

// //事件总线
// export default {
//   //监听事件
//   $on(eventName, handler) {
//     if(!listeners[eventName]){
//       listeners[eventName] = new Set();
//       listeners[eventName].add(handler);
//     }
//   },
//   //取消监听
//   $0ff(eventName, handler) {
//     if(!listeners[eventName]) {
//       return;
//     }
//     listeners[eventName].delete(handler);
//   },
//   //触发事件
//   $emit(eventName, ...args) {
//     if(!listeners[eventName]) {
//       return;
//     }

//     for(const handler of listeners[eventName]) {
//       handler(...args);
//     }
//   }
// }

import Vue from "vue"
const app = new Vue({});

/**
 * 事件名：mainScroll
 * 含义：主区域滚动条位置变化后触发
 * 参数：
 * 滚动的dom元素，如果为undefined，表示dom已经被销毁
 * 
 * 
 * 事件名：setMainScroll
 * 含义：当需要设置主区域滚动条位置时触发
 * 参数：滚动高度
 * 
 * 
 * 事件名：hideToTop
 * 含义：组件销毁后隐藏ToTop按钮
 * 参数：无
 */
Vue.prototype.$bus = app;
export default app;