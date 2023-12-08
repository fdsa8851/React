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
});

//id 중복 확인
app.post('/idCheck', function(req,res) {

  const query = 'SELECT id FROM user where id = ?';
  const id = req.query.id;

  console.log("id : " ,id);
  console.log("idCheck 확인");
  connection.query(query, id, function(err, result, field) {
    console.log("result : ",result);
    if(err) {
      console.log(err);
      res.json(err);
    } else {
      console.log("중복인지 아닌지 확인");
      res.json(result);
    }
  });
});

app.post('/Board/Write', function(req, res) {

  const query = '';
  const file = '';
  console.log("여기오는지 확인" );
  console.log("req ",req);
  console.log("req 파람",req.params);
  console.log("req body",req.body);

});

app.post('/SignUp', function(req, res) {

  const query = 'INSERT INTO user (id, pw, email, name, regist_time) VALUES(?, ?, ?, ?, 1)';
  const values = [req.query.id, req.query.pw, req.query.email, req.query.name];

  const userId = req.query.id === undefined ? req.query.id : req.params.id; 
  const userPw = req.query.pw === undefined ? req.query.pw : req.params.pw;
  const userEmail = req.query.Email === undefined ? req.query.Email : req.params.Email;
  const userName = req.query.Name === undefined ? req.query.Name : req.params.Name;

  console.log("req pw", userPw);
  console.log("req id", userId);
  console.log("req Email", userEmail);
  console.log("req name", userName);

  //postman 에서 데이터 테스트 할때 사용.

  console.log("확인");
  
  connection.query(query, [req.query.id, req.query.pw, req.query.email, req.query.name],
    function(err, result, field) {

      console.log("여기오는지 확인");

      if(err) {
        res.json(err)
      } else {
        if(result.length === 0) {
          console.log("배열이 비었습니다.");
        } else {
          console.log("여기오는지 확인2");
          res.json(result);
        }
      }  
    });
})


app.listen(3001, function () {
  console.log('http server is listening on port 3001')
})