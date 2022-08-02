const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "myDB",
  password: "111sombir",
});

module.exports = pool.promise();
