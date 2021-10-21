var express = require('express');
const getConnection = require('../database/database');
const returnResults = require('../errorHandler');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("BOARD API TEST");
})

router.get('/list/:page', function(req, res, next) {
    let page = req.params.page;
    var num = parseInt((page-1) * 10);
    var sql = "SELECT * from board ORDER BY wdate desc limit " + num + ", 10;"
    getConnection((conn) => {
        conn.query(sql, function(err, result, fields) {
            returnResults(err, res, result);
        });
        conn.release();
    });
})

router.get('/kind', function(req, res, next) {
    let { kind, page } = req.body;
    var sql = "SELECT * from board WHERE kind=? limit ?, 10;"
    var param = [kind, page];

    getConnection((conn) => {
        conn.query(sql, param, function(err, result, fields) {
            returnResults(err, res, result);
        });
        conn.release();
    });
})

module.exports = router;