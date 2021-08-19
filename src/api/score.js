import request from "./request"

//获取学生成绩
export async function getScore() {
  return await request().get("/api/score");
}

//提交成绩
export async function postScore(scoreObj) {
  return await request().post("/api/score", scoreObj);
}