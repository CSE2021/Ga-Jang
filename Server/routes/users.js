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
var express = require('express');
const returnResults = require('../errorHandler');
const pool = require('../database/database');
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + file.originalname);
        }
    }),
});
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("USERS API TEST");
})

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
router.get('/list', async function(req, res) {
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
});

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
 *                          
 */
router.get('/:id', async function(req, res, next) {
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
});
/**
 * @swagger
 *  /users/id-check:
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
router.post('/id-check', async function(req, res, next) {
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
})

/**
 * @swagger
 *  /users/add:
 *    post:
 *      tags:
 *      - user
 *      description: 회원정보를 등록한다.
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
router.post('/add', upload.array('img'), async function(req, res, next) {
    var profileImg
    if (req.files.length > 0) {
        profileImg = "http://shbox.shop:3002/img/" + req.files[0].filename;
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
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
});

/**
 * @swagger
 *  /users/edit-email:
 *    post:
 *      tags:
 *      - user
 *      description: 회원정보에서 이메일만 변경한다.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: id
 *        in: body
 *        description: "회원 고유 번호"
 *        required: true
 *        type: string
 *      - name : email
 *        in: body
 *        description: "회원 이메일"
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
router.post('/edit-eamil', async function(req, res, next) {
    let { id, eamil } = req.body;

    var sql = "UPDATE accounts SET accountNo=? WHERE id=?;"
    var param = [eamil, id];
    const conn = await pool.getConnection();
    try {
        const upd = await conn.query(sql, param);
        returnResults(false, res, upd[0]);
    } catch (err) {
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
})

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
router.post('/edit-name', async function(req, res, next) {
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
})

/**
 * @swagger
 *  /users/edit-loc:
 *    post:
 *      tags:
 *      - user
 *      description: 회원정보에서 지역만 변경한다.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: id
 *        in: body
 *        description: "회원 고유 번호"
 *        required: true
 *        type: string
 *      - name: loc
 *        in: body
 *        description: "회원 지역"
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
router.post('/edit-loc', async function(req, res, next) {
    let { id, loc } = req.body;

    var sql = "UPDATE accounts SET loc=? WHERE id=?;"
    var param = [loc, id];
    const conn = await pool.getConnection();
    try {
        const upd = await conn.query(sql, param);
        returnResults(false, res, upd[0]);
    } catch (err) {
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
})

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
router.post('/edit-account', async function(req, res, next) {
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
})

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
router.delete('/:id', async function(req, res, next) {
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
});

module.exports = router;