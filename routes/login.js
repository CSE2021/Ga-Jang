/**
 * @swagger
 *  /users/login:
 *    post:
 *      tags:
 *      - user
 *      description: 로그인기능, 카카오 소셜 로그인에서 얻은 고유 id값을 넘겨준다.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - in: body
 *        name: id
 *        description: 회원 고유 id값을 넘겨준다. 반환값으로는 회원 정보 전체를 넘겨준다.
 *        schema:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  example: 1
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
 *                      $ref: '#/definitions/accounts'       
 */

 const pool = require('../database/database');
 const returnResults = require('../errorHandler');

async function loginAPI(req, res) {
    let {id} = req.body;
    var sql = "SELECT * from accounts WHERE id = ?;"
    var param = [id];
    const conn = await pool.getConnection();
    try {
        const sel = await conn.query(sql, param);
        returnResults(false, res, sel[0]);
    } catch (err) {
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
}

module.exports = {
    loginAPI : loginAPI
}