import Mock from "mockjs";

//模拟考试数据
Mock.mock("/api/exam", "get", {
  code: 0,
  msg: "",
  "data|50": [
    {
      "id|+1": 1,
      "title": "@csentence(10, 15)",
      options: [
        "A：" + "@cword(5)",
        "B：" + "@cword(5)",
        "C：" + "@cword(5)",
        "D：" + "@cword(5)",
      ],
      "answer|1": ["A", "B", "C", "D"] 
    }
  ]
})