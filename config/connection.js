// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "Knights#1",
  database: "planner"
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;


// Google API account's
// Service account name:
// Planner_Project2
// Service account ID:
// planner-project2
// Private key:
// My Project-577a6166b4e8.json
// Service account key:
// 577a6166b4e805b6ad8c7503b0ab110c6faceb2e

