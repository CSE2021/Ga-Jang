/**
 * @swagger
 *  /users/register:
 *    post:
 *      tags:
 *      - user
 *      description: 회원정보를 등록한다. 'img' 키값으로 한장의 이미지 업로드 가능!!
 *      consumes:
 *      - multipart/form-data
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
 *              email:
 *                  type: string
 *                  example: 1111@catholic.ac.kr
 *              loc:
 *                  type: string
 *                  example: 22222
 *              name:
 *                  type: string
 *                  example: 홍길동
 *              accountNo:
 *                  type: string
 *                  example: 1111-111-1111
 *              img:
 *                  type: string
 *                  format: file
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
 const pool = require('../database/database');
 const returnResults = require('../errorHandler');
 const fs = require('fs');

async function registerAPI(req, res) {
    var profileImg
    if (req.file) {
        profileImg = "http://shbox.shop:3002/img/" + req.file.filename;
    } else {
        profileImg = "";
    }
    let { id, email, loc, name, accountNo } = req.body;

    var sql = "INSERT INTO accounts (id, email, loc, name, accountNo, profileImg) VALUES(?, ?, ?, ?, ?, ?);"
    var param = [id, email, loc, name, accountNo, profileImg]
    const conn = await pool.getConnection();
    try {
        const ins = await conn.query(sql, param);
        returnResults(false, res, ins[0]);
    } catch (err) {
        try{
            var imgurl = req.file.destination + req.file.filename;
            fs.unlinkSync(imgurl);
        } catch(error) {
            if(error.code == 'ENOENT') {
                console.log("Delete Error");
            }
        }
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
}

module.exports = {
    registerAPI : registerAPI
}