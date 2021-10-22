const mysql = require('mysql2/promise');
const mariadbInfo = require('./db_properties.js');
const pool = mysql.createPool({
    host : mariadbInfo.mysql.host,
    port : mariadbInfo.mysql.port,
    user : mariadbInfo.mysql.username,
    password : mariadbInfo.mysql.password,
    database : mariadbInfo.mysql.db,
    connectionLimit : 10
});

module.exports = pool;