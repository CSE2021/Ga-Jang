/**
 * @swagger
 *  /board/{bid}:
 *    delete:
 *      tags:
 *      - board
 *      description: 게시글 목록중 bid에 해당하는 게시글을 삭제한다
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
 *                  type: object
 *                          
 */
const fs = require('fs');
const pool = require('../database/database');
const returnResults = require('../errorHandler');

async function deleteContentAPI(req, res) {
    let bid = req.params.bid;
    var sql1 = "SELECT thumbnail from board where bid='" + bid +"';";
    var sql2 = "SELECT imgurl from imgurl where bid='" + bid + "';";
    var sql3 = "DELETE from board where bid='" + bid + "';";
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        const sel1 = await conn.query(sql1);
        const sel2 = await conn.query(sql2);
        const del = await conn.query(sql3);

        await conn.commit();
        if(sel1[0][0].thumbnail.length > 0) {
            try{
                var imgurl = sel1[0][0].thumbnail.split('/');
                fs.fchmod.unlinkSync('uploads/' + imgurl[4]);
                for(var i = 0; i < sel2[0].length; i++) {
                    imgurl = sel2[0][i].imgurl.split('/');
                    fs.unlinkSync('uploads/' + imgurl[4]);
                }
            } catch(error) {
                if(error.code == 'ENOENT') {
                    console.log("Delete Error");
                }
            }
        }
        returnResults(false, res, del[0]);
    } catch (err) {
        await conn.rollback();
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
}

module.exports = {
    deleteContentAPI : deleteContentAPI
}