//express 모듈 불러오기
const express = require("express");
// multer 모듈 불러오기
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf());
        }
    }),
});
//CORS 모듈 불러오기
const cors = require('cors');
const corsOpts = {
    origin : '*',

    method : [
        'GET',
        'POST',
        'DELETE'
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};
//swagger 모듈 불러오기
const { swaggerUi, specs } = require('./swagger/swagger');
//express 사용
const app = express();
//CORS를 정해준 옵션으로 사용
app.use(cors(corsOpts));
//swagger path 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use('/img', express.static('uploads'));

var userRouter = require('./routes/users');
var boardRouter = require('./routes/board');
var contentRouter = require('./routes/content');

app.use('/users', userRouter);
app.use('/board', boardRouter);
app.use('/content', contentRouter);
  
// http listen port 생성 서버 실행
app.listen(3002, () => console.log("Server Start :)"));