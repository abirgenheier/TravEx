require('dotenv').config()
var express = require('express')
var app = express()
var PORT = process.env.PORT || 8080;

var db = require('./app/models')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static("./app/public"))

require("./app/routes/static-api-routes")(app)
require("./app/routes/dynamic-api-routes")(app)
require("./app/routes/html-routes")(app)

db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log('APP LISTENING ON PORT' + PORT)
    })
})
