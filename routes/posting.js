/**
 * @swagger
 *  /board/post:
 *    post:
 *      tags:
 *      - board
 *      description: 게시글을 등록한다. multipart/form-data형식이며, 'img'키 값으로 여러장의 이미지 첨부가 가능함
 *      consumes:
 *      - multipart/form-data
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - in: formData
 *        name: wid
 *        type: string
 *        description: 회원 고유 ID값
 *      - in: formData
 *        name: title
 *        type: string
 *        description: 게시글 제목
 *      - in: formData
 *        name: recruit
 *        type: string
 *        format: date
 *        description: 공구 모집 시작일
 *        example: 211103
 *      - in: formData
 *        name: recruite
 *        type: string
 *        format: date
 *        description: 공구 모집 마감일
 *      - in: formData
 *        name: ship
 *        type: string
 *        format: date
 *        description: 배송 시작 예정일
 *      - in: formData
 *        name: shipe
 *        type: string
 *        format: date
 *        description: 배송 마감 예정일
 *      - in: formData
 *        name: share
 *        type: string
 *        format: date
 *        description: 분배 시작 예정일
 *      - in: formData
 *        name: sharee
 *        type: string
 *        format: date
 *        description: 분배 마감 예정일
 *      - in: formData
 *        name: place
 *        type: string
 *        description: 상품 분배 장소
 *      - in: formData
 *        name: sharetime
 *        type: string
 *        format: datetime
 *        description: 상품 분배 예정 시각
 *        example: 170000
 *      - in: formData
 *        name: mPrice
 *        type: integer
 *        description: 상품을 구매가능한 최소 가격
 *      - in: formData
 *        name: siteurl
 *        type: string
 *        description: 공동 구매 상품 설명 상세페이지\
 *      - in: formData
 *        name: goal
 *        type: integer
 *        description: 공동구매 목표 금액
 *      - in: formData
 *        name: content
 *        type: string
 *        description: 게시글 내용
 *      - in: formData
 *        name: img
 *        type: file
 *        description: 상품 사진(img 키로 여러개의 사진 전송 가능!! 1번째 사진이 자동으로 썸네일로 지정됨)
 *      - in: formData
 *        name: img
 *        type: file
 *        description: 상품 사진(똑같은 img키로 여러장의 사진 업로드 가능!!(최대 10개), 확장자 jpeg, jpg, png, gif만 허용)
 *      responses:
 *        200:
 *          schema:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      example: success
 *                  status:
 *                      type: integer
 *                      example: 200
 *                  result:
 *                      type: object
 *                      properties:
 *                          bid:
 *                              type: integer
 *                                
 */
const pool = require('../database/database');
const returnResults = require('../errorHandler');
const fs = require('fs');

async function postingAPI(req, res) {
    var thumbnail;
    if (req.files.length > 0) {
        thumbnail = "http://shbox.shop:3002/img/" + req.files[0].filename;
    } else {
        thumbnail = "";
    }
    let { wid, title, recruit, recruite, ship, shipe,
        share, sharee, place, sharetime, mPrice, siteurl, goal, content } = req.body;

    var sql1 = "INSERT INTO board (wid, thumbnail, title, recruit, recruite, ship, shipe, share, sharee, place, sharetime, mPrice, remain, siteurl, goal, content) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    var sql2 = "SELECT bid from board WHERE bid = LAST_INSERT_ID();";
    var param1 = [wid, thumbnail, title, recruit, recruite, ship, shipe, share, sharee, place, 
        sharetime, mPrice, goal, siteurl, goal, content ];
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        const ins = await conn.query(sql1, param1);
        const sel = await conn.query(sql2);
        for(var i = 1; i < req.files.length; i++) {
            var imgurl = "http://shbox.shop:3002/img/" + req.files[i].filename;
            var sqlImg = "INSERT INTO imgurl (bid, imgurl) VALUES(?, ?);"
            var param2 = [sel[0][0].bid, imgurl];
            const insImg = await conn.query(sqlImg, param2);
        }

        await conn.commit();
        returnResults(false, res, sel[0][0]);
    } catch (err) {
        await conn.rollback();
        try{
            for(var i = 0; i < req.files.length; i++) {
                var imgurl = req.files[i].destination + req.files[i].filename;
                fs.unlinkSync(imgurl);
            }
        } catch(error) {
            if(error.code == 'ENOENT') {
                console.log("Delete Error");
            }
        }
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
}

module.exports = {
    postingAPI : postingAPI
}