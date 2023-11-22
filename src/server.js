const mysql   = require("mysql");   // npm i mysql | yarn add mysql
const express = require('express');
const app     = express();
const port    = 3306; // 포트번호 설정

// MySQL 연결
const connection = mysql.createPool({
    host: "127.0.0.1", // 호스트
    user: "root",      // 데이터베이스 계정
    password: "admin",      // 데이터베이스 비밀번호
    database: "react_mysql",  // 사용할 데이터베이스
});

app.use(express.json());
app.get('/', (req, res) =>{
    res.send('<h2>welcom to server<h2>')
}
);

app.listen(port, ()=> { console.log('SERVER 실행')});

connection.connect();
connection.query('SELECT 1 + 1', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is : ', results[0].solution);
});

connection.end();
