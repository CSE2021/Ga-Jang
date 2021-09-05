//express 모듈 불러오기
const express = require("express");
//express 사용
const app = express(); 

app.get("/", (req, res) => {
    res.send("집단지성팀 API");
});
  
// http listen port 생성 서버 실행
app.listen(3002, () => console.log("Server Start :)"));