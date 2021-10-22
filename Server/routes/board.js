var express = require('express');
const pool = require('../database/database');
const returnResults = require('../errorHandler');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("BOARD API TEST");
})

router.get('/list/:page', async function(req, res, next) {
    let page = req.params.page;
    var num = parseInt((page-1) * 10);
    var sql = "SELECT * from board ORDER BY wdate desc limit " + num + ", 10;"
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

router.get('/kind', async function(req, res, next) {
    let { kind, page } = req.body;
    var sql = "SELECT * from board WHERE kind=? limit ?, 10;"
    var param = [kind, page];
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

module.exports = router;