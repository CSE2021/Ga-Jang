/**
 * @swagger
 *  /users/{userId}:
 *    delete:
 *      tags:
 *      - user
 *      description: 회원정보 리스트 중 id값에 해당되는 유저 정보를 삭제한다.
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
 *                  type: object
 *                          
 */
const returnResults = require('../errorHandler');
const pool = require('../database/database');

async function userDeleteAPI(req, res) {
    let user_id = req.params.id;
    var sql = "DELETE from accounts where id='" + user_id + "';";
    const conn = await pool.getConnection();
    try {
        const del = await conn.query(sql);
        returnResults(false, res, del[0]);
    } catch (err) {
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
}

module.exports = {
    userDeleteAPI : userDeleteAPI
}