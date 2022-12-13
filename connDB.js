let mysql = require('mysql');

const conn = mysql.createConnection({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'eyesure',
    debug: false
})

conn.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("DB connected Successfully");
    }
})

module.exports = conn;