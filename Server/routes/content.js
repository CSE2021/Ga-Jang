var express = require('express');
const pool = require('../database/database');
const returnResults = require('../errorHandler');
var router = express.Router();

router.get('/:bid', async function(req, res, next) {
    let bid = req.params.bid;
    var sql1 = "SELECT * from board WHERE bid='" + bid + "';"
    var sql2 = "UPDATE content SET view = view+1 where bid='" + bid + "';";
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const sel = await conn.query(sql1);
        const upd = await conn.query(sql2);
        
        await conn.commit();
        returnResults(false, res, sel[0]);
    } catch (err) {
        await conn.rollback();
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
})

router.post('/add', async function(req, res, next) {
    let { wid, title, kind, price, thumbnail, fresh, deadline, content, unit, remain, minsize } = req.body;

    var sql1 = "INSERT INTO board (wid, title, kind, price, thumbnail) VALUES(?, ?, ?, ?, ?);";
    var sql2 = "INSERT INTO content (bid, fresh, deadline, content, unit, remain, minsize) VALUES(LAST_INSERT_ID(), ?, ?, ?, ?, ?, ?);";
    var param1 = [wid, title, kind, price, thumbnail];
    var param2 = [fresh, deadline, content, unit, remain, minsize];
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        const ins1 = await conn.query(sql1, param1);
        const ins2 = await conn.query(sql2, param2);

        await conn.commit();
        returnResults(false, res, ins2[0]);
    } catch (err) {
        await conn.rollback();
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
})

router.post('/edit', async function(req, res, next) {
    let { bid, wid, title, kind, price, thumbnail, fresh, deadline, content, unit, remain, minsize } = req.body;

    var sql1 = "UPDATE board SET title = ?, kind = ?, price = ?, thumbnail = ? WHERE bid=? and wid=?;";
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