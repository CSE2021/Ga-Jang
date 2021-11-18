/**
 * @swagger
 *  /users/edit-account:
 *    post:
 *      tags:
 *      - user
 *      description: 회원정보에서 계좌번호를 변경한다.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: id
 *        in: body
 *        description: "회원 고유 번호"
 *        required: true
 *        type: string
 *      - name: accountNo
 *        in: body
 *        description: "회원 계좌번호"
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

async function editAccountAPI(req, res) {
    let { id, account } = req.body;

    var sql = "UPDATE accounts SET accountNo=? WHERE id=?;"
    var param = [account, id];
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
    editAccountAPI : editAccountAPI
}