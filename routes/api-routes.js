const db = require("../models")

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'gemini253',
    database: 'countries'
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