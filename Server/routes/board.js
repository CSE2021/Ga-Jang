/**
 * @swagger
 * definitions:
 *  board:
 *      type: object
 *      required:
 *          - bid
 *          - wid
 *          - thumbnail
 *          - title
 *          - wdate
 *          - process
 *          - recruit
 *          - recruite
 *          - ship
 *          - shipe
 *          - share
 *          - sharee
 *          - place
 *          - sharetime
 *          - mPrice
 *          - remain
 *          - siteurl
 *          - view
 *          - goal
 *          - collect
 *          - content
 *          - cnt
 *      properties:
 *          bid:
 *              type: integer
 *              description: 게시글 고유 번호
 *          wid:
 *              type: string
 *              description: 작성자 회원번호
 *          thumbnail:
 *              type: string
 *              description: 썸네일 이미지 저장 경로
 *          title:
 *              type: string
 *              description: 게시글 제목
 *          wdate:
 *              type: date-time
 *              description: 게시글 작성 시간
 *          process:
 *              type: integer
 *              description: 공구 진행 상황
 *          recruit:
 *              type: date
 *              description: 공구 모집 시작일
 *          recruite:
 *              type: date
 *              description: 공구 모집 마감일
 *          ship:
 *              type: date
 *              description: 배송 시작 예정일
 *          shipe:
 *              type: date
 *              description: 배송 마감 예정일
 *          share:
 *              type: date
 *              description: 배부 시작 예정일
 *          sharee:
 *              type: date
 *              description: 배부 마감 예정일
 *          place:
 *              type: string
 *              description: 배부 장소
 *          sharetime:
 *              type: date-time
 *              description: 배부 예정 시각
 *          mPrice:
 *              type: integer
 *              description: 최소 구매 가능 금액
 *          remain:
 *              type: integer
 *              description: 공구마감까지 남은 금액
 *          siteurl:
 *              type: string
 *              description: 상품 판매 사이트 주소
 *          view:
 *              type: integer
 *              description: 조회수
 *          goal:
 *              type: integer
 *              description: 공구 목표 금액
 *          collect:
 *              type: integer
 *              description: 현재까지 모인 금액
 *          content:
 *              type: string
 *              description: 상세 내용
 *          cnt:
 *              type: integer
 *              description: 현재까지 모집된 인원
 */
var express = require('express');
const pool = require('../database/database');
const returnResults = require('../errorHandler');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("BOARD API TEST");
})

router.get('/:bid', async function(req, res, next) {
    let bid = req.params.bid;
    var sql1 = "SELECT wid, thumbnail, title, process," + 
    "DATE_FORMAT(recruit, '%Y-%m-%d') AS recruit, DATE_FORMAT(recruite, '%Y-%m-%d') AS recruite, DATE_FORMAT(ship, '%Y-%m-%d') AS ship," +
    "DATE_FORMAT(shipe, '%Y-%m-%d') AS shipe, DATE_FORMAT(share, '%Y-%m-%d') AS share," +
    "DATE_FORMAT(sharee, '%Y-%m-%d') AS sharee, place, sharetime, mprice, remain, siteurl," +
    "view, goal, collect, content, cnt from board WHERE bid='" + bid + "';"
    var sql2 = "UPDATE board SET view = view+1 where bid='" + bid + "';";
    var sql3 = "SELECT name, email, accountNO from accounts WHERE id = (SELECT wid from board WHERE bid ='" + bid + "');"
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const sel = await conn.query(sql1);
        const upd = await conn.query(sql2);
        const sel2 = await conn.query(sql3);
        
        await conn.commit();
        var contentInfo = JSON.parse(JSON.stringify(sel[0]));
        var writerInfo = JSON.parse(JSON.stringify(sel2[0]));
    
        returnResults(false, res, {contentInfo, writerInfo});
    } catch (err) {
        await conn.rollback();
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
})

router.post('/add', async function(req, res, next) {
    let { wid, thumbnail, title, recruit, recruite, ship, shipe,
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

        await conn.commit();
        returnResults(false, res, sel[0]);
    } catch (err) {
        await conn.rollback();
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
})

router.post('/edit', async function(req, res, next) {
    let { bid, wid, title, kind, price, thumbnail, fresh, deadline, content, unit, remain, minsize } = req.body;

    var sql1 = "UPDATE board SET thumbnail=?, title = ?, , price = ?, thumbnail = ? WHERE bid=? and wid=?;";
    var sql2 = "UPDATE content SET fresh=?, deadline=?, content=?, unit=?, remain=?, minsize=? WHERE bid=?;";
    var param1 = [title, kind, price, thumbnail, bid, wid];
    var param2 = [fresh, deadline, content, unit, remain, minsize, bid];
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        const upd1 = await conn.query(sql1, param1);
        const upd2 = await conn.query(sql2, param2);

        await conn.commit();
        returnResults(false, res, upd2[0]);
    } catch (err) {
        await conn.rollback();
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
})

/**
 * @swagger
 *  /board/list/:page:
 *    get:
 *      tags:
 *      - board
 *      description: 게시글을 페이지 단위로 가져온다
 *      produces:
 *      - applicaion/json
 *      responses:
 *       200:
 *        schema:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *                  example: success
 *              status:
 *                  type: integer
 *                  example: 200
 *              result:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          bid:
 *                              type: integer
 *                          wid:
 *                              type: string
 *                          thumbnail:
 *                              type: string
 *                          title:
 *                              type: string
 *                          process:
 *                              type: integer
 *                          recruite:
 *                              type: date
 *                          mPrice:
 *                              type: integer
 *                          remain:
 *                              type: integer
 *                          content:
 *                              type: string
 */
router.get('/list/:page', async function(req, res, next) {
    let page = req.params.page;
    var num = parseInt((page-1) * 5);
    var sql = "SELECT bid, wid, thumbnail, title, process, DATE_FORMAT(recruite, '%Y-%m-%d') AS recruite, mprice, remain from board ORDER BY wdate desc limit " + num + ", 5;"
    const conn = await pool.getConnection();
    try {
        const sel = await conn.query(sql);
        returnResults(false, res, sel[0]);
    } catch (err) {
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
})

router.delete('/:bid', async function(req, res, next) {
    let bid = req.params.bid;
    var sql = "DELETE from board where bid='" + bid + "';";
    const conn = await pool.getConnection();
    try {
        const del = await conn.query(sql);
        returnResults(false, res, del[0]);
    } catch (err) {
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
});

module.exports = router;