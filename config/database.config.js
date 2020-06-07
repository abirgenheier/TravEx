// Set up MySQL connection.
var mysql = require("mysql");

// import login information from .env file
// require('dotenv').config({ path: '../.env' });
require('dotenv').config();

let connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: "countries",
    });
};

// Make mysql connection
connection.connect(function (err) {

    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});

// export connection
module.exports = connection;