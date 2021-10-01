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

router.post('/add', function(req, res, next) {
    let { id, loc, name, lating } = req.body;

    var sql = "INSERT INTO board (id, loc, name, lating) VALUES(?, ?, ?, ?);"
    var param = [id, loc, name, lating]
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

module.exports = router;