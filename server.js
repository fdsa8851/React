const fs = require("fs"); //파일처리 관련 모듈 (fileSystem)
const path = require("path"); //path설정
const mysql = require("mysql2");
const iconv_lite = require("iconv-lite");
//const cookieParser = require('cookie-parser');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin1",
  database: "react_mysql",
});

//form-data 사용시  데이터 받을때
const multer = require("multer");
//cors 에러 대처
const express = require("express");
const cors = require("cors");

const app = express();

let boardFileName = "";
// Access-Control-Allow-Origin 적용방법1: 직접 헤더에 적용
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Access-Control-Allow-Origin 적용방법2: cors 미들웨어 사용
app.use(cors());
//app.use(cookieParser());  //쿠기 관리를 위한 설정
app.use(express.static(path.join(__dirname, "/src/member/image"))); //서버에 파일 확인을위한 접근 path?

//POST 방식으로 전송된 form 데이터를 req 객체의 body 속성에 넣어주기 위해서 Node.js 서버에 아래와 같은 Body Parser 미들웨어를 추가한다.
//app.use(express.json());


/** 빈값 확인 */
function isEmptyObj(obj) {
  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return true;
  }

  return false;
}

try {
  fs.readdirSync("upload");
} catch (err) {
  console.error("upload 폴더가 없습니다. 폴더를 생성합니다.");
  fs.mkdirSync("upload");
}


//파일저장(업로드)
const storage = multer.diskStorage({
  destination(req, file, done) {
    done(null, "./src/member/image");
  },

  filename(req, file, done) {
    //파일명 UTF-8로 변환
    const decodeFileName = iconv_lite.decode(file.originalname, "UTF-8");

    console.log("originalName : ", file.originalname);
    console.log("decodeName : ", decodeFileName);

    const ext = path.extname(decodeFileName);
    console.log("ext : ", ext);
    const fileName = `${path.basename(
      decodeFileName,
      ext
    )}_${Date.now()}${ext}`;

    boardFileName = fileName;
    done(null, fileName);
  },
});

const limits = { fileSize: 5 * 1024 * 1024 };

const multerConfig = {
  storage,
  limits,
};

const upload = multer(multerConfig);

app.post("/login", function (req, res) {
  const query = "SELECT id, pw FROM user WHERE id = ? AND pw = ?";
  const id = req.query.id;
  const pw = req.query.pw;

  console.log("req query : ", req.query);
  console.log("req param :", req.params);
  console.log("req body :", req.body);

  //성공시
  connection.query(query, [id, pw], function (err, result, field) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

//게시판 조회
app.get("/Board", function (req, res) {
  const query = "SELECT * FROM board";

  connection.query(query, "", function (err, result, field) {
    console.log("board 실행");

    if (err) {
      console.log("board 에러 입니다", err);
    } else {
      res.json(result);
    }
  });
});

//id 중복 확인
app.post("/idCheck", function (req, res) {
  const query = "SELECT id FROM user where id = ?";
  const id = req.query.id;

  console.log("id : ", id);
  console.log("idCheck 확인");
  connection.query(query, id, function (err, result, field) {
    console.log("result : ", result);
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      console.log("중복인지 아닌지 확인");
      res.json(result);
    }
  });
});

//조회수
app.post("/Board/View", function(req, res) {

  console.log("조회수 확인 : " ,res);

});

//상세조회
app.get("/Board/Regist", function (req, res) {
  const query = "SELECT title, content, fileUrl FROM board WHERE NO = ?";
  const uQuery = "UPDATE board SET viewCnt=viewCnt+1 WHERE no = ?";
  let returnResult = [];
  const column = req.query;

  console.log("데이터 확인 : ", req.query);

  connection.query(query, [column.no], function (err, result, field) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      console.log('column.viewCnt :' ,column.viewCnt);
      if(column.viewCnt != 1) {
        res.json(result);
      }
      returnResult.push(result);
    }
  });

  if(column.viewCnt == 1) {
    console.log('column.viewCnt : 실행확인: ',column.viewCnt);
    connection.query(uQuery, [column.viewCnt, column.no], function (err, result, field) {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        returnResult.push(result);
        console.log('returnResult :', returnResult);
        res.json(returnResult);
      }
    });  
  }
});

//게시판 등록, 수정, 삭제
app.post("/Board/Regist", upload.single("file"), function (req, res) {
  //데이터가 object 형태로 넘어오면 object가 string으로 바껴서 말그대로 object가 됨.
  //넘겨주기전에object일경우  JSON.Stringify를 시켜야 데이터 넘기기 가능.

  const fileURL = boardFileName;
  const column = JSON.parse(req.body.content);
  const date = new Date();
  let queryColumn = [];
  let query = "";
  
  console.log('boardFileName:', boardFileName);
  console.log('content값 확인 : ',req.body.content);  //fileURL은 

  if (column.state == "C") {
    query =
      "INSERT INTO board (title, content, id, fileUrl, viewCnt, uDate) VALUES (?, ?, ?, ?, 0, ?)";
    queryColumn = [column.title, column.content, column.create, fileURL, date];
  } else if (column.state == "D") {
    query = "DELETE FROM board WHERE no = ?";
    queryColumn = [column.no];
  } else if (column.state == "U") {
    query = "UPDATE board SET title = ?, content = ?, fileUrl =?, uDate = ? WHERE no = ?";
    queryColumn = [column.title, column.content, fileURL, date, column.no];
  }

  console.log("쿼리값은 어떻게 나올것인가", query);

  connection.query(query, queryColumn, function (err, result, field) {
    if (err) {
      console.log("에러입니다 : ", err);
    } else {
      res.json(result);
      console.log("실행 성공");
    }
  });
});

app.post("/SignUp", function (req, res) {
  const query =
    "INSERT INTO user (id, pw, email, name, regist_time) VALUES(?, ?, ?, ?, 1)";
  const values = [req.query.id, req.query.pw, req.query.email, req.query.name];

  const userId = req.query.id === undefined ? req.query.id : req.params.id;
  const userPw = req.query.pw === undefined ? req.query.pw : req.params.pw;
  const userEmail =
    req.query.Email === undefined ? req.query.Email : req.params.Email;
  const userName =
    req.query.Name === undefined ? req.query.Name : req.params.Name;

  console.log("req pw", userPw);
  console.log("req id", userId);
  console.log("req Email", userEmail);
  console.log("req name", userName);

  //postman 에서 데이터 테스트 할때 사용.

  console.log("확인");

  connection.query(
    query,
    [req.query.id, req.query.pw, req.query.email, req.query.name],
    function (err, result, field) {
      console.log("여기오는지 확인");

      if (err) {
        res.json(err);
      } else {
        if (result.length === 0) {
          console.log("배열이 비었습니다.");
        } else {
          console.log("여기오는지 확인2");
          res.json(result);
        }
      }
    }
  );
});

app.listen(3001, function () {
  console.log("http server is listening on port 3001");
});
