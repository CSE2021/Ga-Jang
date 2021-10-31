//express 모듈 불러오기
const express = require("express");
//express 사용
const app = express();
app.use(express.json());

var userRouter = require('./routes/users');
var boardRouter = require('./routes/board');
var contentRouter = require('./routes/content');

app.use('/users', userRouter);
app.use('/board', boardRouter);
app.use('/content', contentRouter);
  
// http listen port 생성 서버 실행
app.listen(3002, () => console.log("Server Start :)"));