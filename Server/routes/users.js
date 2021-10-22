var express = require('express');
const returnResults = require('../errorHandler');
const pool = require('../database/database');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("USERS API TEST");
})

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

router.post('/add', async function(req, res, next) {
    let { id, loc, name, lating } = req.body;

    var sql = "INSERT INTO accounts (id, loc, name, lating) VALUES(?, ?, ?, ?);"
    var param = [id, loc, name, lating]
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

router.post('/edit-lating', async function(req, res, next) {
    let { id, lating } = req.body;

    var sql = "UPDATE accounts SET lating=? WHERE id=?;"
    var param = [lating, id];
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