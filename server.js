const mysql      = require('mysql2');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'admin1',
  database : 'react_mysql'
});
   
//   with placeholder
//   connection.query(
//     // 'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//     // ['Page', 45],
//     function(err, results) {
//       console.log(results);
//     }
//   );

//cors 에러 대처 
const express = require('express');
const { InterestsOutlined } = require('@mui/icons-material');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors')

const app = express();



// Access-Control-Allow-Origin 적용방법1: 직접 헤더에 적용
app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

// Access-Control-Allow-Origin 적용방법2: cors 미들웨어 사용
app.use(cors())

app.use(express.urlencoded({ extended: true}));

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
    'INSERT INTO user (id, pw, email, name) VALUES (?, ?, ?, ?)', 
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
      res.send(result);
    }
  )
  console.log(res);
})

app.listen(3001)
