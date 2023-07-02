const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: process.env.host,
  port:process.env.pool,
  user: process.env.user,
  password:process.env.password,
  database: process.env.database,
  waitForConnections: true,
   // max idle connections, the default value is the same as `connectionLimit`
});


 module.exports = pool;