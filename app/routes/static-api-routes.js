var db = require("../models")
var connection;
var mysql = require('mysql');
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
    connection = mysql.createConnection(
        {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'gemini253',
            database: 'countries'
        })

}

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
    // app.get('/api/all-info', (req, res) => {
    //     connection.query("SELECT * FROM trips WHERE user = ?", [req.body.user], (err, data) => {
    //         console.log(data)
    //         console.log('trips')
    //         res.json(data)
    //     })
    // })
    app.get("/api/code/:country?", (req, res) => {
        connection.query("SELECT * FROM code WHERE name = ?", [req.params.country], (err, data) => {
            res.json(data)

        })
    })



}