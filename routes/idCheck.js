/**
 * @swagger
 *  /users/idCheck:
 *    post:
 *      tags:
 *      - user
 *      description: id가 존재하는지 확인한다.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - in: body
 *        required: true
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
 *                  type: object
 *                  properties:
 *                     exist:
 *                       type: integer
 *                       example: 1           
 */
const pool = require('../database/database');
const returnResults = require('../errorHandler');

async function idCheckAPI(req, res) {
    let user_id = req.body;
    var sql = "SELECT EXISTS (SELECT * from accounts WHERE id = ?) AS exist;"
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
    idCheckAPI : idCheckAPI
}