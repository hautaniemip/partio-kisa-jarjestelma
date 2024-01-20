const mysql = require('mysql');

const connection = mysql.createPool({
    host: process.env.MYSQL_SERVER,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWD,
    database: process.env.MYSQL_DB,
    connectionLimit: 4,
    multipleStatements: true
});

connection.on('error', (err) => {
    console.log(err);
});

module.exports = connection;