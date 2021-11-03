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
 *              type: int
 *              description: User Manner Rate
 *          accountNo:
 *              type: string
 *              description: User Account Number 
 */
var express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const pool = require('../database/database');
const returnResults = require('../errorHandler');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("BOARD API TEST");
})

router.get('/:bid', async function(req, res, next) {
    let bid = req.params.bid;
    var sql1 = "SELECT wid, thumbnail, title, process," + 
    "DATE_FORMAT(recruit, '%Y-%m-%d') AS recruit, DATE_FORMAT(recruite, '%Y-%m-%d') AS recruite, DATE_FORMAT(ship, '%Y-%m-%d') AS ship," +
    "DATE_FORMAT(shipe, '%Y-%m-%d') AS shipe, DATE_FORMAT(share, '%Y-%m-%d') AS share," +
    "DATE_FORMAT(sharee, '%Y-%m-%d') AS sharee, place, sharetime, mprice, remain, siteurl," +
    "view, goal, collect, content, cnt from board WHERE bid='" + bid + "';"
    var sql2 = "UPDATE board SET view = view+1 where bid='" + bid + "';";
    var sql3 = "SELECT name, email, accountNO from accounts WHERE id = (SELECT wid from board WHERE bid ='" + bid + "');"
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const sel = await conn.query(sql1);
        const upd = await conn.query(sql2);
        const sel2 = await conn.query(sql3);
        
        await conn.commit();
        var contentInfo = JSON.parse(JSON.stringify(sel[0]));
        var writerInfo = JSON.parse(JSON.stringify(sel2[0]));
    
        returnResults(false, res, {contentInfo, writerInfo});
    } catch (err) {
        await conn.rollback();
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
})

router.post('/add', async function(req, res, next) {
    let { wid, thumbnail, title, recruit, recruite, ship, shipe,
        share, sharee, place, sharetime, mPrice, siteurl, goal, content } = req.body;

    var sql1 = "INSERT INTO board (wid, thumbnail, title, recruit, recruite, ship, shipe, share, sharee, place, sharetime, mPrice, remain, siteurl, goal, content) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    var sql2 = "SELECT bid from board WHERE bid = LAST_INSERT_ID();";
    var param1 = [wid, thumbnail, title, recruit, recruite, ship, shipe, share, sharee, place, 
        sharetime, mPrice, goal, siteurl, goal, content ];
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        const ins = await conn.query(sql1, param1);
        const sel = await conn.query(sql2);

        await conn.commit();
        returnResults(false, res, sel[0]);
    } catch (err) {
        await conn.rollback();
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
})

router.post('/edit', async function(req, res, next) {
    let { bid, wid, title, kind, price, thumbnail, fresh, deadline, content, unit, remain, minsize } = req.body;

    var sql1 = "UPDATE board SET thumbnail=?, title = ?, , price = ?, thumbnail = ? WHERE bid=? and wid=?;";
    var sql2 = "UPDATE content SET fresh=?, deadline=?, content=?, unit=?, remain=?, minsize=? WHERE bid=?;";
    var param1 = [title, kind, price, thumbnail, bid, wid];
    var param2 = [fresh, deadline, content, unit, remain, minsize, bid];
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        const upd1 = await conn.query(sql1, param1);
        const upd2 = await conn.query(sql2, param2);

        await conn.commit();
        returnResults(false, res, upd2[0]);
    } catch (err) {
        await conn.rollback();
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
})

router.get('/list/:page', async function(req, res, next) {
    let page = req.params.page;
    var num = parseInt((page-1) * 10);
    var sql = "SELECT bid, wid, thumbnail, title, process, recruit, recruite, mprice, remain from board ORDER BY wdate desc limit " + num + ", 10;"
    const conn = await pool.getConnection();
    try {
        const sel = await conn.query(sql);
        returnResults(false, res, sel[0]);
    } catch (err) {
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
})

router.delete('/:bid', async function(req, res, next) {
    let bid = req.params.bid;
    var sql = "DELETE from board where no='" + bid + "';";
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