/**
 * @swagger
 *  /users/{userId}:
 *    get:
 *      tags:
 *      - user
 *      description: 회원정보 리스트 중 id값에 해당되는 유저 정보를 가져온다.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: userId
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
 *                      $ref: '#/definitions/accounts'
 *                          
 */
const pool = require('../database/database');
const returnResults = require('../errorHandler');

async function userInfoAPI(req, res) {
    let user_id = req.params.id;
    var sql = "SELECT * from accounts WHERE id='" + user_id + "';"
    const conn = await pool.getConnection();
    try {
        const sel = await conn.query(sql);
        returnResults(false, res, sel[0]);
    } catch (err) {
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
}

module.exports = {
    userInfoAPI : userInfoAPI
}