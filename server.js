const mysql      = require('mysql2');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'admin1',
  database : 'react_mysql'
});
   
//   // with placeholder
//   connection.query(
//     // 'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//     // ['Page', 45],
//     function(err, results) {
//       console.log(results);
//     }
//   );

const express = require('express')
const app = express()

app.get('/member', function (req, res) {
  res.send('Hello World')
});

app.get('/member', function (req, res) {
  res.json({"sound" : "sound"});
});

app.post('/member', function (req, res) {
  res.json('Hello World member')
});

app.post('/userData', function(req,res) {
  connection.query(
    'INSERT INTO user (id, pw, email, name) VALUES ('\?', '\?', '\?', '\?')', 
    function(err, result, field) {
      res.send(result[0]);
      console.log(result[0]);
    }
  )
})

app.get('/userData', function(req,res) {
  connection.query(
    'SELECT * FROM user',
    function(err, result, field) {
      res.send(result[0]);
      console.log(result[0]);
    }
  )
})

app.listen(4000)
