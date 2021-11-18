/**
 * @swagger
 *  /board/post:
 *    post:
 *      tags:
 *      - board
 *      description: 게시글을 등록한다.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - in: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *              wid:
 *                  type: string
 *                  example: 1
 *              thumbnail:
 *                  type: string
 *                  example: http~~
 *              title:
 *                  type: string
 *                  example: fighting
 *              recruit:
 *                  type: date
 *                  example: 20211105
 *              recruite:
 *                  type: date
 *                  example: 20211105
 *              ship:
 *                  type: date
 *                  example: 20211105
 *              shipe:
 *                  type: date
 *                  example: 20211105
 *              share:
 *                  type: date
 *                  example: 20211105
 *              sharee:
 *                  type: date
 *                  example: 20211105
 *              place:
 *                  type: string
 *                  example: 역곡역앞
 *              sharetime:
 *                  type: date-time
 *                  example: 170000
 *              mPrice:
 *                  type: integer
 *                  example: 500
 *              siteurl:
 *                  type: string
 *              goal:
 *                  type: integer
 *                  example: 10000
 *              content:
 *                  type: string
 *                  example: 조미김 팔아요
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