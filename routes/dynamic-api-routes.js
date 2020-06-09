var db = require("../models");


module.exports = app => {
    app.post("/api/trips", (req, res) => {
        db.Trips.create(req.body).then(result => {
            res.json(result)
            console.log(result)
        })
    })
}