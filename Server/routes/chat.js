var express = require('express');
const getConnection = require('../database/database');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("CHATROOM API TEST");
})

router.get('/:rno', function(req, res, next) {
    let room_id = req.params.rno;
    var sql = "SELECT * from chatroom where rno='" + room_id + "';";
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
})

router.post('/add', function(req, res, next) {
    let { bno, own, content } = req.body;

    var sql = "INSERT INTO board (bno, own, content) VALUES(?, ?, ?);"
    var param = [bno, own, content];
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