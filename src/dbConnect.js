/*show-all-data.js*/
var express = require('express');
var router = express.Router();

// npm install mysql --save
var mysql = require('mysql');

router.get('/', function (req, res, next) {
    var connection = mysql.createConnection({
        host: 'localhost',
        post: 3306,
        user: 'root@localhost',
        password: '',
        database: 'test'
    });
    connection.connect();
    connection.query('select * from nodejs_user_test', function (err, rows, fields) {
        connection.end();
        if (!err) {
            console.log(rows);
            console.log(fields);
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
            res.send(result);
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
});

module.exports = router;
