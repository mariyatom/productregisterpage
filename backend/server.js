var express = require("express");
var multer = require("multer");
var cors = require("cors");
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("asset"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var mysql = require("mysql2");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3306,
  database: "productinfo",
});
db.connect((err) => {
  if (err) throw err;
  console.log("connected");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.use(cors());
app.post("/imageup", upload.single("file"), (req, res) => {
  var url = req.file.path; // we can store this  url  variable in the varchar field of the Db table
  const { name, price, quantity } = req.body;
  // var urldestination = req.file.destination+"/"+req.file.path;
  var sql = "insert into productregistration values(?,?,?,?,?)";
  db.query(sql, [0, name, price, quantity, url], (err, result) => {
    if (err) throw err;
    res.send({ statusText: "image data Uploaded" });
  });
});
app.listen(9005, () => {
  console.log("server running http://localhost:9005/");
});
