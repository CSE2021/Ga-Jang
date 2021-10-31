var express = require('express');
const pool = require('../database/database');
const returnResults = require('../errorHandler');
var router = express.Router();

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
module.exports = router;