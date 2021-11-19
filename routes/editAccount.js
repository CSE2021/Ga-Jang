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
 *      - name: user
 *        in: body
 *        description: 변경하려는 회원 id값과 변경하려는 계좌번호 값을 넘겨준다
 *        schema:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  example: 1
 *              account:
 *                  type: string
 *                  example: kimcheon
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