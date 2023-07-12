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
app.post("/signup", async (req, res) => {
  try {
    const { nickname, password, confirm } = req.body;
    if (nickname.length < 3 || !/^[a-zA-Z0-9]+$/.test(nickname)) {
      res.status(412).send("닉네임의 형식이 일치하지 않습니다.");
      // console.log(nickname);
      return;
    }
    if (password !== confirm) {
      res.status(412).send("패스워드가 일치하지 않습니다.");
      return;
    }
    if (password.length < 4) {
      res.status(412).send("패스워드 형식이 일치하지 않습니다.");
      return;
    }
    if (password.includes(nickname)) {
      res.status(412).send("패스워드에 닉네임이 포함되어 있습니다.");
      return;
    }

    const query = "INSERT INTO Lv2 (nickname, password) VALUES (?, ?)";
    await con.execute(query, [nickname, password]);
    res.status(201).send("회원가입에 성공하였습니다.");
  } catch (error) {
    console.log(error);
    res.status(400).send("요청한 데이터 형식이 올바르지 않습니다.");
  }
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
