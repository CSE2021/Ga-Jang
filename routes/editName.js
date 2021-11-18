/**
 * @swagger
 *  /users/edit-name:
 *    post:
 *      tags:
 *      - user
 *      description: 회원정보에서 닉네임만 변경한다.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: id
 *        in: body
 *        description: "회원 고유 번호"
 *        required: true
 *        type: string
 *      - name: name
 *        in: body
 *        description: "회원 닉네임"
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

async function editNameAPI(req, res) {
    let { id, name } = req.body;

    var sql = "UPDATE accounts SET name=? WHERE id=?;"
    var param = [name, id];
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
    editNameAPI : editNameAPI
}