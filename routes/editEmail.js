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
 *      - name: id
 *        in: body
 *        description: "회원 고유 번호"
 *        required: true
 *        type: string
 *      - name : email
 *        in: body
 *        description: "회원 이메일"
 *        required: true
 *        type: string
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
    let { id, eamil } = req.body;

    var sql = "UPDATE accounts SET accountNo=? WHERE id=?;"
    var param = [eamil, id];
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