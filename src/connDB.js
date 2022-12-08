let mysql = require('mysql');

const conn = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: '',
    password: '',
    database: '',
    debug: false
})