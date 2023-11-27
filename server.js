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

app.get('/', function (req, res) {
  res.send('Hello World')
});

app.get('/sound', function (req, res) {
  res.json({"sound" : "sound"});
});

app.get('/member', function (req, res) {
  res.json('Hello World member')
});

app.post('/login', function(req,res) {

  const query = 'SELECT id, pw FROM user WHERE id = ? AND pw = ?';
  const id = req.query.id;
  const pw = req.query.pw;

  console.log("req query : ", req.query);
  console.log("req param :" ,req.params);
  console.log("req body :" ,req.body);


  //성공시 
  connection.query(query, [id, pw],
    function(err, result, field) {
      if(err) {
        res.json(err)
      } else {
        res.json(result);
      }  
    });
})

app.post('/user', function(req, res) {

  const query = 'INSERT INTO user (id, pw) VALUES(?, ?)';
  const values = [req.query.id, req.query.pw];

  const userId = req.query.id === undefined ? req.query.id : req.params.id  
  const userPw = req.query.pw === undefined ? req.query.pw : req.params.pw

  console.log("req : ", req);

  console.log("req pw", req.query.pw);
  console.log("req id", req.query.id);

  //postman 에서 데이터 테스트 할때 사용.
  console.log("req query : ", req.query);

  console.log("req param :" ,req.params);
  console.log("req body :" ,req.body);


  console.log("확인");
  
  connection.query(query, [userId, userPw],
    function(err, result, field) {
      if(err) {
        res.json(err)
      } else {
        if(result.length === 0) {
          console.log("배열이 비었습니다.");
        } else {
          res.json(result);
        }
      }  
    });
})


app.listen(3001, function () {
  console.log('http server is listening on port 3001')
})