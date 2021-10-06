var express = require('express');
const getConnection = require('../database/database');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("BOARD API TEST");
})

router.get('/list', function(req, res, next) {
    var sql = "SELECT * from board;"
    getConnection((conn) => {
        conn.query(sql, function(err, results, fields) {
            if(err) {
                res.json("Failed");
            }
            else {
                res.json(results);
            }
        });
        conn.release();
    });
})

router.get('/kind/:type', function(req, res, next) {
    let type = req.params.type;
    var sql = "SELECT * from board WHERE kind='" + kind + "';"

    getConnection((conn) => {
        conn.query(sql, function(err, result, fields) {
            if(err) {
                res.json("Failed");
            }
            else {
                res.json(result);
            }
        });
        conn.release();
    });
})

router.get('/:no', function(req, res, next) {
    let no = req.params.no;
    var sql = "SELECT * from board WHERE no='" + no + "';"

    getConnection((conn) => {
        conn.query(sql, function(err, result, fields) {
            if(err) {
                res.json("Failed");
            }
            else {
                res.json(result);
            }
        });
        conn.release();
    });
})

router.post('/add', function(req, res, next) {
    let { own, kind, title, people, expiration, price, content, imgUrl } = req.body;

    var sql = "INSERT INTO board (own, kind, title, people, expiration, price, content, imgUrl) VALUES(?, ?, ?, ?, ?, ?, ?, ?);"
    var param = [own, kind, title, people, expiration, price, content, imgUrl];
    getConnection((conn) => {
        conn.query(sql, param, function(err, rows, fields) {
            if(err) {
                res.json("Failed");
            }
            else {
                res.json(rows.affectedRows);
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
        conn.query(sql, param, function(err, rows, fields) {
            if(err) {
                res.json("Failed");
            }
            else {
                res.json(rows.affectedRows);
            }
        });
        conn.release();
    })
})

router.delete('/del/:no', function(req, res, next) {
    let no = req.params.no;
    var sql = "DELETE from board where no='" + no + "';";
    getConnection((conn) => {
        conn.query(sql, function(err, rows, fields) {
            if(err) {
                res.json("Failed");
            }
            else {
                res.json("success");
            }
        });
        conn.release();
    });
});

module.exports = router;