/**
 * @swagger
 * definitions:
 *  accounts:
 *      type: object
 *      required:
 *          - id
 *          - email
 *          - loc
 *          - name
 *          - lating
 *          - accountNo
 *      properties:
 *          id:
 *              type: string
 *              description: UserID
 *          email:
 *              type: string
 *              description: email Address
 *          loc:
 *              type: string
 *              description: User Location
 *          name:
 *              type: string
 *              description: User Name
 *          rating:
 *              type: integer
 *              description: User Manner Rate
 *          accountNo:
 *              type: string
 *              description: User Account Number 
 */
/**
 * @swagger
 *  /users/list:
 *    get:
 *      tags:
 *      - user
 *      description: 회원정보 리스트 중 5개를 가져온다.
 *      produces:
 *      - applicaion/json
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

async function userListAPI(req, res) {
    var sql = "SELECT * from accounts LIMIT 5;"
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
    userListAPI : userListAPI
}