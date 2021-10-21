var express = require('express');
const getConnection = require('../database/database');
const returnResults = require('../errorHandler');
var router = express.Router();

router.get('/:bid', function(req, res, next) {
    let bid = req.params.bid;
    var sql = "SELECT * from board WHERE no='" + bid + "';"

    getConnection((conn) => {
        conn.query(sql, function(err, result, fields) {
            returnResults(err, res, result);
        });
        conn.release();
    });
})

router.post('/add', function(req, res, next) {
    let { wid, title, kind, price, thumbnail, fresh, deadline, content, unit, remain, minsize } = req.body;

    var sql = "INSERT INTO board (wid, title, kind, price, thumbnail) VALUES(?, ?, ?, ?, ?);";
    var param = [wid, title, kind, price, thumbnail];
    var pk = 0;
    getConnection((conn) => {
        conn.query(sql, param, function(err, result, fields) {
            if(err) {
                returnResults(err, res, result);
            }
            else {
                sql = "INSERT INTO content (bid, fresh, deadline, content, unit, remain, minsize) VALUES(LAST_INSERT_ID(), ?, ?, ?, ?, ?, ?);";
                param = [fresh, deadline, content, unit, remain, minsize];
                
                conn.query(sql, param, function(err, result, fields) {
                        returnResults(err, res, result);
                });
            }
        });
        conn.release();
    });
})

router.post('/edit', function(req, res, next) {
    let { own, no, kind, title, people, expiration, price, content, imgUrl } = req.body;

    var sql = "UPDATE board SET (kind, title, people, expiration, price, content, imgUrl) = (?, ?, ?, ?, ?, ?, ?) WHERE own = ? AND no = ?;"
    var param = [kind, title, people, expiration, price, content, imgUrl, own, no];
    getConnection((conn) => {
        conn.query(sql, param, function(err, result, fields) {
            returnResults(err, res, result);
        });
        conn.release();
    })
})

router.delete('/:bid', function(req, res, next) {
    let bid = req.params.bid;
    var sql = "DELETE from board where no='" + bid + "';";
    getConnection((conn) => {
        conn.query(sql, function(err, result, fields) {
            returnResults(err, res, result);
        });
        conn.release();
    });
});

module.exports = router;