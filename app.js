const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");

//전역 미들웨어
app.use(bodyParser.json());

//MySQL 연결 (로컬)
let con;
(async () => {
  con = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "qwer4321a",
    database: "Lv2",
  });
  console.log("MySQL 연결 완료");
})();

app.get("/", (req, res) => {
  res.send("시작입니다.");
});

//회원가입
app.post("/signup", (req, res) => {
  const { nickname, password, confirm } = req.body;
  if (nickname.length < 3 || !/^[a-zA-Z0-9]+$/.test(nickname)) {
    res.status(412).send("닉네임의 형식이 일치하지 않습니다.");
    return;
  }

  res.status(201).send("회원가입 완료");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
