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
    app.get('/api/all-trips/:user/:country', (req, res) => {
        db.Trips.findAll({
            where:
            {
                user: req.params.user,
                country: req.params.country
            }
        }).then(result => {
            res.json(result)
            console.log(result)
        })
    })
    app.get('/api/delete_item/:item', (req, res) => {
        db.Trips.destroy({
            where: {
                place_one: req.params.item
            }
        })
    })

}

