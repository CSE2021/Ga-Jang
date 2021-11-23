/**
 * @swagger
 *  /users/edit-email:
 *    post:
 *      tags:
 *      - user
 *      description: 회원정보에서 이메일만 변경한다.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: user
 *        in: body
 *        description: 변경하려는 회원 id값과 변경하려는 email 값을 넘겨준다
 *        schema:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  example: 1
 *              email:
 *                  type: string
 *                  example: hong@catholic.ac.kr
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
 */

const pool = require('../database/database');
const returnResults = require('../errorHandler');

async function editEmailAPI(req, res) {
    let { id, email } = req.body;

    var sql = "UPDATE accounts SET accountNo=? WHERE id=?;"
    var param = [email, id];
    const conn = await pool.getConnection();
    try {
        const upd = await conn.query(sql, param);
        returnResults(false, res, upd[0]);
    } catch (err) {
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
}

module.exports = {
    editEmailAPI : editEmailAPI
}