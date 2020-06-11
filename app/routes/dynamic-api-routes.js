var db = require("../models");

module.exports = app => {
    app.post("/api/trips", (req, res) => {
        db.Trips.create(req.body).then(result => {
            res.json(result)
        })
    })

    app.get('/api/user-login', (req, res) => {
        res.json(req.user)
    })
    app.get('/api/all-info/:user?', (req, res) => {
        db.Trips.findAll(
            {
                where: {
                    user: req.params.user
                }
            }
        ).then(result => {
            res.json(result)
            console.log(result)
            console.log('done')
        })
    })

}

