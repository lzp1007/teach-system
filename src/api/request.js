import axios from "axios";
//1. 发送请求的时候，如果有token，需要附带到请求头中
//2. 响应的时候，如果有token，保存token到本地（localstorage）
//3. 响应的时候，如果响应的消息码是403（没有token，token失效），在本地删除token
import vue  from "../main";
const baseURL = "http://localhost:12306";
export default function() {
  //1. 发送请求的时候，如果有token，需要附带到请求头中
  const token = localStorage.getItem("token");
  let ins = axios.create({
    baseURL,
  });
  if(token) {
    ins = axios.create({
      baseURL,
      headers: {
        authorization: "bearer " + token,
      }
    })
  }

  ins.interceptors.response.use((resp) => {
    //2. 响应的时候，如果有token，保存token到本地（localstorage）
    if(resp.headers.authorization) {
      localStorage.setItem("token", resp.headers.authorization);
    }
    return resp.data.data;
  }, (err) => {
    //3. 响应的时候，如果响应的消息码是403（没有token，token失效），在本地删除token
    if (err.response.status === 403) {
      localStorage.removeItem("token");
      //跳转页面
      vue.$router.push("/login")
    }
    return Promise.reject(err);
  })

  return ins;
}