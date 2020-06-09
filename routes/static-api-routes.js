const db = require("../models")

const mysql = require('mysql');
const connection = mysql.createConnection(
    {
        "development": {
            "username": "root",
            "password": "gemini253",
            "database": "country",
            "host": "127.0.0.1",
            "port": 3306,
            "dialect": "mysql"
        },
        "test": {
            "username": "root",
            "password": "gemini253",
            "database": "country",
            "host": "127.0.0.1",
            "port": 3306,
            "dialect": "mysql"
        },
        "production": {
            "use_env_variable": "JAWSDB_URL",
            "dialect": "mysql"
        }
    })
connection.connect(err => {
    if (err) throw err;
});

module.exports = app => {
    app.get("/api/all", (req, res) => {
        connection.query("SELECT * FROM countries", (err, data) => {
            res.json(data)

        })
    })
    app.get("/api/:country?", (req, res) => {
        connection.query("SELECT * FROM countries WHERE country = ?", [req.params.country], (err, data) => {
            res.json(data)

        })
    })
    app.get("/api/code/:country?", (req, res) => {
        connection.query("SELECT * FROM code WHERE name = ?", [req.params.country], (err, data) => {
            res.json(data)
        })
    })
}