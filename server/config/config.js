const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "91378531",
  database: "TRUSMIGROUP",
});

module.exports = db;
