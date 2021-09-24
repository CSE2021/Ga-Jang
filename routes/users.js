var express = require('express');
const getConnection = require('../database/database');
var router = express.Router();

router.get('/list', function(req, res, next) {
    var sql = "SELECT * from account;"
    console.log(sql);
    getConnection((conn) => {
        conn.query(sql, function(err, results, fields) {
            if(err) console.log(err);
            else {
                console.log(results);
                res.send(results);
            }
        });
        conn.release();
    });
});

module.exports = router;