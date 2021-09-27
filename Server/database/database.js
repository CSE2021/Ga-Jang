const mysql = require('mysql');
const mariadbInfo = require('./db_properties.js');
const pool = mysql.createPool({
    host : mariadbInfo.mysql.host,
    port : mariadbInfo.mysql.port,
    user : mariadbInfo.mysql.username,
    password : mariadbInfo.mysql.password,
    database : mariadbInfo.mysql.db,
    connectionLimit : 10
});

function getConnection(callback) {
    pool.getConnection(function (err, conn) {
        if(!err) {
            callback(conn);
        }
        else {
            console.log("error!!");
        }
    });
}

module.exports = getConnection;