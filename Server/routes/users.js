var express = require('express');
const getConnection = require('../database/database');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("USERS API TEST");
})

router.get('/list', function(req, res) {
    var sql = "SELECT * from accounts;"
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
});

router.get('/list/:id', function(req, res, next) {
    let user_id = req.params.id;
    var sql = "SELECT * from accounts WHERE id='" + user_id + "';"

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
});

router.post('/add', function(req, res, next) {
    let { id, loc, name, lating } = req.body;

    var sql = "INSERT INTO accounts (id, loc, name, lating) VALUES(?, ?, ?, ?);"
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
});

router.post('/edit-name', function(req, res, next) {
    let { id, name } = req.body;

    var sql = "UPDATE accounts SET name=? WHERE id=?;"
    var param = [name, id];
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

router.post('/edit-loc', function(req, res, next) {
    let { id, loc } = req.body;

    var sql = "UPDATE accounts SET loc=? WHERE id=?;"
    var param = [loc, id];
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

router.post('/edit-lating', function(req, res, next) {
    let { id, lating } = req.body;

    var sql = "UPDATE accounts SET lating=? WHERE id=?;"
    var param = [lating, id];
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

router.delete('/del/:id', function(req, res, next) {
    let user_id = req.params.id;
    var sql = "DELETE from accounts where id='" + user_id + "';";
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