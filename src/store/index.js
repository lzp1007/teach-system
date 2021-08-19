import Vue from "vue"
import  Vuex from "vuex"
import loginUser from "./loginUser"

Vue.use(Vuex);


const store = new Vuex.Store({
    modules: {
      loginUser
    },
    strict: true //开启严格模式，只允许通过mutation的方式来改变数据
});

//window.$store = store;   //window里有同名属性，所以加一个$区分一下

export default store;