/**
 * @swagger
 *  /users/edit-loc:
 *    post:
 *      tags:
 *      - user
 *      description: 회원정보에서 지역만 변경한다.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: id
 *        in: body
 *        description: "회원 고유 번호"
 *        required: true
 *        type: string
 *      - name: loc
 *        in: body
 *        description: "회원 지역"
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

const returnResults = require('../errorHandler');
const pool = require('../database/database');

async function editLocAPI(req, res) {
    let { id, loc } = req.body;

    var sql = "UPDATE accounts SET loc=? WHERE id=?;"
    var param = [loc, id];
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
    editLocAPI : editLocAPI
}