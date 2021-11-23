/**
 * @swagger
 *  /users/nameCheck:
 *    post:
 *      tags:
 *      - user
 *      description: 닉네임이 존재하는지 확인한다.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - in: body
 *        name: name
 *        description: 확인하고 싶은 닉네임을 넘겨준다.
 *        schema:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  example: 길동이는아가야
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
 *                  properties:
 *                     exist:
 *                       type: integer
 *                       example: 1           
 */
const pool = require('../database/database');
const returnResults = require('../errorHandler');

async function nameCheckAPI(req, res) {
    let user_id = req.body;
    var sql = "SELECT EXISTS (SELECT * from accounts WHERE name = ?) AS exist;"
    var param = [user_id];
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
    nameCheckAPI : nameCheckAPI
}