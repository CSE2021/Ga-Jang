/**
 * @swagger
 *  /board/{bid}:
 *    get:
 *      tags:
 *      - board
 *      description: bid에 해당하는 게시글 정보를 가져온다.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: bid
 *        in: path
 *        required: true
 *        type: integer
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
 *                      $ref: '#/definitions/board'
 *                          
 */

 const pool = require('../database/database');
 const returnResults = require('../errorHandler');

async function getContentAPI(req, res) {
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
        var Info = Object.assign(sel[0][0], sel2[0][0])

        returnResults(false, res, Info);
    } catch (err) {
        await conn.rollback();
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
}

module.exports = {
    getContentAPI : getContentAPI
}